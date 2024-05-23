import { PrismaClient } from "@prisma/client";
import { z } from "zod";

export const findProductsSchema = z.object({
  scopeId: z.string(),
});

export const findProducts = async (
  input: typeof findProductsSchema._type,
  prisma: PrismaClient,
) => {
  try {
    return await prisma.product.findMany({
      where: { projectScopeId: input.scopeId },
    });
  } catch (error) {
    console.error(error);
  }
};
