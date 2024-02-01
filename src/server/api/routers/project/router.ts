import { newProjectSchema } from "@/utils/validation";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { createProject } from "./actions/create";
import { getAllProjects } from "./actions/getAll";

export const projectRouter = createTRPCRouter({
  create: protectedProcedure
    .input(newProjectSchema)
    .mutation(({ input, ctx }) => {
      return createProject(input, ctx.db);
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return getAllProjects(ctx.db);
  }),
});
