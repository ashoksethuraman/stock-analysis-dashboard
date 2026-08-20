import type { ReactNode } from "react";

interface SurfaceProps {
  children: ReactNode;
  className?: string;
}

export function Surface({ children, className = "" }: SurfaceProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] ${className}`.trim()}
    >
      {children}
    </div>
  );
}
