import type { npmResponse } from "@/types/globals";
import { JSDOM } from "jsdom";
import type { NextApiResponse } from "next";

export default async function handler(req: npmResponse, res: NextApiResponse) {
  const { name } = req.body;
  const response = await fetch(`https://www.npmjs.com/package/${name}`);

  const html = await response.text();
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const repository = document.querySelector("#repository-link")?.textContent;
  const downloads = document.querySelector("._9ba9a726")?.textContent;
  const unpackedSize = document.querySelector(".f2874b88")?.textContent;
  const lastPublish = document.querySelector("time")?.getAttribute("datetime");

  res.status(200).json({
    name,
    repository,
    downloads,
    unpackedSize,
    lastPublish,
  });
}
