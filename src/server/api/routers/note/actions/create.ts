import { newNoteSchema } from "@/utils/validation";
import { PrismaClient } from "@prisma/client";

export const createProjectNoteInput = newNoteSchema;

export const createProjectNote = async (
  input: typeof createProjectNoteInput._type,
  prisma: PrismaClient,
): Promise<void> => {
  try {
    await prisma.projectNote.create({ data: input });
  } catch (error) {
    console.error(error);
  }
};
