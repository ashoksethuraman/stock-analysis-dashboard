import type { Metadata } from "next";

import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { PageShell } from "@/app/components/ui/PageShell";
import { Surface } from "@/app/components/ui/Surface";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Demo login screen for the stock analysis dashboard. Authentication flow is intentionally disabled.",
};

export default function LoginPage() {
  return (
    <PageShell className="gap-10 py-12">
      <Surface className="grid gap-8 p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-10 animate-fade-up">
        <section className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
            Guest access
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Login is disabled in this demo
          </h1>
          <p className="max-w-xl text-sm leading-6 text-slate-600">
            This page shows the intended sign-in experience, but the application
            remains a guest-only SSR dashboard. No authentication provider or
            session flow is wired.
          </p>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Current role</p>
            <p className="mt-1">Guest user</p>
            <p className="mt-4 text-xs uppercase tracking-[0.22em] text-slate-500">
              Demo mode only
            </p>
          </div>

          <Button href="/" variant="ghost">
            Return to dashboard
          </Button>
        </section>

        <section>
          <form className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900">
                Sign in
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Enter credentials below, but the submit action is disabled on
                purpose.
              </p>
            </div>

            <Input label="Email" type="email" placeholder="guest@company.com" />
            <Input label="Password" type="password" placeholder="••••••••" />

            <div className="flex items-center justify-between gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              <span>Authentication flow disabled</span>
              <span className="font-semibold uppercase tracking-[0.2em] text-amber-700">
                Read-only
              </span>
            </div>

            <Button type="submit" disabled className="w-full" variant="primary">
              Sign in disabled
            </Button>
          </form>
        </section>
      </Surface>
    </PageShell>
  );
}
