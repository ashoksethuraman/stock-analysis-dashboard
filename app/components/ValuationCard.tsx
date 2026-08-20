import { formatCurrency, formatPercent } from "@/lib/format";
import type { ValuationSnapshot } from "@/lib/valuation";

interface ValuationCardProps {
  valuation: ValuationSnapshot;
  fairPE: number;
}

export function ValuationCard({ valuation, fairPE }: ValuationCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition duration-200 hover:-translate-y-0.5">
      <div className="flex items-center justify-between gap-4 border-l-4 border-sky-500 pl-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
            Valuation
          </p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950">
            Intrinsic value snapshot
          </h2>
        </div>
        <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700">
          Fair P/E {fairPE}
        </span>
      </div>
      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <dt className="text-xs uppercase tracking-[0.16em] text-slate-500">
            Expected EPS
          </dt>
          <dd className="mt-2 text-xl font-semibold text-slate-950">
            {formatCurrency(valuation.expectedEPS)}
          </dd>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <dt className="text-xs uppercase tracking-[0.16em] text-slate-500">
            Fair Value
          </dt>
          <dd className="mt-2 text-xl font-semibold text-slate-950">
            {formatCurrency(valuation.fairValue)}
          </dd>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <dt className="text-xs uppercase tracking-[0.16em] text-slate-500">
            Potential Upside
          </dt>
          <dd className="mt-2 text-xl font-semibold text-emerald-700">
            {formatPercent(valuation.upside)}
          </dd>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <dt className="text-xs uppercase tracking-[0.16em] text-slate-500">
            Margin of Safety
          </dt>
          <dd className="mt-2 text-xl font-semibold text-sky-700">
            {formatPercent(valuation.marginOfSafety)}
          </dd>
        </div>
      </dl>
    </section>
  );
}
