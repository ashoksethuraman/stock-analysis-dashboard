import { describe, expect, it } from "vitest";

import { GET as healthGet } from "@/app/api/health/route";
import { GET as portfolioGet } from "@/app/api/portfolio/route";
import { GET as reportGet } from "@/app/api/reports/dashboard/route";
import { GET as stockBySymbolGet } from "@/app/api/stocks/[symbol]/route";
import { GET as stocksGet } from "@/app/api/stocks/route";

describe("API routes", () => {
  it("returns the stock collection", async () => {
    const response = await stocksGet();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toHaveLength(4);
    expect(body[0]).toHaveProperty("valuation");
    expect(body[0]).toHaveProperty("score");
  });

  it("returns a single stock by symbol", async () => {
    const response = await stockBySymbolGet(
      new Request("http://localhost/api/stocks/ITC"),
      {
        params: Promise.resolve({ symbol: "ITC" }),
      }
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.symbol).toBe("ITC");
  });

  it("returns 404 for an unknown symbol", async () => {
    const response = await stockBySymbolGet(
      new Request("http://localhost/api/stocks/UNKNOWN"),
      {
        params: Promise.resolve({ symbol: "UNKNOWN" }),
      }
    );
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body).toEqual({ message: "Stock not found" });
  });

  it("returns health information", async () => {
    const response = await healthGet();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.status).toBe("ok");
    expect(body.service).toBe("stock-analysis-dashboard");
  });

  it("returns the portfolio payload", async () => {
    const response = await portfolioGet();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.holdings.length).toBeGreaterThan(0);
    expect(body.summary.holdingsCount).toBe(body.holdings.length);
  });

  it("returns the dashboard report payload", async () => {
    const response = await reportGet();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.market.totalStocks).toBe(4);
    expect(body.portfolio.holdingsCount).toBeGreaterThan(0);
    expect(body.watchlist.length).toBeGreaterThan(0);
  });
});
