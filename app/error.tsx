"use client";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-start justify-center gap-5 px-5 py-12 sm:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
        Application error
      </p>
      <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
        Unable to load stock data
      </h1>
      <p className="text-sm leading-6 text-slate-600">
        {error.message ||
          "An unexpected error occurred while rendering the page."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full border border-slate-200 bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
      >
        Retry request
      </button>
    </main>
  );
}
