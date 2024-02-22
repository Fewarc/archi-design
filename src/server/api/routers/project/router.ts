import { projectSchema } from "@/utils/validation";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { createProject } from "./actions/create";
import { getAllProjects } from "./actions/getAll";
import { findProject, findProjectInput } from "./actions/find";
import { editProject, editProjectInput } from "./actions/edit";

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
});
