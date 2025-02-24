import type { NextApiRequest, NextApiResponse } from "next";
import GoogleDriveService from "@/services/GoogleDriveService";
import { getServerAuthSession } from "@/server/auth";

type ResponseData = {
  message?: string;
  error?: string;
  file?: any;
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
    const file = await new Promise<any>(async (resolve, reject) => {
      try {
        const fileData = await GoogleDriveService.downloadFile(
          JSON.parse(req.body).fileId,
        );
        resolve(fileData);
      } catch (error) {
        reject(new Error("Error fetching file data."));
        console.error(error);
      }
    });

    file.data
      .on("end", () => {
        console.log("File downloaded successfully");
      })
      .on("error", () => {
        console.error("Error downloading file:");
        res.status(500).json({ error: "Error downloading file" });
      })
      .pipe(res);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}
