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

  const prompt = `Recommend me npm packages for ${requirement} and ${
    framework === FRAMEWORK.NOT_SPECIFIED ? "any frameworks" : framework
  }. Make sure that the packages are compatible with ${framework} and are available on the npm website. Make sure not to begin the result with any text like: 'Sure here, ...' and so on.`;

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "I am a bot that recommends npm packages for your project. I will recommend npm packages (2 to 3 npm packages based on the availability for the given prompt) for you based on your requirements and framework. I will also provide a short description within 25 words for each package. I will only recommend packages that are compatible with your framework and availabe on the npm website, and have at least 1000 weekly downloads. I will only recommend packages that are well-maintained, safe, and not deprecated. I will not ask any further questions. I will only show the actual name, and description, and nothing else. I will not include any text like: 'Sure here, ...' and so on at the beginning of the result for each session. I will use the following template: 1. Package name: description. 2. Package name: description. 3. Package name: description.",
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
