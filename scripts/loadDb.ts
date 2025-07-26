import { DataAPIClient } from "@datastax/astra-db-ts";
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
import OpenAI from "openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import "dotenv/config";

type SimilarityMetric = "dot_product" | "cosine" | "euclidean";

const {
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_NAMESPACE,
  ASTRA_DB_COLLECTION,
  ASTRA_DB_APPLICATION_TOKEN,
  OPENAI_API_KEY,
} = process.env;

if (
  !ASTRA_DB_API_ENDPOINT ||
  !ASTRA_DB_NAMESPACE ||
  !ASTRA_DB_COLLECTION ||
  !ASTRA_DB_APPLICATION_TOKEN ||
  !OPENAI_API_KEY
) {
  throw new Error("One or more required environment variables are missing.");
}

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

const FtData = [
  "https://en.wikipedia.org/wiki/Football#See_also",
  "https://www.skysports.com/football",
  "https://www.theguardian.com/football",
  "https://onefootball.com/en/home",
];

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);

const db = client.db(ASTRA_DB_API_ENDPOINT, {
  keyspace: ASTRA_DB_NAMESPACE,
});

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 512,
  chunkOverlap: 100,
});

async function createCollection(
  similarityMetric: SimilarityMetric = "dot_product"
): Promise<void> {
  try {
    const res = await db.createCollection(ASTRA_DB_COLLECTION, {
      vector: {
        dimension: 1536,
        metric: similarityMetric,
      },
    });
    console.log("Collection created:", res);
  } catch (error) {
    console.error("Error creating collection:", error);
  }
}

async function scrapePage(url: string): Promise<string> {
  try {
    const loader = new PuppeteerWebBaseLoader(url, {
      launchOptions: {
        headless: true,
      },
      gotoOptions: {
        waitUntil: "domcontentloaded",
      },
      evaluate: async (page, browser) => {
        // Extract visible text only
        const result = await page.evaluate(() => {
          return document.body.innerText;
        });
        await browser.close();
        return result;
      },
    });

    const scraped = await loader.scrape();

    // Remove excessive whitespace and line breaks
    return scraped ? scraped.replace(/\s+/g, " ").trim() : "";
  } catch (error) {
    console.error(`Failed to scrape page ${url}:`, error);
    return "";
  }
}

async function loadSampleData(): Promise<void> {
  try {
    const collection = await db.collection(ASTRA_DB_COLLECTION);

    for (const url of FtData) {
      console.log(`Scraping: ${url}`);
      const content = await scrapePage(url);

      if (!content) {
        console.warn(`No content scraped from ${url}, skipping.`);
        continue;
      }

      const chunks = await splitter.splitText(content);
      console.log(`Split into ${chunks.length} chunks.`);

      for (const chunk of chunks) {
        try {
          const embedding = await openai.embeddings.create({
            model: "text-embedding-3-large", // corrected model name
            input: chunk,
            encoding_format: "float",
          });

          const vector = embedding.data[0].embedding;

          const res = await collection.insertOne({
            $vector: vector,
            text: chunk,
            source: url, // optional: track source URL
            timestamp: new Date().toISOString(),
          });

          console.log("Inserted vector chunk:", res);
        } catch (err) {
          console.error("Error embedding or inserting chunk:", err);
        }
      }
    }
  } catch (error) {
    console.error("Error loading sample data:", error);
  }
}

async function main() {
  await createCollection();
  await loadSampleData();
}

main().catch((error) => {
  console.error("Fatal error:", error);
});
