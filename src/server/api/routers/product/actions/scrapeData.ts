import WebScraperService from "@/services/WebScraperService";
import { PrismaClient } from "@prisma/client";
import { url } from "inspector";
import { z } from "zod";

export const scrapeProductDataInput = z.object({
  url: z.string().or(z.null()),
});

export const scrapeProductData = async (
  input: typeof scrapeProductDataInput._type,
  prisma: PrismaClient,
) => {
  try {
    if (!!input.url) {
      return await WebScraperService.scrapeData(input.url);
    }
  } catch (error) {
    console.error(error);
  }
};
