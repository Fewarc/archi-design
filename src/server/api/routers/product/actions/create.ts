import { addProductSchema } from "@/utils/validation";
import { PrismaClient } from "@prisma/client";

export const createProductInput = addProductSchema;

export const createProduct = async (
  input: typeof createProductInput._type,
  prisma: PrismaClient,
) => {
  try {
    await prisma.product.create({ data: input });
  } catch (error) {
    console.error(error);
  }
};
