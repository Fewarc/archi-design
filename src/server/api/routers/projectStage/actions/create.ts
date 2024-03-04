import { addStageSchema } from "@/utils/validation";
import { PrismaClient } from "@prisma/client";

export const createProjectStageInput = addStageSchema;

export const createProjectStage = async (
  input: typeof createProjectStageInput._type,
  prisma: PrismaClient,
) => {
  try {
    await prisma.projectStage.create({ data: input });
  } catch (error) {
    console.error(error);
  }
};
