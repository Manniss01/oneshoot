import OpenAI from "openai";
import { StreamingTextResponse } from "ai";
import { DataAPIClient } from "@datastax/astra-db-ts";

const {
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_NAMESPACE,
  ASTRA_DB_COLLECTION,
  ASTRA_DB_APPLICATION_TOKEN,
  OPENAI_API_KEY,
} = process.env;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT, { keyspace: ASTRA_DB_NAMESPACE });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const latestMessage = messages[messages.length - 1]?.content;

    let docContext = "";

    // Generate embeddings
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: latestMessage,
      encoding_format: "float",
    });

    try {
      const collection = await db.collection(ASTRA_DB_COLLECTION);
      const cursor = collection.find(null, {
        sort: {
          $vector: embedding.data[0].embedding,
        },
        limit: 10,
      });

      const documents = await cursor.toArray();
      const docsMap = documents?.map((doc) => doc.text);

      docContext = JSON.stringify(docsMap);
    } catch (err: any) {
      console.error("Error querying DB...", err.message);
    }

    const template = {
      role: "system",
      content: `
You are an AI assistant who knows everything about footballs.
Use the below context to augment what you know about footballs.
The context will provide you with the most recent page data from Wikipedia, news sites, official football websites, and other football-related websites.
If the context doesn't include the information you need to answer, use your existing knowledge.
Do not mention the source of your information or what the context does or doesn't include.
Format responses using markdown where applicable and do not return images.

---------------
START CONTEXT
${docContext}
END CONTEXT

--------------
QUESTION: ${latestMessage}

______________
`,
    };

    // Create streaming chat completion
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [template, ...messages],
    });

    // `completion` is an AsyncIterable<ChatCompletionChunk>
    // Use StreamingTextResponse directly with the AsyncIterable
    return new StreamingTextResponse(completion);
  } catch (err) {
    console.error(err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
