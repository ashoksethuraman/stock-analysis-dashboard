import { NextResponse } from "next/server";

import { NO_STORE_CACHE_HEADERS } from "@/constants/http";

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      service: "stock-analysis-dashboard",
      timestamp: new Date().toISOString(),
    },
    {
      headers: NO_STORE_CACHE_HEADERS,
    }
  );
}
