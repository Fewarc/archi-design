import { projectSchema } from "@/utils/validation";
import { PrismaClient } from "@prisma/client";

const createProjectInput = projectSchema;

export const createProject = async (
  input: typeof createProjectInput._type,
  prisma: PrismaClient,
): Promise<void> => {
  try {
    await prisma.project.create({ data: input });
  } catch (error) {
    console.error(error);
  }
};
