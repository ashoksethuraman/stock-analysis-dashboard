import type { MetadataRoute } from "next";

import { getStockSymbols } from "@/lib/services/stock-service";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const symbols = await getStockSymbols();

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...symbols.map((symbol) => ({
      url: `${siteConfig.url}/stocks/${symbol}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
