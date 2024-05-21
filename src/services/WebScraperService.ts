import { Shop } from "@prisma/client";
import puppeteer, { Page } from "puppeteer";

const allowedShops: Shop[] = ["CASTORAMA", "LEROY_MERLIN", "IKEA"];

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
  getScrapedData(page: Page): ProductTemplate;
}

class CastoramaStrategy implements IWebScrapingStrategy {
  getScrapedData(page: Page): ProductTemplate {
    const product = page.evaluate(() => {
      const name =
        document.querySelector<HTMLElement>("#product-title")?.innerText;
      // const description = ???
      const price = document.querySelector<HTMLElement>(
        "[data-test-id='product-primary-price']",
      )?.innerText;
    });

    return {};
  }
}
class LeroyMerlinStrategy implements IWebScrapingStrategy {
  getScrapedData(page: Page): ProductTemplate {
    return {};
  }
}
class IkeaStrategy implements IWebScrapingStrategy {
  getScrapedData(page: Page): ProductTemplate {
    return {};
  }
}

const scrapingStrategyMap = new Map<Shop, IWebScrapingStrategy>([
  ["CASTORAMA", new CastoramaStrategy()],
  ["LEROY_MERLIN", new LeroyMerlinStrategy()],
  ["IKEA", new IkeaStrategy()],
]);

class WebScraperService {
  scrapingStrategy?: IWebScrapingStrategy;

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

    const productData = this.scrapingStrategy?.getScrapedData(page);

    await browser.close();

    return productData;
  };
}

export default new WebScraperService();
