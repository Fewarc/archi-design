import { Shop } from "@prisma/client";
import puppeteer, { Page } from "puppeteer";

const allowedShops: Shop[] = ["castorama", "leroymerlin", "ikea"];

interface ProductTemplate {
  url?: string;
  name?: string;
  description?: string;
  price?: string;
  imageUrl?: string;
  producer?: string;
  shop?: Shop;
}

interface IWebScrapingStrategy {
  getScrapedData(page: Page): Promise<ProductTemplate>;
}

class CastoramaStrategy implements IWebScrapingStrategy {
  async getScrapedData(page: Page): Promise<ProductTemplate> {
    const product = await page.evaluate(() => {
      const name =
        document.querySelector<HTMLElement>("#product-title")?.innerText;
      // const description = ???
      const price = document.querySelector<HTMLElement>(
        "[data-test-id='product-primary-price']",
      )?.innerText;
      return { name, price };
    });

    return product;
  }
}
// class LeroyMerlinStrategy implements IWebScrapingStrategy {
//   getScrapedData(page: Page): Promise<ProductTemplate> {

//   }
// }
// class IkeaStrategy implements IWebScrapingStrategy {
//   getScrapedData(page: Page): Promise<ProductTemplate> {

//   }
// }

const scrapingStrategyMap = new Map<Shop, IWebScrapingStrategy>([
  ["castorama", new CastoramaStrategy()],
  // ["LEROY_MERLIN", new LeroyMerlinStrategy()],
  // ["IKEA", new IkeaStrategy()],
]);

class WebScraperService {
  private scrapingStrategy?: IWebScrapingStrategy;

  private evaluateStrategy(url: string) {
    const urlRegex = /(?:https?:\/\/)?www\.([^.\/]+)\./;
    const producerMatch = url.match(urlRegex);
    let shop;

    if (producerMatch && producerMatch[1]) {
      shop = producerMatch[1];
    } else {
      throw new Error(
        "Couldn't evaluate product producer from the provided URL.",
      );
    }

    if (!allowedShops.includes(shop as Shop)) {
      throw new Error("Unknown product producer.");
    }

    shop = shop as Shop;

    this.scrapingStrategy = scrapingStrategyMap.get(shop);

    return shop;
  }

  scrapeData = async (url: string) => {
    const shop = this.evaluateStrategy(url);

    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });

    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });

    const productData = await this.scrapingStrategy?.getScrapedData(page);

    await browser.close();

    return { shop, ...productData };
  };
}

export default new WebScraperService();
