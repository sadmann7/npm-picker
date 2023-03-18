import {
  FRAMEWORK,
  type ExtendedNextRequest,
  type OpenAIStreamPayload,
} from "@/types/globals";
import { openaiStream } from "@/utils/openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error(
    "OPENAI_API_KEY is not defined in .env file. Please add it there (see README.md for more details)."
  );
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

  const prompt = `Find npm packages for ${requirement} and ${
    framework === FRAMEWORK.NOT_SPECIFIED ? "any framework" : framework
  }. Make sure that the packages are compatible with ${framework} and are available on the node packgae manager. Make sure not to begin the result with any text like: 'Sure here, ...' and so on.`;

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a node package manager (npm) package finder. I will give you a requirement and a framework of my choice. You will recommend me npm packages (from 2 to 3 packages) for that requirement and framework. You will only find packages compatible with my framework. You will only find packages that are well-maintained, safe, and not deprecated. You will provide a description within 25 words for each package. Make sure to only show name and description and nothing else, not even the intro text. Make sure to find the actual name of each package. You will not ask ny further question. You will use the following templeate: 1. Package name: description.",
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
