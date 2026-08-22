import type { Stock } from "@/data/stocks";

export interface ScoreBreakdown {
  growth: number;
  profitability: number;
  debt: number;
  cashFlow: number;
  valuation: number;
  businessQuality: number;
  total: number;
  status: "Strong" | "Good" | "Average" | "Weak";
}

export interface ValuationSnapshot {
  expectedEPS: number;
  fairValue: number;
  upside: number;
  marginOfSafety: number;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function round(value: number) {
  return Number(value.toFixed(2));
}

export function calculateFairValue(expectedEPS: number, fairPE: number) {
  return round(expectedEPS * fairPE);
}

export function calculateUpside(currentPrice: number, fairValue: number) {
  return round(((fairValue - currentPrice) / currentPrice) * 100);
}

export function calculatePE(price: number, eps: number) {
  return round(price / eps);
}

export function calculateExpectedEPS(stock: Stock) {
  return round(stock.eps * (1 + stock.epsGrowth / 100));
}

export function calculateMarginOfSafety(
  currentPrice: number,
  fairValue: number
) {
  return round(((fairValue - currentPrice) / fairValue) * 100);
}

export function calculateValuationSnapshot(stock: Stock): ValuationSnapshot {
  const expectedEPS = calculateExpectedEPS(stock);
  const fairValue = calculateFairValue(expectedEPS, stock.fairPE);

  return {
    expectedEPS,
    fairValue,
    upside: calculateUpside(stock.price, fairValue),
    marginOfSafety: calculateMarginOfSafety(stock.price, fairValue),
  };
}

export function calculateScore(stock: Stock): ScoreBreakdown {
  const growth = clamp(
    Math.round(
      (stock.revenueGrowth + stock.profitGrowth + stock.epsGrowth) / 3
    ),
    0,
    20
  );
  const profitability = clamp(
    Math.round((stock.roe * 0.55 + stock.roce * 0.45) / 1.2),
    0,
    20
  );
  const debt = clamp(
    Math.round((1 - Math.min(stock.debtToEquity, 1)) * 10),
    0,
    10
  );
  const cashFlow = clamp(
    Math.round(stock.operatingMargin / 2 + stock.freeCashFlow / 2000),
    0,
    15
  );
  const valuation = clamp(Math.round((stock.fairPE / stock.pe) * 15), 0, 15);
  const businessQuality = clamp(
    Math.round((stock.roe + stock.roce + stock.operatingMargin) / 4),
    0,
    20
  );
  const total =
    growth + profitability + debt + cashFlow + valuation + businessQuality;

  let status: ScoreBreakdown["status"] = "Weak";

  if (total >= 80) {
    status = "Strong";
  } else if (total >= 65) {
    status = "Good";
  } else if (total >= 50) {
    status = "Average";
  }

  return {
    growth,
    profitability,
    debt,
    cashFlow,
    valuation,
    businessQuality,
    total,
    status,
  };
}
