import { create } from "node_modules/cypress/types/lodash";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import {
  scrapeProductData,
  scrapeProductDataInput,
} from "./actions/scrapeData";
import { createProduct, createProductInput } from "./actions/create";
import { findProducts, findProductsSchema } from "./actions/find";
import { deleteProduct, deleteProductInput } from "./actions/delete";
import { editProductInput, editProduct } from "./actions/edit";

export const productRouter = createTRPCRouter({
  scrape: protectedProcedure
    .input(scrapeProductDataInput)
    .query(({ input, ctx }) => {
      return scrapeProductData(input, ctx.db);
    }),
  create: protectedProcedure
    .input(createProductInput)
    .mutation(({ input, ctx }) => {
      return createProduct(input, ctx.db);
    }),
  find: protectedProcedure.input(findProductsSchema).query(({ input, ctx }) => {
    return findProducts(input, ctx.db);
  }),
  delete: protectedProcedure
    .input(deleteProductInput)
    .mutation(({ input, ctx }) => {
      return deleteProduct(input, ctx.db);
    }),
  edit: protectedProcedure
    .input(editProductInput)
    .mutation(({ input, ctx }) => {
      return editProduct(input, ctx.db);
    }),
});
