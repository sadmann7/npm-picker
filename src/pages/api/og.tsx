import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "My default title";

    // ?description=<description>
    const hasDescription = searchParams.has("description");
    const description = hasDescription
      ? searchParams.get("description")?.slice(0, 200)
      : "My default description";

    return new ImageResponse(
      (
        <div
          tw="h-full w-full flex items-center justify-center flex-col"
          style={{
            backgroundImage: "linear-gradient(to bottom, #111827, #374151)",
          }}
        >
          <div tw="flex items-center text-3xl justify-center flex-col">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="125"
              height="125"
              viewBox="0 0 25 25"
              fill="transparent"
              stroke="white"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-package"
            >
              <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
          <div tw="flex max-w-4xl items-center justify-center flex-col mt-10">
            <div tw="text-5xl font-bold whitespace-pre-wrap tracking-tight leading-tight text-white px-8">
              {title}
            </div>
            <div tw="mt-5 text-3xl text-gray-300 text-center font-normal whitespace-pre-wrap tracking-tight leading-tight px-20">
              {description}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    e instanceof Error && console.log(`${e.message as string}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
