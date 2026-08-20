export interface Stock {
  symbol: string;
  companyName: string;
  sector: string;
  summary: string;
  price: number;
  marketCap: number;
  high52Week: number;
  low52Week: number;
  revenueGrowth: number;
  profitGrowth: number;
  epsGrowth: number;
  eps: number;
  roe: number;
  roce: number;
  debtToEquity: number;
  operatingMargin: number;
  freeCashFlow: number;
  pe: number;
  pb: number;
  dividendYield: number;
  fairPE: number;
}
