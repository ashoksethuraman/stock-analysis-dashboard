import type { PortfolioHolding } from "@/data/portfolio";

import { portfolioRepository } from "@/lib/repositories/portfolio-repository";
import { listStocks, type StockViewModel } from "@/lib/services/stock-service";

export interface PortfolioHoldingViewModel extends PortfolioHolding {
  stock: StockViewModel;
  investedAmount: number;
  marketValue: number;
  gainLoss: number;
  gainLossPercent: number;
  weight: number;
}

export interface PortfolioSummary {
  totalInvested: number;
  totalMarketValue: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  holdingsCount: number;
  strongestHolding: string;
}

function round(value: number) {
  return Number(value.toFixed(2));
}

export async function listPortfolioHoldings(): Promise<
  PortfolioHoldingViewModel[]
> {
  const [holdings, stocks] = await Promise.all([
    portfolioRepository.list(),
    listStocks(),
  ]);
  const stockBySymbol = new Map(stocks.map((stock) => [stock.symbol, stock]));

  const portfolio = holdings
    .map((holding) => {
      const stock = stockBySymbol.get(holding.symbol);

      if (!stock) {
        return null;
      }

      const investedAmount = holding.averageCost * holding.quantity;
      const marketValue = stock.price * holding.quantity;
      const gainLoss = marketValue - investedAmount;

      return {
        ...holding,
        stock,
        investedAmount: round(investedAmount),
        marketValue: round(marketValue),
        gainLoss: round(gainLoss),
        gainLossPercent: round((gainLoss / investedAmount) * 100),
        weight: 0,
      };
    })
    .filter(
      (holding): holding is PortfolioHoldingViewModel => holding !== null
    );

  const totalMarketValue = portfolio.reduce(
    (sum, holding) => sum + holding.marketValue,
    0
  );

  return portfolio.map((holding) => ({
    ...holding,
    weight:
      totalMarketValue === 0
        ? 0
        : round((holding.marketValue / totalMarketValue) * 100),
  }));
}

export async function getPortfolioSummary(): Promise<PortfolioSummary> {
  const holdings = await listPortfolioHoldings();
  const totalInvested = holdings.reduce(
    (sum, holding) => sum + holding.investedAmount,
    0
  );
  const totalMarketValue = holdings.reduce(
    (sum, holding) => sum + holding.marketValue,
    0
  );
  const totalGainLoss = totalMarketValue - totalInvested;
  const strongestHolding =
    holdings.reduce(
      (best, current) =>
        current.gainLossPercent > best.gainLossPercent ? current : best,
      holdings[0]
    )?.symbol ?? "N/A";

  return {
    totalInvested: round(totalInvested),
    totalMarketValue: round(totalMarketValue),
    totalGainLoss: round(totalGainLoss),
    totalGainLossPercent:
      totalInvested === 0 ? 0 : round((totalGainLoss / totalInvested) * 100),
    holdingsCount: holdings.length,
    strongestHolding,
  };
}
