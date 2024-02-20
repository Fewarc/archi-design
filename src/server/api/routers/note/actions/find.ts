import { PrismaClient } from "@prisma/client";
import { z } from "zod";

export const findProjectNoteInput = z.object({
  projectId: z.string(),
});

export const findProjectNotes = async (
  input: typeof findProjectNoteInput._type,
  prisma: PrismaClient,
) => {
  try {
    return await prisma.projectNote.findMany({
      where: { projectId: input.projectId },
    });
  } catch (error) {
    console.error(error);
  }
};
