import Link from "next/link";

import { formatPercent } from "@/lib/format";
import type { DashboardReport } from "@/lib/services/report-service";

import { Surface } from "@/app/components/ui/Surface";

interface ReportPanelProps {
  report: DashboardReport;
}

export function ReportPanel({ report }: ReportPanelProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <Surface className="p-8">
        <h2 className="text-2xl font-semibold text-slate-950">Market report</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
              Average Score
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">
              {report.market.averageScore}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
              Strong Rated
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">
              {report.market.strongCount}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
              Undervalued
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">
              {report.market.undervaluedCount}
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="border-l-4 border-sky-500 pl-3 text-xs uppercase tracking-[0.16em] text-sky-700">
              Top Ranked
            </p>
            <Link
              href={`/stocks/${report.market.topRankedSymbol}`}
              className="mt-2 block pl-3 text-xl font-semibold text-slate-950 transition hover:text-sky-700"
            >
              {report.market.topRankedSymbol}
            </Link>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="border-l-4 border-emerald-500 pl-3 text-xs uppercase tracking-[0.16em] text-emerald-700">
              Best Upside
            </p>
            <Link
              href={`/stocks/${report.market.bestUpsideSymbol}`}
              className="mt-2 block pl-3 text-xl font-semibold text-slate-950 transition hover:text-emerald-700"
            >
              {report.market.bestUpsideSymbol}
            </Link>
          </div>
        </div>
      </Surface>

      <Surface className="p-8">
        <h2 className="text-2xl font-semibold text-slate-950">
          Portfolio allocation
        </h2>
        <div className="mt-6 space-y-4">
          {report.sectorAllocation.map((allocation) => (
            <div key={allocation.sector} className="space-y-2">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>{allocation.sector}</span>
                <span>{formatPercent(allocation.weight)}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-sky-500 to-amber-400"
                  style={{ width: `${allocation.weight}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-slate-950">Watchlist</h3>
          <div className="mt-4 space-y-3">
            {report.watchlist.map((stock) => (
              <div
                key={stock.symbol}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
              >
                <Link
                  href={`/stocks/${stock.symbol}`}
                  className="font-semibold text-slate-950 hover:text-sky-700"
                >
                  {stock.companyName} ({stock.symbol})
                </Link>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {stock.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Surface>
    </div>
  );
}
