import type { HTMLAttributes, ReactNode } from "react";

export function Badge({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { children?: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted transition-colors ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
