import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { createProjectStage, createProjectStageInput } from "./actions/create";
import { deleteProjectStage, deleteProjectStageInput } from "./actions/delete";
import { findProjectStage, findProjectStageInput } from "./actions/find";
import { renameStage, stageRenameInput } from "./actions/rename";

export const projectStageRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createProjectStageInput)
    .mutation(({ input, ctx }) => {
      return createProjectStage(input, ctx.db);
    }),
  find: protectedProcedure
    .input(findProjectStageInput)
    .query(({ input, ctx }) => {
      return findProjectStage(input, ctx.db);
    }),
  rename: protectedProcedure
    .input(stageRenameInput)
    .mutation(({ input, ctx }) => {
      return renameStage(input, ctx.db);
    }),
  delete: protectedProcedure
    .input(deleteProjectStageInput)
    .mutation(({ input, ctx }) => {
      return deleteProjectStage(input, ctx.db);
    }),
});
