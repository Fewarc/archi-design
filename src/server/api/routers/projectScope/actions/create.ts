import { addProjectScopeSchema } from "@/utils/validation";
import { PrismaClient } from "@prisma/client";

export const createProjectScopeInput = addProjectScopeSchema;

export const createProjectScope = async (
  input: typeof createProjectScopeInput._type,
  prisma: PrismaClient,
) => {
  try {
    await prisma.projectScope.create({ data: input });
  } catch (error) {
    console.error(error);
  }
};
