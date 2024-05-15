import { PrismaClient } from "@prisma/client";
import { z } from "zod";

export const findProjectScopeInput = z.object({
  projectId: z.string(),
});

export const findProjectScope = async (
  input: typeof findProjectScopeInput._type,
  prisma: PrismaClient,
) => {
  try {
    return await prisma.projectScope.findMany({
      where: { projectId: input.projectId },
    });
  } catch (error) {
    console.error(error);
  }
};
