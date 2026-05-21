import { NextRequest } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  const { description, language, apiKey } = await req.json();

  if (!apiKey?.trim()) {
    return Response.json({ error: "API key required" }, { status: 401 });
  }
  if (!description?.trim()) {
    return Response.json({ error: "Description required" }, { status: 400 });
  }

  const client = new OpenAI({
    apiKey,
    baseURL: "https://api.xiaomimimo.com/v1",
  });

  const prompt = `You are VibeCoder — an AI that translates casual, non-technical descriptions into real, working starter code.

The user wants to build: "${description}"
Target language/framework: ${language}

Respond in this EXACT JSON format (raw JSON only, no markdown wrapping, no code blocks):
{
  "spec": "4-6 bullet points using • character. Describe what this project does and how it works. Plain language, no jargon. Each bullet on its own line.",
  "code": "Complete, runnable starter code in ${language}. Include inline comments explaining each important section. Make it clean and well-structured.",
  "explain": "Explain the code using fun analogies. Like explaining to someone who loves games but never coded before. 3-4 short paragraphs separated by blank lines."
}`;

  try {
    const stream = await client.chat.completions.create({
      model: "mimo-v2.5-pro",
      messages: [{ role: "user", content: prompt }],
      stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || "";
          if (text) controller.enqueue(encoder.encode(text));
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
