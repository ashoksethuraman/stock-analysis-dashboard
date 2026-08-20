import Link from "next/link";

import { formatCurrency, formatPercent } from "@/lib/format";
import type { PortfolioHoldingViewModel } from "@/lib/services/portfolio-service";

import { Surface } from "@/app/components/ui/Surface";

interface PortfolioTableProps {
  holdings: PortfolioHoldingViewModel[];
}

export function PortfolioTable({ holdings }: PortfolioTableProps) {
  return (
    <Surface className="overflow-hidden">
      <table className="min-w-full divide-y divide-slate-200 text-left">
        <thead className="bg-slate-50 text-xs uppercase tracking-[0.2em] text-slate-500">
          <tr>
            <th className="px-6 py-4">Holding</th>
            <th className="px-6 py-4">Qty</th>
            <th className="px-6 py-4">Avg Cost</th>
            <th className="px-6 py-4">Market Value</th>
            <th className="px-6 py-4">P/L</th>
            <th className="px-6 py-4">Weight</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
          {holdings.map((holding) => (
            <tr
              key={holding.symbol}
              className="transition duration-200 hover:bg-sky-50/80"
            >
              <td className="px-6 py-5">
                <Link
                  href={`/stocks/${holding.symbol}`}
                  className="font-semibold text-slate-950 hover:text-sky-700"
                >
                  {holding.stock.companyName}
                </Link>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                  {holding.symbol} • {holding.conviction} • {holding.horizon}
                </div>
              </td>
              <td className="px-6 py-5">{holding.quantity}</td>
              <td className="px-6 py-5">
                {formatCurrency(holding.averageCost)}
              </td>
              <td className="px-6 py-5">
                {formatCurrency(holding.marketValue)}
              </td>
              <td className="px-6 py-5">
                <div
                  className={
                    holding.gainLoss >= 0 ? "text-emerald-700" : "text-rose-600"
                  }
                >
                  {formatCurrency(holding.gainLoss)}
                </div>
                <div className="text-xs text-slate-500">
                  {formatPercent(holding.gainLossPercent)}
                </div>
              </td>
              <td className="px-6 py-5">{formatPercent(holding.weight)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Surface>
  );
}
