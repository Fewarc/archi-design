import GoogleDriveService from "@/services/GoogleDriveService";
import { z } from "zod";

export const deleteFileInput = z.object({
  fileId: z.string(),
});

export const deleteFile = async (input: typeof deleteFileInput._type) => {
  try {
    await GoogleDriveService.deleteFile(input.fileId);
  } catch (error) {
    console.error(error);
  }
};
