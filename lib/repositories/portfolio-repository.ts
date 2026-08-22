import type { PortfolioHolding } from "@/data/portfolio";
import portfolioRecords from "@/data/portfolio.json";

export interface PortfolioRepository {
  list(): Promise<PortfolioHolding[]>;
}

class MockPortfolioRepository implements PortfolioRepository {
  constructor(private readonly records: PortfolioHolding[]) {}

  async list() {
    return this.records.map((record) => ({
      ...record,
      symbol: record.symbol.toUpperCase(),
      rationale: record.rationale.trim(),
    }));
  }
}

export const portfolioRepository: PortfolioRepository =
  new MockPortfolioRepository(portfolioRecords as PortfolioHolding[]);
