import { NextResponse } from "next/server";

import { NO_STORE_CACHE_HEADERS } from "@/constants/http";

import { getStock } from "@/lib/services/stock-service";

interface RouteContext {
  params: Promise<{ symbol: string }>;
}

export async function GET(_: Request, context: RouteContext) {
  const { symbol } = await context.params;
  const stock = await getStock(symbol);

  if (!stock) {
    return NextResponse.json({ message: "Stock not found" }, { status: 404 });
  }

  return NextResponse.json(stock, {
    headers: NO_STORE_CACHE_HEADERS,
  });
}
