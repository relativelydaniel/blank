import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padded?: boolean;
  interactive?: boolean;
}

export function Card({
  children,
  padded = true,
  interactive = false,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-panel border border-border bg-surface text-ink shadow-sm",
        padded && "p-5 sm:p-6",
        interactive &&
          "transition duration-200 hover:-translate-y-0.5 hover:shadow-md",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
