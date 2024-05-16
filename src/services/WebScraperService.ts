import puppeteer from "puppeteer";

class WebScraperService {
  scrapeData = async (url: string) => {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });

    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });

    // scrape data

    await browser.close();
  };
}
