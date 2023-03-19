import type { ExtendedNextApiRequestPkg, Package } from "@/types/globals";
import { load } from "cheerio";
import type { NextApiResponse } from "next";

type ResponseData = Package | { error: string };

export default async function handler(
  req: ExtendedNextApiRequestPkg,
  res: NextApiResponse<ResponseData>
) {
  const { name } = req.body;

  try {
    if (!name) throw new Error("No package name provided");

    const url = `https://www.npmjs.com/package/${name}`;
    const response = await fetch(url);
    const html = await response.text();
    const $ = load(html);

    const repository = $("#repository-link").text();
    const downloads = $("._9ba9a726").text();
    const unpackedSize = $(
      'p[class="f2874b88 fw6 mb3 mt2 truncate black-80 f4"]'
    )
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
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "Something went wrong" });
    }
  }
}
