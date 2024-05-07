import GoogleDriveService from "@/services/GoogleDriveService";
import { z } from "zod";

export const renameFileInput = z.object({
  fileId: z.string(),
  fileName: z.string(),
});

export const renameFile = async (input: typeof renameFileInput._type) => {
  try {
    await GoogleDriveService.renameFile(input.fileId, input.fileName);
  } catch (error) {
    console.error(error);
  }
};
