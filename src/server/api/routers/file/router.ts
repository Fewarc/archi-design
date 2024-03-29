import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { deleteFile, deleteFileInput } from "./actions/delete";
import { renameFile, renameFileInput } from "./actions/rename";

export const fileRouter = createTRPCRouter({
  delete: protectedProcedure
    .input(deleteFileInput)
    .mutation(({ input, ctx: _ctx }) => {
      return deleteFile(input);
    }),
  rename: protectedProcedure
    .input(renameFileInput)
    .mutation(({ input, ctx: _ctx }) => {
      return renameFile(input);
    }),
});
