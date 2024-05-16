import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { createProjectScope, createProjectScopeInput } from "./actions/create";
import { findProjectScope, findProjectScopeInput } from "./actions/find";
import { deleteProjectScope, deleteProjectScopeInput } from "./actions/delete";
import { editProjectScope, editProjectScopeInput } from "./actions/edit";

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
  delete: protectedProcedure
    .input(deleteProjectScopeInput)
    .mutation(({ input, ctx }) => {
      return deleteProjectScope(input, ctx.db);
    }),
  edit: protectedProcedure
    .input(editProjectScopeInput)
    .mutation(({ input, ctx }) => {
      return editProjectScope(input, ctx.db);
    }),
});
