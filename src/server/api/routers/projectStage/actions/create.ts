import GoogleDriveService from "@/services/GoogleDriveService";
import { addStageSchema } from "@/utils/validation";
import { PrismaClient } from "@prisma/client";

export const createProjectStageInput = addStageSchema;

export const createProjectStage = async (
  input: typeof createProjectStageInput._type,
  prisma: PrismaClient,
) => {
  try {
    const folderId = await GoogleDriveService.createFolder(input.name);
    await prisma.projectStage.create({ data: { ...input, folderId } });
  } catch (error) {
    console.error(error);
  }
};
