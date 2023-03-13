import type { ExtendedNextRequest, OpenAIStreamPayload } from "@/types/globals";
import { openaiStream } from "@/utils/openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

const handler = async (req: ExtendedNextRequest) => {
  const { description, language, robotsIndex, robotsFollow, tagVariant } =
    await req.json();

  console.log({
    description,
    language,
    robotsIndex,
    robotsFollow,
    tagVariant,
  });

  const prompt = `My company is a ${description} and I want to rank on Google. I want to use the following language: ${language}. I want to use the following robots.txt settings: index: ${robotsIndex}, follow: ${robotsFollow}. I want to use the ${
    tagVariant === "selfClosing"
      ? "self-closing like in JSX or TSX"
      : "non self-closing"
  } meta tags.`;

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `I want you to act as a smart meta tags generator in html format. I will tell you what my company or idea does and you will reply me SEO optimized meta tags for my website according to my prompt. You will include these meta tags: Basic meta tags (including the title tag), Open Graph meta tags, Twitter Card meta tags, Google site verification. You will use the self-closing meta tags like in JSX or TSX when asked. You will only reply the meta tags within the html head tag, and nothing else not even html and head tags. Do not write explanations.`,
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
};

export default handler;
