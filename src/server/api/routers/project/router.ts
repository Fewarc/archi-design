import { newProjectSchema } from "@/utils/validation";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../../trpc";
import { createProject } from "./actions/create";
import { z } from "zod";

export const projectRouter = createTRPCRouter({
  create: protectedProcedure
    .input(newProjectSchema)
    .mutation(({ input, ctx }) => {
      return createProject(input, ctx.db);
    }),
});
