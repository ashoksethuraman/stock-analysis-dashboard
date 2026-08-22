import { JSON_ACCEPT_HEADERS } from "@/constants/http";

import { getBaseUrl } from "@/lib/api/base-url";
import type { StockViewModel } from "@/lib/services/stock-service";

import "server-only";

async function apiFetch<T>(path: string): Promise<T> {
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

export async function fetchStocks() {
  return apiFetch<StockViewModel[]>("/api/stocks");
}

export async function fetchStock(symbol: string) {
  return apiFetch<StockViewModel>(`/api/stocks/${symbol}`);
}
