import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { deleteFile, deleteFileInput } from "./actions/delete";

export const fileRouter = createTRPCRouter({
  delete: protectedProcedure
    .input(deleteFileInput)
    .mutation(({ input, ctx: _ctx }) => {
      return deleteFile(input);
    }),
});
