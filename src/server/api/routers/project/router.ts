import { newProjectSchema } from "@/utils/validation";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { createProject } from "./actions/create";
import { getAllProjects } from "./actions/getAll";
import { findProject, findProjectInput } from "./actions/find";

export const projectRouter = createTRPCRouter({
  create: protectedProcedure
    .input(newProjectSchema)
    .mutation(({ input, ctx }) => {
      return createProject(input, ctx.db);
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return getAllProjects(ctx.db);
  }),
  find: protectedProcedure.input(findProjectInput).query(({input, ctx}) => {
    return findProject(input, ctx.db);
  })
});
