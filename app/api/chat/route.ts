import { OpenAIStream, StreamingTextResponse } from "ai";
import { DataAPIClient } from "@datastax/astra-db-ts";

const {
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_NAMESPACE,
  ASTRA_DB_COLLECTION,
  ASTRA_DB_APPLICATION_TOKEN,
  OPENAI_API_KEY,
} = process.env;

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT, { keyspace: ASTRA_DB_NAMESPACE });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const latestMessage = messages[messages.length - 1]?.content || "";

    // Create embedding for the latest user message
    // Note: We will call OpenAI Embedding API via fetch (optional) or your SDK if needed

    // For simplicity, use fetch for embedding too:
    const embeddingRes = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-embedding-3-small",
        input: latestMessage,
        encoding_format: "float",
      }),
    });

    if (!embeddingRes.ok) {
      throw new Error(`Embedding request failed: ${embeddingRes.statusText}`);
    }

    const embeddingJson = await embeddingRes.json();
    const embeddingVector = embeddingJson.data[0].embedding;

    // Query Astra DB with embedding vector for top 10 similar docs
    let docContext = "";
    try {
      const collection = await db.collection(ASTRA_DB_COLLECTION);
      const cursor = collection.find(null, {
        sort: {
          $vector: embeddingVector,
        },
        limit: 10,
      });
      const documents = await cursor.toArray();
      const docsMap = documents?.map((doc) => doc.text);
      docContext = JSON.stringify(docsMap);
    } catch (err) {
      console.log("Error querying Astra DB:", err.message);
    }

    // System prompt template with retrieved context
    const systemPrompt = {
      role: "system",
      content: `
You are an AI assistant who knows everything about footballs.
Use the below context to augment what you know about footballs.
The context provides the most recent data from Wikipedia, news sites, official football websites, and other football websites.
If the context doesn't include the information you need, answer based on your existing knowledge.
Do NOT mention the source of your information or what the context includes or does not include.
Format responses using markdown where applicable and do not return images.

---------------
START CONTEXT
${docContext}
END CONTEXT

--------------
QUESTION: ${latestMessage}

______________
      `.trim(),
    };

    // Prepare messages array for OpenAI chat completion
    const chatMessages = [systemPrompt, ...messages];

    // Call OpenAI Chat Completion API via fetch with streaming
    const chatResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: chatMessages,
        stream: true,
      }),
    });

    if (!chatResponse.ok) {
      throw new Error(`Chat completion request failed: ${chatResponse.statusText}`);
    }

    // Create a stream for the response
    const stream = OpenAIStream(chatResponse);

    // Return streaming response compatible with Next.js edge API routes or app router
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Error in POST /api/chat:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
