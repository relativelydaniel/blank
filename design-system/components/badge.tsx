import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../src/design-system/utils";

export type BadgeTone = "neutral" | "accent" | "success" | "warning" | "danger";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  tone?: BadgeTone;
}

const tones: Record<BadgeTone, string> = {
  neutral: "border-border bg-white text-muted",
  accent: "border-orange-200 bg-orange-50 text-orange-800",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  danger: "border-red-200 bg-red-50 text-red-800",
};

export function Badge({ children, tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium", tones[tone], className)} {...props}>
      {children}
    </span>
  );
}
