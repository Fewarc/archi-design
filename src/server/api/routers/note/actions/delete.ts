import { PrismaClient } from "@prisma/client";
import { z } from "zod";

export const deleteProjectNoteInput = z.object({
  noteId: z.string()
});

export const deleteProjectNote = async (input: typeof deleteProjectNoteInput._type, prisma: PrismaClient) => {
  try {
    await prisma.projectNote.delete({ where: { id: input.noteId } });
  } catch (error) {
    console.error(error);
  }
}