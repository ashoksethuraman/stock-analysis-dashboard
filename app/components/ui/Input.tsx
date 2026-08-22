import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ className = "", label, ...props }: InputProps) {
  return (
    <label className="block w-full">
      {label ? (
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          {label}
        </span>
      ) : null}
      <input
        className={`w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm transition duration-200 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100 ${className}`.trim()}
        {...props}
      />
    </label>
  );
}
