import type { Stock } from "@/data/stocks";
import stockRecords from "@/data/stocks.json";

export interface StockRepository {
  list(): Promise<Stock[]>;
  findBySymbol(symbol: string): Promise<Stock | null>;
}

function normalizeStock(record: Stock): Stock {
  return {
    ...record,
    symbol: record.symbol.toUpperCase(),
    companyName: record.companyName.trim(),
    sector: record.sector.trim(),
    summary: record.summary.trim(),
  };
}

class MockStockRepository implements StockRepository {
  private readonly records: Stock[];

  constructor(records: Stock[]) {
    this.records = records.map(normalizeStock);
  }

  async list() {
    return this.records;
  }

  async findBySymbol(symbol: string) {
    const normalizedSymbol = symbol.toUpperCase();
    return (
      this.records.find((stock) => stock.symbol === normalizedSymbol) ?? null
    );
  }
}

export const stockRepository: StockRepository = new MockStockRepository(
  stockRecords as Stock[]
);
