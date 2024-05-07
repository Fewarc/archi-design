import { PrismaClient } from "@prisma/client";
import { z } from "zod";

export const stageRenameInput = z.object({
  stageId: z.string(),
  stageName: z.string(),
});

export const renameStage = async (
  input: typeof stageRenameInput._type,
  prisma: PrismaClient,
) => {
  try {
    await prisma.projectStage.update({
      where: { id: input.stageId },
      data: { name: input.stageName },
    });
  } catch (error) {
    console.error(error);
  }
};
