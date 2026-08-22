export const SITE_KEYWORDS = [
  "Next.js SSR",
  "stock analysis dashboard",
  "Azure App Service",
  "valuation calculator",
  "financial dashboard",
] as const;

export const DEFAULT_SITE_URL =
  "https://stock-analysis-dashboard.azurewebsites.net";

export const siteConfig = {
  name: "Stock Analysis Dashboard",
  shortName: "Stock Dashboard",
  description:
    "SSR stock analysis dashboard built with Next.js, TypeScript, and mock company fundamentals for valuation analysis.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    DEFAULT_SITE_URL,
  keywords: [...SITE_KEYWORDS],
};
