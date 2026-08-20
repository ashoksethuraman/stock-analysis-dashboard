import Link from "next/link";

import { formatCurrency, formatPercent } from "@/lib/format";
import type { StockViewModel } from "@/lib/services/stock-service";

import { Surface } from "@/app/components/ui/Surface";

interface StockTableProps {
  stocks: StockViewModel[];
}

export function StockTable({ stocks }: StockTableProps) {
  return (
    <Surface className="overflow-hidden">
      <table className="min-w-full divide-y divide-slate-200 text-left">
        <caption className="sr-only">
          Server-rendered stock comparison table
        </caption>
        <thead className="bg-slate-50 text-xs uppercase tracking-[0.2em] text-slate-500">
          <tr>
            <th scope="col" className="px-6 py-4">
              Company
            </th>
            <th scope="col" className="px-6 py-4">
              Price
            </th>
            <th scope="col" className="px-6 py-4">
              P/E
            </th>
            <th scope="col" className="px-6 py-4">
              ROE
            </th>
            <th scope="col" className="px-6 py-4">
              Growth
            </th>
            <th scope="col" className="px-6 py-4">
              Score
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
          {stocks.length ? (
            stocks.map((stock) => {
              return (
                <tr
                  key={stock.symbol}
                  className="transition duration-200 hover:bg-sky-50/80"
                >
                  <td className="px-6 py-5">
                    <Link
                      href={`/stocks/${stock.symbol}`}
                      className="group block"
                      aria-label={`View details for ${stock.companyName} (${stock.symbol})`}
                    >
                      <div className="font-semibold text-slate-950 transition group-hover:text-sky-700">
                        {stock.companyName}
                      </div>
                      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                        {stock.symbol} • {stock.sector}
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-5">{formatCurrency(stock.price)}</td>
                  <td className="px-6 py-5">{stock.pe}</td>
                  <td className="px-6 py-5">{formatPercent(stock.roe)}</td>
                  <td className="px-6 py-5">
                    {formatPercent(stock.revenueGrowth)}
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                      {stock.score.total}/100
                    </span>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={6}
                className="px-6 py-10 text-center text-sm text-slate-500"
              >
                No stocks match your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Surface>
  );
}
