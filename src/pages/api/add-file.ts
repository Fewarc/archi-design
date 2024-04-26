import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import GoogleDriveService from "@/services/GoogleDriveService";
import { getServerAuthSession } from "@/server/auth";

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
  const session = await getServerAuthSession(req, res);

  if (!session || !session?.user) {
    res.status(401).json({ error: "Unauthorized." });
  }

  try {
    await new Promise<void>((resolve, reject) => {
      const form = new IncomingForm();

      form.parse(req, async (err, fields, files) => {
        if (err) {
          reject(new Error("Error parsing file form."));
        }

        const file = files?.file && files?.file[0];
        const folderId = fields.folderId && fields.folderId[0];
        const writers =
          fields.writers && fields.writers[0] && JSON.parse(fields.writers[0]);
        const readers =
          fields.readers && fields.readers[0] && JSON.parse(fields.readers[0]);

        console.log(writers, readers);

        if (file && folderId && writers & readers) {
          try {
            await GoogleDriveService.resumableUpload(file, [], [], [folderId]);
          } catch (error) {
            reject(new Error(`Error performing resumable upload. ${error}`));
          }
          resolve();
        } else {
          reject(new Error("Upload data is missing."));
        }
      });
    });

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}
