import { JSON_ACCEPT_HEADERS } from "@/constants/http";

import { getBaseUrl } from "@/lib/api/base-url";
import type { DashboardReport } from "@/lib/services/report-service";

import "server-only";

export async function fetchDashboardReport() {
  const baseUrl = await getBaseUrl();
  const response = await fetch(`${baseUrl}/api/reports/dashboard`, {
    cache: "no-store",
    headers: JSON_ACCEPT_HEADERS,
  });

  if (!response.ok) {
    throw new Error("API request failed for /api/reports/dashboard");
  }

  return response.json() as Promise<DashboardReport>;
}
