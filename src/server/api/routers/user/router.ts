import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { findUser, findUserInput } from "./actions/find";

export const userRouter = createTRPCRouter({
  find: protectedProcedure.input(findUserInput).query(({ input, ctx }) => {
    return findUser(input, ctx.db);
  }),
});
