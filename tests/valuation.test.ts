import { describe, expect, it } from "vitest";

import {
  calculateExpectedEPS,
  calculateFairValue,
  calculateMarginOfSafety,
  calculateScore,
  calculateUpside,
  calculateValuationSnapshot,
} from "@/lib/valuation";

const techStock = {
  symbol: "TECH",
  companyName: "TechCorp",
  sector: "Technology",
  summary: "Enterprise software company.",
  price: 3450,
  marketCap: 520000,
  high52Week: 3700,
  low52Week: 2450,
  revenueGrowth: 15,
  profitGrowth: 18,
  epsGrowth: 17,
  eps: 120,
  roe: 24,
  roce: 22,
  debtToEquity: 0.25,
  operatingMargin: 28,
  freeCashFlow: 8500,
  pe: 28,
  pb: 6.5,
  dividendYield: 1.2,
  fairPE: 25,
};

describe("valuation utilities", () => {
  it("calculates valuation metrics consistently", () => {
    expect(calculateExpectedEPS(techStock)).toBe(140.4);
    expect(calculateFairValue(145, 25)).toBe(3625);
    expect(calculateUpside(3450, 3625)).toBe(5.07);
    expect(calculateMarginOfSafety(3450, 3625)).toBe(4.83);
  });

  it("builds a valuation snapshot from a stock record", () => {
    expect(calculateValuationSnapshot(techStock)).toEqual({
      expectedEPS: 140.4,
      fairValue: 3510,
      upside: 1.74,
      marginOfSafety: 1.71,
    });
  });

  it("scores a high quality business as strong", () => {
    const score = calculateScore(techStock);

    expect(score.total).toBeGreaterThanOrEqual(80);
    expect(score.status).toBe("Strong");
  });
});
