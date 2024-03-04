import { PrismaClient } from "@prisma/client";
import { z } from "zod";

export const findProjectStageInput = z.object({ projectId: z.string() });

export const findProjectStage = async (
  input: typeof findProjectStageInput._type,
  prisma: PrismaClient,
) => {
  try {
    await prisma.projectStage.findMany({ where: { id: input.projectId } });
  } catch (error) {
    console.error(error);
  }
};
