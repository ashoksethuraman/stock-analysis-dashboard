import type { Metadata } from "next";

import { fetchPortfolio } from "@/lib/api/portfolio";
import { formatCurrency, formatPercent } from "@/lib/format";

import { MetricCard } from "@/app/components/MetricCard";
import { PortfolioTable } from "@/app/components/PortfolioTable";
import { PageShell } from "@/app/components/ui/PageShell";

export const metadata: Metadata = {
  title: "Owned Stocks",
  description:
    "Track owned stocks, position weights, and unrealized gain or loss across the mock portfolio.",
};

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const portfolio = await fetchPortfolio();

  return (
    <PageShell className="gap-10 py-12">
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_10px_40px_rgba(15,23,42,0.06)] lg:p-12 animate-fade-up">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
          Owned Stocks
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Portfolio tracking and allocation
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          Review current holdings, position sizing, unrealized returns, and the
          investment rationale for each owned stock in the mock portfolio.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Total Invested"
          value={formatCurrency(portfolio.summary.totalInvested)}
        />
        <MetricCard
          label="Market Value"
          value={formatCurrency(portfolio.summary.totalMarketValue)}
        />
        <MetricCard
          label="Unrealized P/L"
          value={formatCurrency(portfolio.summary.totalGainLoss)}
        />
        <MetricCard
          label="Return"
          value={formatPercent(portfolio.summary.totalGainLossPercent)}
        />
      </section>

      <PortfolioTable holdings={portfolio.holdings} />

      <section className="grid gap-4 xl:grid-cols-2">
        {portfolio.holdings.map((holding) => (
          <div
            key={holding.symbol}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-950">
                  {holding.stock.companyName}
                </h2>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                  {holding.symbol} • {holding.conviction} conviction
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">
                {holding.horizon}
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {holding.rationale}
            </p>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
