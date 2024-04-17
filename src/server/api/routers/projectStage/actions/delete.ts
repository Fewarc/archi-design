import GoogleDriveService from "@/services/GoogleDriveService";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

export const deleteProjectStageInput = z.object({
  id: z.string(),
  folderId: z.string(),
});

export const deleteProjectStage = async (
  input: typeof deleteProjectStageInput._type,
  prisma: PrismaClient,
) => {
  try {
    await prisma.projectStage.delete({ where: { id: input.id } });
    await GoogleDriveService.deleteFile(input.folderId);
  } catch (error) {
    console.error(error);
  }
};
