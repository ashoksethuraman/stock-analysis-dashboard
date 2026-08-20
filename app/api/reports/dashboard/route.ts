import { NextResponse } from "next/server";

import { NO_STORE_CACHE_HEADERS } from "@/constants/http";

import { getDashboardReport } from "@/lib/services/report-service";

export async function GET() {
  const report = await getDashboardReport();

  return NextResponse.json(report, {
    headers: NO_STORE_CACHE_HEADERS,
  });
}
