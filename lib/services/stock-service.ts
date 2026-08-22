import type { Stock } from "@/data/stocks";

import { stockRepository } from "@/lib/repositories/stock-repository";
import {
  calculateScore,
  calculateValuationSnapshot,
  type ScoreBreakdown,
  type ValuationSnapshot,
} from "@/lib/valuation";

export interface StockViewModel extends Stock {
  valuation: ValuationSnapshot;
  score: ScoreBreakdown;
}

function toViewModel(stock: Stock): StockViewModel {
  return {
    ...stock,
    valuation: calculateValuationSnapshot(stock),
    score: calculateScore(stock),
  };
}

export async function listStocks() {
  const stocks = await stockRepository.list();
  return stocks.map(toViewModel);
}

export async function getStock(symbol: string) {
  const stock = await stockRepository.findBySymbol(symbol);
  return stock ? toViewModel(stock) : null;
}

export async function getStockSymbols() {
  const stocks = await stockRepository.list();
  return stocks.map((stock) => stock.symbol);
}
