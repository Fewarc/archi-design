import { createTRPCRouter, protectedProcedure } from "../../trpc";
import {
  scrapeProductData,
  scrapeProductDataInput,
} from "./actions/scrapeData";

export const productRouter = createTRPCRouter({
  scrape: protectedProcedure
    .input(scrapeProductDataInput)
    .query(({ input, ctx }) => {
      return scrapeProductData(input, ctx.db);
    }),
});
