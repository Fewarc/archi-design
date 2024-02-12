import { newAdditionalContactSchema } from "@/utils/validation";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { createAdditionalContact } from "./actions/create";

export const additionalContactRouter = createTRPCRouter({
  create: protectedProcedure
    .input(newAdditionalContactSchema)
    .mutation(({ input, ctx }) => {
      return createAdditionalContact(input, ctx.db);
    }),
});
