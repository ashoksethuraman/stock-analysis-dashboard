"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { PRIMARY_NAVIGATION } from "@/constants/navigation";

export function AppHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-5 py-3 sm:px-8 lg:px-10">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 text-xs font-bold text-white"
              aria-hidden="true"
            >
              SA
            </span>
            <span className="text-[13px] font-semibold uppercase tracking-[0.2em] text-slate-900">
              Stock Analysis
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {PRIMARY_NAVIGATION.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition duration-150 ${
                    isActive
                      ? "bg-slate-100 text-slate-950"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="relative"
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                setIsMenuOpen(false);
              }
            }}
          >
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-haspopup="menu"
              aria-expanded={isMenuOpen}
              className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3 shadow-sm transition duration-150 hover:border-slate-300 hover:bg-slate-50"
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-[11px] font-semibold uppercase tracking-[0.1em] text-white"
                aria-hidden="true"
              >
                GU
              </span>
              <span className="hidden text-left leading-tight sm:block">
                <span className="block text-sm font-medium text-slate-900">
                  Guest user
                </span>
                <span className="block text-xs text-slate-500">
                  Demo session
                </span>
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`h-4 w-4 text-slate-500 transition-transform duration-150 ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isMenuOpen ? (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-slate-200 bg-white p-3 shadow-[0_16px_40px_rgba(15,23,42,0.12)]"
              >
                <div className="rounded-lg bg-slate-50 px-3 py-2.5">
                  <p className="text-sm font-medium text-slate-900">
                    Guest user
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    You are browsing this dashboard without an account.
                  </p>
                </div>
                <Link
                  href="/login"
                  role="menuitem"
                  className="mt-2 flex items-center justify-center rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-800 shadow-sm transition duration-150 hover:border-slate-400 hover:bg-slate-50"
                >
                  Log in
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <nav className="flex items-center gap-1 overflow-x-auto border-t border-slate-100 px-5 py-2 md:hidden">
        {PRIMARY_NAVIGATION.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition duration-150 ${
                isActive
                  ? "bg-slate-100 text-slate-950"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
