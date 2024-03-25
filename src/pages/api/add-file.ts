import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import GoogleDriveService from "@/services/GoogleDriveService";

type ResponseData = {
  message?: string;
  error?: string;
  uploadId?: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  try {
    const uploadId = await new Promise<string>((resolve, reject) => {
      const form = new IncomingForm();

      form.parse(req, async (err, fields, files) => {
        if (err) {
          reject(new Error("Error parsing file form."));
        }

        if (
          files.file &&
          files.file[0] &&
          fields.uploadId &&
          fields.uploadId[0]
        ) {
          await GoogleDriveService.resumableUpload(files.file[0]);
          resolve(fields.uploadId[0] as string);
        } else {
          reject(new Error("Upload data is missing."));
        }
      });
    });

    return res.status(200).json({ message: "OK", uploadId });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}
