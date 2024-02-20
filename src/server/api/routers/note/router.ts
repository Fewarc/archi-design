import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { createProjectNote, createProjectNoteInput } from "./actions/create";
import { findProjectNoteInput, findProjectNotes } from "./actions/find";

export const noteRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createProjectNoteInput)
    .mutation(({ input, ctx }) => {
      return createProjectNote(input, ctx.db);
    }),
  find: protectedProcedure
    .input(findProjectNoteInput)
    .query(({ input, ctx }) => {
      return findProjectNotes(input, ctx.db);
    }),
});
