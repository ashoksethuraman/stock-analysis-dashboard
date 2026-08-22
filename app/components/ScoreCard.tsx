import type { ScoreBreakdown } from "@/lib/valuation";

interface ScoreCardProps {
  score: ScoreBreakdown;
}

export function ScoreCard({ score }: ScoreCardProps) {
  const items = [
    ["Growth", `${score.growth}/20`],
    ["Profitability", `${score.profitability}/20`],
    ["Debt", `${score.debt}/10`],
    ["Cash Flow", `${score.cashFlow}/15`],
    ["Valuation", `${score.valuation}/15`],
    ["Business Quality", `${score.businessQuality}/20`],
  ] as const;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition duration-200 hover:-translate-y-0.5">
      <div className="flex items-center justify-between gap-4 border-l-4 border-emerald-500 pl-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Score
          </p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950">
            Quality and valuation rating
          </h2>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold text-slate-950">
            {score.total}/100
          </p>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            {score.status}
          </p>
        </div>
      </div>
      <dl className="mt-6 space-y-3">
        {items.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
          >
            <dt className="text-sm text-slate-600">{label}</dt>
            <dd className="text-sm font-semibold text-slate-950">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
