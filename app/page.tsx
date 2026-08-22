import { fetchPortfolio } from "@/lib/api/portfolio";
import { fetchDashboardReport } from "@/lib/api/reports";
import { fetchStocks } from "@/lib/api/stocks";
import { formatCurrency, formatPercent } from "@/lib/format";

import { MetricCard } from "@/app/components/MetricCard";
import { SectionHeading } from "@/app/components/SectionHeading";
import { StockSearchBar } from "@/app/components/StockSearchBar";
import { StockTable } from "@/app/components/StockTable";
import { PageShell } from "@/app/components/ui/PageShell";
import { Surface } from "@/app/components/ui/Surface";

export const dynamic = "force-dynamic";

interface HomePageProps {
  searchParams?: Promise<{ q?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { q = "" } = (await searchParams) ?? {};
  const [stocks, portfolio, report] = await Promise.all([
    fetchStocks(),
    fetchPortfolio(),
    fetchDashboardReport(),
  ]);

  const normalizedQuery = q.trim().toLowerCase();
  const filteredStocks = normalizedQuery
    ? stocks.filter((stock) => {
        const searchableText =
          `${stock.companyName} ${stock.symbol} ${stock.sector}`.toLowerCase();

        return searchableText.includes(normalizedQuery);
      })
    : stocks;

  return (
    <PageShell className="gap-14 py-12">
      <section className="grid gap-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_10px_40px_rgba(15,23,42,0.06)] lg:grid-cols-[1.4fr_0.9fr] lg:p-12 animate-fade-up">
        <SectionHeading
          eyebrow="Enterprise-ready analytics"
          title="Stock analysis with server-rendered fundamentals"
          description="Compare five mock companies across valuation, quality, cash flow, and capital efficiency. The interface is tuned for a brighter enterprise dashboard with reusable UI blocks, hover states, and subtle motion."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <p className="border-l-4 border-sky-500 pl-3 text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">
              Coverage
            </p>
            <p className="mt-3 text-2xl font-semibold text-slate-950">
              5 stocks
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Mock fundamentals, valuation math, API routes, and SEO metadata.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <p className="border-l-4 border-amber-500 pl-3 text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
              Portfolio
            </p>
            <p className="mt-3 text-2xl font-semibold text-slate-950">
              {portfolio.summary.holdingsCount} holdings
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Current portfolio value{" "}
              {formatCurrency(portfolio.summary.totalMarketValue)} with{" "}
              {formatPercent(portfolio.summary.totalGainLossPercent)} return.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Average Score"
          value={report.market.averageScore.toString()}
        />
        <MetricCard
          label="Strong Rated"
          value={report.market.strongCount.toString()}
        />
        <MetricCard
          label="Best Upside"
          value={report.market.bestUpsideSymbol}
        />
        <MetricCard
          label="Strongest Holding"
          value={portfolio.summary.strongestHolding}
        />
      </section>

      <section className="space-y-6">
        <StockSearchBar currentQuery={q} />
        <p className="text-sm text-slate-600">
          Showing {filteredStocks.length} of {stocks.length} stocks.
        </p>
        <StockTable stocks={filteredStocks} />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Surface className="p-8 animate-fade-up">
          <h2 className="text-2xl font-semibold text-slate-950">
            Owned stocks
          </h2>
          <div className="mt-6 space-y-4">
            {portfolio.holdings.slice(0, 3).map((holding) => (
              <div
                key={holding.symbol}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-950">
                      {holding.stock.companyName}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                      {holding.symbol} • {holding.quantity} shares
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-950">
                      {formatCurrency(holding.marketValue)}
                    </p>
                    <p className="text-xs text-slate-500">
                      Weight {formatPercent(holding.weight)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Surface>

        <Surface className="p-8 animate-fade-up">
          <h2 className="text-2xl font-semibold text-slate-950">
            Report summary
          </h2>
          <div className="mt-6 space-y-4">
            {report.watchlist.map((item) => (
              <div
                key={item.symbol}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
              >
                <p className="font-semibold text-slate-950">
                  {item.companyName} ({item.symbol})
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.reason}
                </p>
              </div>
            ))}
          </div>
        </Surface>
      </section>
    </PageShell>
  );
}
