import { find } from "node_modules/cypress/types/lodash";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { createProjectScope, createProjectScopeInput } from "./actions/create";
import { findProjectScope, findProjectScopeInput } from "./actions/find";

export const projectScopeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createProjectScopeInput)
    .mutation(({ input, ctx }) => {
      return createProjectScope(input, ctx.db);
    }),
  find: protectedProcedure
    .input(findProjectScopeInput)
    .query(({ input, ctx }) => {
      return findProjectScope(input, ctx.db);
    }),
});
