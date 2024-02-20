import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { createProjectNote, createProjectNoteInput } from "./actions/create";

export const noteRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createProjectNoteInput)
    .mutation(({ input, ctx }) => {
      return createProjectNote(input, ctx.db);
    }),
});
