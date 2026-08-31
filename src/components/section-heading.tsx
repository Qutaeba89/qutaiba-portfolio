import type { ReactNode } from "react";

export function SectionHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span
        aria-hidden="true"
        className="h-px w-8 shrink-0 bg-linear-to-r from-accent to-accent-2"
      />
      <h2 className="text-2xl font-semibold tracking-tight text-balance md:text-3xl">
        {children}
      </h2>
    </div>
  );
}
