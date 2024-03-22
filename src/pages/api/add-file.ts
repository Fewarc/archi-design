import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import GoogleDriveService from "@/services/GoogleDriveService";

type ResponseData = {
  message?: string;
  error?: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const form = new IncomingForm();

  form.parse(req, async (err, _fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Error parsing form" });
    }

    if (files.file && files.file[0]) {
      await GoogleDriveService.resumableUpload(files.file[0]);
      return res.status(200).json({ message: "OK" });
    } else {
      return res.status(500).json({ error: "File not found" });
    }
  });
}
