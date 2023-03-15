import type { npmResponse } from "@/types/globals";
import { load } from "cheerio";
import type { NextApiResponse } from "next";

export default async function handler(req: npmResponse, res: NextApiResponse) {
  const { name } = req.body;
  const url = `https://www.npmjs.com/package/${name}`;
  const response = await fetch(url);
  const html = await response.text();
  const $ = load(html);

  const repository = $("#repository-link").text();
  const downloads = $("._9ba9a726").text();
  const unpackedSize = $('p[class="f2874b88 fw6 mb3 mt2 truncate black-80 f4"]')
    .filter(
      (_, el) => $(el).text().includes("kB") || $(el).text().includes("MB")
    )
    .text();
  const lastPublish = $("time").attr("datetime");

  res.status(200).json({
    name,
    repository,
    downloads,
    unpackedSize,
    lastPublish,
  });
}
