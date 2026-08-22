import { JSON_ACCEPT_HEADERS } from "@/constants/http";

import { getBaseUrl } from "@/lib/api/base-url";
import type {
  PortfolioHoldingViewModel,
  PortfolioSummary,
} from "@/lib/services/portfolio-service";

import "server-only";

async function portfolioApiFetch<T>(path: string): Promise<T> {
  const baseUrl = await getBaseUrl();
  const response = await fetch(`${baseUrl}${path}`, {
    cache: "no-store",
    headers: JSON_ACCEPT_HEADERS,
  });

  if (!response.ok) {
    throw new Error(`API request failed for ${path}`);
  }

  return response.json() as Promise<T>;
}

export interface PortfolioResponse {
  holdings: PortfolioHoldingViewModel[];
  summary: PortfolioSummary;
}

export async function fetchPortfolio() {
  return portfolioApiFetch<PortfolioResponse>("/api/portfolio");
}
