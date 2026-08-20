import { NextResponse } from "next/server";

import { NO_STORE_CACHE_HEADERS } from "@/constants/http";

import {
  getPortfolioSummary,
  listPortfolioHoldings,
} from "@/lib/services/portfolio-service";

export async function GET() {
  const [holdings, summary] = await Promise.all([
    listPortfolioHoldings(),
    getPortfolioSummary(),
  ]);

  return NextResponse.json(
    {
      holdings,
      summary,
    },
    {
      headers: NO_STORE_CACHE_HEADERS,
    }
  );
}
