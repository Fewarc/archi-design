import { PrismaClient } from "@prisma/client";
import { z } from "zod";

export const deleteProductInput = z.object({
  id: z.string(),
});

export const deleteProduct = async (
  input: typeof deleteProductInput._type,
  prisma: PrismaClient,
) => {
  try {
    await prisma.product.delete({ where: { id: input.id } });
  } catch (error) {
    console.error(error);
  }
};
