import { describe, expect, it } from "vitest";

import {
  getPortfolioSummary,
  listPortfolioHoldings,
} from "@/lib/services/portfolio-service";
import { getDashboardReport } from "@/lib/services/report-service";

describe("portfolio and report services", () => {
  it("builds holdings with linked stock analytics", async () => {
    const holdings = await listPortfolioHoldings();

    expect(holdings).toHaveLength(4);
    expect(holdings[0].stock.companyName).toBeTruthy();
    expect(holdings[0].marketValue).toBeGreaterThan(0);
    expect(holdings[0].weight).toBeGreaterThan(0);
  });

  it("aggregates portfolio summary values", async () => {
    const summary = await getPortfolioSummary();

    expect(summary.holdingsCount).toBe(4);
    expect(summary.totalInvested).toBeGreaterThan(0);
    expect(summary.totalMarketValue).toBeGreaterThan(0);
    expect(summary.strongestHolding).toBeTruthy();
  });

  it("creates a market and portfolio report", async () => {
    const report = await getDashboardReport();

    expect(report.market.totalStocks).toBe(4);
    expect(report.market.averageScore).toBeGreaterThan(0);
    expect(report.sectorAllocation.length).toBeGreaterThan(0);
    expect(report.watchlist.length).toBeGreaterThan(0);
  });
});
