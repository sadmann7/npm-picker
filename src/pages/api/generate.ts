import type { ExtendedNextRequest, OpenAIStreamPayload } from "@/types/globals";
import { openaiStream } from "@/utils/openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not defined. Please add it to .env file.");
}

export const config = {
  runtime: "edge",
};

export default async function handler(req: ExtendedNextRequest) {
  const { framework, requirement } = await req.json();

  console.log({
    requirement,
    framework,
  });

  const prompt = `Recommend me 2 npm packages for ${framework} that can ${requirement}`;

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `I am a bot that can help you find the best framework for your project. I will ask you about your requirement and framework, and then I will generate 2 npm packages that you can use in your project. Let's get started!`,
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 400,
    stream: true,
    n: 1,
  };

  const stream = await openaiStream(payload);
  return new Response(stream);
}
