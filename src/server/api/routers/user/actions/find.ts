import { PrismaClient } from "@prisma/client";
import { z } from "zod";

export const findUserInput = z.object({
  email: z.string().optional(),
});

export const findUser = async (
  input: typeof findUserInput._type,
  prisma: PrismaClient,
) => {
  try {
    return await prisma.user.findFirst({ where: { email: input.email } });
  } catch (error) {
    console.error(error);
  }
};
