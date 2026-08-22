import { describe, expect, it } from "vitest";

import {
  getStock,
  getStockSymbols,
  listStocks,
} from "@/lib/services/stock-service";

describe("stock service", () => {
  it("lists all stocks with computed fields", async () => {
    const stocks = await listStocks();

    expect(stocks).toHaveLength(4);
    expect(stocks[0]).toMatchObject({
      symbol: "ITC",
      companyName: "ITC Limited",
    });
    expect(stocks[0].score.total).toBeGreaterThan(0);
    expect(stocks[0].valuation.fairValue).toBeGreaterThan(0);
  });

  it("finds a stock case-insensitively", async () => {
    const stock = await getStock("itc");

    expect(stock?.symbol).toBe("ITC");
    expect(stock?.companyName).toBe("ITC Limited");
  });

  it("returns the known symbol set", async () => {
    await expect(getStockSymbols()).resolves.toEqual([
      "ITC",
      "TATAMOTORS",
      "DRREDDY",
      "KPITTECH",
    ]);
  });
});
