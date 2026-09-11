import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Small uppercase section label. The short rule to its left is the one
 * botanical flourish these get — no icons, no pills, no badges.
 */
export function Eyebrow({
  children,
  className,
  tone = "brand",
}: {
  children: ReactNode;
  className?: string;
  tone?: "brand" | "on-band";
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2.5 text-eyebrow uppercase",
        tone === "brand" ? "text-brand-soft" : "text-on-band-muted",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-px w-6 shrink-0",
          tone === "brand" ? "bg-brand-soft/60" : "bg-on-band-muted/50",
        )}
      />
      {children}
    </p>
  );
}
