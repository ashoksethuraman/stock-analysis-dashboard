export interface PortfolioHolding {
  symbol: string;
  quantity: number;
  averageCost: number;
  conviction: "High" | "Medium" | "Watchlist";
  horizon: "Long Term" | "Medium Term" | "Review";
  rationale: string;
}
