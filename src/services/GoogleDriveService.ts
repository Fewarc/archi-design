import { DriveFile } from "@/utils/types";
import { File } from "formidable";
import fs from "fs";

type RequestBody = { [key: string]: any };

// ~5mb
const CHUNK_SIZE = 256 * 1024 * 2;

class GoogleDriveService {
  googleAuth = require("google-auth-library").GoogleAuth;
  google = require("googleapis").google;
  apiKey = require("archi-drive.json");

  SCOPE = ["https://www.googleapis.com/auth/drive"];

  auth = new this.googleAuth({
    credentials: this.apiKey,
    scopes: "https://www.googleapis.com/auth/drive",
  });

  service = this.google.drive({ version: "v3", auth: this.auth });

  listAll = async (): Promise<DriveFile[]> => {
    const files = await this.service.files.list();
    return files.data.files;
  };

  listFilesInFolder = async (folderId: string): Promise<DriveFile[]> => {
    const files = await this.service.files.list({
      q: `'${folderId}' in parents and trashed=false`,
      fields: "files(id, name, mimeType, kind, createdTime, size, webViewLink)",
    });

    return files.data.files;
  };

  createFolder = async (name: string, parentFolderId?: string[]) => {
    const fileMetadata: RequestBody = {
      name,
      mimeType: "application/vnd.google-apps.folder",
    };

    if (!!parentFolderId) {
      fileMetadata.parents = parentFolderId;
    }

    const file = await this.service.files.create({
      requestBody: fileMetadata,
      fields: "id",
    });

    return file.data.id;
  };

  initiateResumableUpload = async (
    fileName: string,
    mimeType: string,
    parentFolderId?: string[],
  ) => {
    const req = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await this.auth.getAccessToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: fileName,
        mimeType,
        parents: parentFolderId ? parentFolderId : [],
      }),
    };

    const res = await fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable",
      req,
    );

    return (res.headers as unknown as Map<string, string>).get("location");
  };

  readAndUpload = async (
    uploadUrl: string,
    filePath: string,
    chunkSize: number,
  ) => {
    let offset = 0;
    const fileSize = fs.statSync(filePath).size;
    const fileStream = fs.createReadStream(filePath, {
      highWaterMark: chunkSize,
    });

    for await (const chunk of fileStream) {
      await this.uploadChunk(uploadUrl, chunk, offset, chunk.length, fileSize);
      offset += chunk.length;
    }
  };

  uploadChunk = async (
    uploadUrl: string,
    chunk: string | Buffer,
    offset: number,
    chunkSize: number,
    fileSize: number,
  ) => {
    const req = {
      method: "PUT",
      headers: {
        "Content-Length": `${chunkSize}`,
        "Content-Range": `bytes ${offset}-${
          offset + chunkSize - 1
        }/${fileSize}`,
      },
      body: chunk,
    };
    const res = await fetch(uploadUrl, req);
    // TODO: handle chunk upload error
  };

  resumableUpload = async (
    file: File,
    writers: string[],
    parentFolderId?: string[],
  ) => {
    const filePath = file.filepath;

    if (parentFolderId) {
      const foundFiles = await this.findFiles(
        file.originalFilename!,
        file.mimetype!,
        parentFolderId[0],
      );

      if (!!foundFiles.length) {
        throw new Error("File already exists in this folder.");
      }
    }

    if (!!file.originalFilename && !!file.mimetype) {
      const uploadUrl = await this.initiateResumableUpload(
        file.originalFilename,
        file.mimetype,
        parentFolderId,
      );

      if (!!uploadUrl) {
        await this.readAndUpload(uploadUrl, filePath, CHUNK_SIZE);

        const uploadedFile = await this.findFiles(
          file.originalFilename!,
          file.mimetype!,
          parentFolderId && parentFolderId[0],
        );

        await this.service.permissions.create({
          fileId: uploadedFile[0].id,
          requestBody: {
            role: "writer", // 'reader', 'writer', or 'owner'
            type: "user",
            emailAddress: writers, // Pass an array of email addresses
          },
        });
      } else {
        throw new Error("Resumable upload URL was not found");
      }
    }
  };

  findFiles = async (name: string, mimeType: string, folderId?: string) => {
    let q = `name='${name}' and mimeType='${mimeType}'`;

    if (!!folderId) {
      q += ` and '${folderId}' in parents`;
    }

    const foundFiles = await this.service.files.list({
      q,
      fields: "files(id, name, mimeType, kind, createdTime, size, webViewLink)",
    });

    return foundFiles.data.files;
  };

  mexicanDrop = async () => {
    const allFiles: DriveFile[] = await this.listAll();

    for (const file of allFiles) {
      await this.service.files.delete({
        fileId: file.id,
      });
    }
  };

  downloadFile = async (fileId: string) => {
    const file = await this.service.files.get(
      {
        fileId,
        alt: "media",
      },
      { responseType: "stream" },
    );

    return file;
  };

  deleteFile = async (fileId: string) => {
    const res = await this.service.files.delete({ fileId });

    if (res.status !== 204) {
      throw new Error(
        `Error occured while trying to delete file: ${res.headers.statusText}`,
      );
    }
  };

  renameFile = async (fileId: string, fileName: string) => {
    const res = await this.service.files.update({
      fileId: fileId,
      requestBody: {
        name: fileName,
      },
    });

    if (res.status !== 200) {
      throw new Error(
        `Error occured while trying to rename file: ${res.headers.statusText}`,
      );
    }
  };
}

export default new GoogleDriveService();
