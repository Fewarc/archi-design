import { productSchema } from "@/utils/validation";
import { PrismaClient } from "@prisma/client";
import { data } from "node_modules/cypress/types/jquery";

export const editProductInput = productSchema;

export const editProduct = async (
  input: typeof editProductInput._type,
  prisma: PrismaClient,
) => {
  const { id, ...data } = input;
  try {
    await prisma.product.update({ where: { id: id }, data: data });
  } catch (error) {
    console.error(error);
  }
};
