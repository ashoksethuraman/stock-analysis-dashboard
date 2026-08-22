import {
  getPortfolioSummary,
  listPortfolioHoldings,
} from "@/lib/services/portfolio-service";
import { listStocks } from "@/lib/services/stock-service";

export interface SectorAllocation {
  sector: string;
  weight: number;
}

export interface StockReportSummary {
  totalStocks: number;
  averageScore: number;
  strongCount: number;
  undervaluedCount: number;
  topRankedSymbol: string;
  bestUpsideSymbol: string;
}

export interface DashboardReport {
  market: StockReportSummary;
  portfolio: Awaited<ReturnType<typeof getPortfolioSummary>>;
  sectorAllocation: SectorAllocation[];
  recommendationBuckets: Record<string, number>;
  watchlist: Array<{
    symbol: string;
    companyName: string;
    reason: string;
  }>;
}

function round(value: number) {
  return Number(value.toFixed(2));
}

export async function getDashboardReport(): Promise<DashboardReport> {
  const [stocks, holdings, portfolio] = await Promise.all([
    listStocks(),
    listPortfolioHoldings(),
    getPortfolioSummary(),
  ]);

  const averageScore = round(
    stocks.reduce((sum, stock) => sum + stock.score.total, 0) / stocks.length
  );
  const strongCount = stocks.filter(
    (stock) => stock.score.status === "Strong"
  ).length;
  const undervaluedCount = stocks.filter(
    (stock) => stock.valuation.upside > 10
  ).length;
  const topRanked = stocks.reduce(
    (best, current) =>
      current.score.total > best.score.total ? current : best,
    stocks[0]
  );
  const bestUpside = stocks.reduce(
    (best, current) =>
      current.valuation.upside > best.valuation.upside ? current : best,
    stocks[0]
  );

  const sectorMap = new Map<string, number>();
  for (const holding of holdings) {
    sectorMap.set(
      holding.stock.sector,
      (sectorMap.get(holding.stock.sector) ?? 0) + holding.weight
    );
  }

  const recommendationBuckets = stocks.reduce<Record<string, number>>(
    (accumulator, stock) => {
      accumulator[stock.score.status] =
        (accumulator[stock.score.status] ?? 0) + 1;
      return accumulator;
    },
    {}
  );

  const watchlist = stocks
    .filter((stock) => stock.pe > stock.fairPE || stock.valuation.upside < 5)
    .slice(0, 3)
    .map((stock) => ({
      symbol: stock.symbol,
      companyName: stock.companyName,
      reason:
        stock.pe > stock.fairPE
          ? "Trading above modeled fair multiple; wait for a better entry point."
          : "Upside is limited versus current price despite solid operating quality.",
    }));

  return {
    market: {
      totalStocks: stocks.length,
      averageScore,
      strongCount,
      undervaluedCount,
      topRankedSymbol: topRanked.symbol,
      bestUpsideSymbol: bestUpside.symbol,
    },
    portfolio,
    sectorAllocation: Array.from(sectorMap.entries())
      .map(([sector, weight]) => ({ sector, weight: round(weight) }))
      .sort((left, right) => right.weight - left.weight),
    recommendationBuckets,
    watchlist,
  };
}
