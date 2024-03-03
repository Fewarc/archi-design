import { PrismaClient } from "@prisma/client";
import { z } from "zod";

export const findProjectInput = z.object({
  projectId: z.string(),
});

export const findProject = async (
  input: typeof findProjectInput._type,
  prisma: PrismaClient,
) => {
  try {
    return await prisma.project.findFirst({ where: { id: input.projectId } });
  } catch (error) {
    console.error(error);
  }
};
