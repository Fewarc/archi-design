import { projectSchema } from "@/utils/validation";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { createProject } from "./actions/create";
import { getAllProjects } from "./actions/getAll";
import { findProject, findProjectInput } from "./actions/find";
import { editProject, editProjectInput } from "./actions/edit";
import { deleteProject, deleteProjectInput } from "./actions/delete";
import { getProjectUsers, getProjectUsersInput } from "./actions/getUsers";

export const projectRouter = createTRPCRouter({
  create: protectedProcedure.input(projectSchema).mutation(({ input, ctx }) => {
    return createProject(input, ctx.db);
  }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return getAllProjects(ctx.db);
  }),
  find: protectedProcedure.input(findProjectInput).query(({ input, ctx }) => {
    return findProject(input, ctx.db);
  }),
  edit: protectedProcedure
    .input(editProjectInput)
    .mutation(({ input, ctx }) => {
      return editProject(input, ctx.db);
    }),
  delete: protectedProcedure
    .input(deleteProjectInput)
    .mutation(({ input, ctx }) => {
      return deleteProject(input, ctx.db);
    }),
  getUsers: protectedProcedure
    .input(getProjectUsersInput)
    .query(({ input, ctx }) => {
      return getProjectUsers(input, ctx.db);
    }),
});
