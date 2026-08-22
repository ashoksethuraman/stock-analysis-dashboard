import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";

interface StockSearchBarProps {
  currentQuery: string;
}

export function StockSearchBar({ currentQuery }: StockSearchBarProps) {
  return (
    <form
      action="/"
      method="get"
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
            Market snapshot
          </p>
          <h2 className="text-xl font-semibold text-slate-950 sm:text-2xl">
            Search and compare listed companies
          </h2>
          <p className="text-sm leading-6 text-slate-600">
            Filter the server-rendered table without turning the dashboard into
            a client-heavy experience.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 lg:max-w-md lg:flex-row lg:items-end">
          <div className="flex-1">
            <Input
              label="Filter stocks"
              name="q"
              defaultValue={currentQuery}
              placeholder="Search company, symbol, or sector"
              autoComplete="off"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button type="submit" variant="primary">
              Search
            </Button>
            <Button href="/" variant="ghost">
              Reset
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
