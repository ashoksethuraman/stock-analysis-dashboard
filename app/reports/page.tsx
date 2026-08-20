import type { Metadata } from "next";

import { fetchDashboardReport } from "@/lib/api/reports";
import { formatCurrency, formatPercent } from "@/lib/format";

import { MetricCard } from "@/app/components/MetricCard";
import { ReportPanel } from "@/app/components/ReportPanel";
import { PageShell } from "@/app/components/ui/PageShell";

export const metadata: Metadata = {
  title: "Reports",
  description:
    "Review portfolio allocation, watchlist triggers, scoring distribution, and valuation-led stock report summaries.",
};

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  const report = await fetchDashboardReport();

  return (
    <PageShell className="gap-10 py-12">
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_10px_40px_rgba(15,23,42,0.06)] lg:p-12 animate-fade-up">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
          Reports
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Decision-ready analysis reports
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          Aggregate market quality, portfolio allocation, and watchlist actions
          into a single server-rendered reporting view suitable for later
          persistence and scheduled jobs.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Portfolio Value"
          value={formatCurrency(report.portfolio.totalMarketValue)}
        />
        <MetricCard
          label="Portfolio Return"
          value={formatPercent(report.portfolio.totalGainLossPercent)}
        />
        <MetricCard
          label="Top Ranked Stock"
          value={report.market.topRankedSymbol}
        />
        <MetricCard
          label="Best Upside"
          value={report.market.bestUpsideSymbol}
        />
      </section>

      <ReportPanel report={report} />
    </PageShell>
  );
}
