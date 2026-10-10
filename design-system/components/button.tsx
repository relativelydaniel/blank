import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../src/design-system/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent-orange text-white hover:bg-orange-700",
  secondary: "border border-border bg-surface text-ink hover:bg-slate-200",
  ghost: "bg-transparent text-ink hover:bg-surface",
  danger: "bg-red-700 text-white hover:bg-red-800",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-8 px-3 text-xs",
  md: "min-h-10 px-4 text-sm",
  lg: "min-h-12 px-5 text-base",
};

export function Button({ variant = "primary", size = "md", fullWidth = false, className, type = "button", children, ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-control font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant], sizes[size], fullWidth && "w-full", className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
