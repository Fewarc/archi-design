import GoogleDriveService from "@/services/GoogleDriveService";
import { ProjectWithFiles } from "@/utils/types";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

export const findProjectStageInput = z.object({ projectId: z.string() });

export const findProjectStage = async (
  input: typeof findProjectStageInput._type,
  prisma: PrismaClient,
) => {
  try {
    let stages = await prisma.projectStage.findMany({
      where: { projectId: input.projectId },
    });
    let stagesWithFiles: ProjectWithFiles[] = [];

    for await (const stage of stages) {
      const files = await GoogleDriveService.listFilesInFolder(stage.folderId);
      stagesWithFiles.push({ ...stage, files });
    }

    return stagesWithFiles;
  } catch (error) {
    console.error(error);
  }
};
