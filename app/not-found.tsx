import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-start justify-center gap-5 px-5 py-12 sm:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
        404
      </p>
      <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
        Stock not found
      </h1>
      <p className="text-sm leading-6 text-slate-600">
        The requested stock symbol does not exist in the current mock dataset.
      </p>
      <Link
        href="/"
        className="rounded-full border border-slate-200 bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
      >
        Return to dashboard
      </Link>
    </main>
  );
}
