import puppeteer, { Page } from "puppeteer";

type ProductProducer = "castorama" | "leroy_merlin" | "ikea";
const allowedProducers: ProductProducer[] = [
  "castorama",
  "leroy_merlin",
  "ikea",
];

interface ProductTemplate {
  url?: string;
  name?: string;
  description?: string;
  price?: string;
  imageUrl?: string;
  producer?: ProductProducer;
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
        "[data-test-id='product-primary-price'",
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

const scrapingStrategyMap = new Map<ProductProducer, IWebScrapingStrategy>([
  ["castorama", new CastoramaStrategy()],
  ["leroy_merlin", new LeroyMerlinStrategy()],
  ["ikea", new IkeaStrategy()],
]);

class WebScraperService {
  scrapingStrategy?: IWebScrapingStrategy;

  private evaluateStrategy(url: string) {
    const urlRegex = /(?:https?:\/\/)?www\.([^.\/]+)\./;
    const producerMatch = url.match(urlRegex);
    let producer;

    if (producerMatch && producerMatch[1]) {
      producer = producerMatch[1];
    } else {
      throw new Error(
        "Couldn't evaluate product producer from the provided URL.",
      );
    }

    if (!allowedProducers.includes(producer as ProductProducer)) {
      throw new Error("Unknown product producer.");
    }

    producer = producer as ProductProducer;

    this.scrapingStrategy = scrapingStrategyMap.get(producer);

    return producer;
  }

  scrapeData = async (url: string) => {
    const producer = this.evaluateStrategy(url);

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
