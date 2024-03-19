import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { createProjectStage, createProjectStageInput } from "./actions/create";
import { findProjectStage, findProjectStageInput } from "./actions/find";

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
});
