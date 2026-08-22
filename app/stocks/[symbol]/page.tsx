import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { fetchStock } from "@/lib/api/stocks";
import { formatCrCurrency, formatCurrency, formatPercent } from "@/lib/format";
import { getStockSymbols } from "@/lib/services/stock-service";
import { siteConfig } from "@/lib/site";

import { MetricCard } from "@/app/components/MetricCard";
import { ScoreCard } from "@/app/components/ScoreCard";
import { Button } from "@/app/components/ui/Button";
import { PageShell } from "@/app/components/ui/PageShell";
import { ValuationCard } from "@/app/components/ValuationCard";

interface StockPageProps {
  params: Promise<{ symbol: string }>;
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const symbols = await getStockSymbols();
  return symbols.map((symbol) => ({ symbol }));
}

export async function generateMetadata({
  params,
}: StockPageProps): Promise<Metadata> {
  const { symbol } = await params;

  try {
    const stock = await fetchStock(symbol);

    return {
      title: `${stock.companyName} (${stock.symbol})`,
      description: `${stock.companyName} stock analysis covering valuation, balance sheet, growth metrics, and scorecard.`,
      alternates: {
        canonical: `/stocks/${stock.symbol}`,
      },
      openGraph: {
        title: `${stock.companyName} Stock Analysis`,
        description: stock.summary,
        url: `${siteConfig.url}/stocks/${stock.symbol}`,
      },
    };
  } catch {
    return {
      title: `Stock Not Found (${symbol.toUpperCase()})`,
    };
  }
}

export default async function StockDetailPage({ params }: StockPageProps) {
  const { symbol } = await params;

  let stock;

  try {
    stock = await fetchStock(symbol);
  } catch {
    notFound();
  }

  return (
    <PageShell className="gap-10 py-12">
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_10px_40px_rgba(15,23,42,0.06)] lg:p-12 animate-fade-up">
        <Button href="/" variant="ghost" className="mb-6">
          Back to dashboard
        </Button>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <p className="text-sm uppercase tracking-[0.25em] text-sky-700">
              {stock.sector}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              {stock.companyName}{" "}
              <span className="text-slate-500">({stock.symbol})</span>
            </h1>
            <p className="text-base leading-7 text-slate-600">
              {stock.summary}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 text-right shadow-sm">
            <p className="border-l-4 border-sky-500 pl-3 text-xs uppercase tracking-[0.16em] text-sky-700">
              Current Price
            </p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">
              {formatCurrency(stock.price)}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Market Cap"
          value={formatCrCurrency(stock.marketCap)}
        />
        <MetricCard
          label="52 Week High"
          value={formatCurrency(stock.high52Week)}
        />
        <MetricCard
          label="52 Week Low"
          value={formatCurrency(stock.low52Week)}
        />
        <MetricCard
          label="Dividend Yield"
          value={formatPercent(stock.dividendYield)}
        />
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          label="Revenue Growth"
          value={formatPercent(stock.revenueGrowth)}
        />
        <MetricCard
          label="Profit Growth"
          value={formatPercent(stock.profitGrowth)}
        />
        <MetricCard label="EPS Growth" value={formatPercent(stock.epsGrowth)} />
        <MetricCard label="ROE" value={formatPercent(stock.roe)} />
        <MetricCard label="ROCE" value={formatPercent(stock.roce)} />
        <MetricCard
          label="Debt / Equity"
          value={stock.debtToEquity.toFixed(2)}
        />
        <MetricCard
          label="Operating Margin"
          value={formatPercent(stock.operatingMargin)}
        />
        <MetricCard
          label="Free Cash Flow"
          value={formatCrCurrency(stock.freeCashFlow)}
        />
        <MetricCard label="P/E" value={stock.pe.toString()} />
        <MetricCard label="P/B" value={stock.pb.toString()} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <ValuationCard valuation={stock.valuation} fairPE={stock.fairPE} />
        <ScoreCard score={stock.score} />
      </section>
    </PageShell>
  );
}
