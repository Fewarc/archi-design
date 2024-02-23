import { PrismaClient } from "@prisma/client";
import { z } from "zod";

export const deleteProjectInput = z.object({
  projectId: z.string(),
});

export const deleteProject = async (
  input: typeof deleteProjectInput._type,
  prisma: PrismaClient,
) => {
  try {
    await prisma.project.delete({ where: { id: input.projectId } });
  } catch (error) {
    console.error(error);
  }
};
