import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { createProjectScope, createProjectScopeInput } from "./actions/create";

export const projectScopeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createProjectScopeInput)
    .mutation(({ input, ctx }) => {
      return createProjectScope(input, ctx.db);
    }),
});
