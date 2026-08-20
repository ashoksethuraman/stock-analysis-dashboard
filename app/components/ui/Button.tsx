import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface SharedButtonProps {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
}

interface LinkButtonProps
  extends
    SharedButtonProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> {
  href: string;
}

interface NativeButtonProps
  extends
    SharedButtonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> {
  href?: never;
}

type ButtonProps = LinkButtonProps | NativeButtonProps;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-sky-600 bg-sky-600 text-white shadow-[0_12px_26px_rgba(2,132,199,0.18)] hover:-translate-y-0.5 hover:border-sky-700 hover:bg-sky-700",
  secondary:
    "border-slate-200 bg-slate-100 text-slate-900 shadow-sm hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-200 hover:text-slate-950",
  ghost:
    "border-slate-200 bg-white text-slate-700 shadow-sm hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-100 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60";

export function Button({
  children,
  className = "",
  variant = "primary",
  href,
  ...props
}: ButtonProps) {
  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`.trim();

  if (href) {
    const linkProps = props as Omit<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      "children" | "className"
    >;

    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "className"
  >;

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
