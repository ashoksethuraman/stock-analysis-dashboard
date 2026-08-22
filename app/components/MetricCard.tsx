interface MetricCardProps {
  label: string;
  value: string;
}

export function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_6px_16px_rgba(15,23,42,0.04)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(15,23,42,0.07)]">
      <dt className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
        {label}
      </dt>
      <dd className="mt-2 text-xl font-semibold text-slate-950">{value}</dd>
    </div>
  );
}
