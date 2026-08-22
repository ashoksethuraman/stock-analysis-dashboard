import { NextResponse } from "next/server";

import { NO_STORE_CACHE_HEADERS } from "@/constants/http";

import { listStocks } from "@/lib/services/stock-service";

export async function GET() {
  const stocks = await listStocks();

  return NextResponse.json(stocks, {
    headers: NO_STORE_CACHE_HEADERS,
  });
}
