import { noteSchema } from "@/utils/validation";
import { PrismaClient } from "@prisma/client";

export const editProjectNoteInput = noteSchema;

export const editProjectNote = async (
  input: typeof editProjectNoteInput._type,
  prisma: PrismaClient,
) => {
  try {
    const { id: noteId, ...noteData } = input;
    await prisma.projectNote.update({
      where: { id: noteId },
      data: noteData,
    });
  } catch (error) {
    console.error(error);
  }
};
