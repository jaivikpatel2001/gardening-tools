import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * The tertiary text action used throughout the page — "View Products",
 * "View Range", "See Our Clients". The arrow travels 4px on hover, exactly
 * as the design system specifies, and the underline is drawn with a scaling
 * pseudo-element so nothing lays out on hover.
 */
export function ArrowLink({
  href,
  children,
  className,
  tone = "brand",
  /**
   * Set when the whole surrounding card is already a link — the arrow then
   * renders as decorative text rather than a nested anchor.
   */
  asText = false,
}: {
  href?: string;
  children: ReactNode;
  className?: string;
  tone?: "brand" | "on-band" | "ink";
  asText?: boolean;
}) {
  const classes = cn(
    "group/arrow inline-flex items-center gap-1.5 text-[0.875rem] font-semibold font-body",
    "transition-colors duration-200",
    tone === "brand" && "text-brand hover:text-brand-hover",
    tone === "on-band" && "text-on-band hover:text-white",
    tone === "ink" && "text-ink hover:text-brand",
    className,
  );

  const content = (
    <>
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-[var(--ease-organic)] group-hover/arrow:scale-x-100"
        />
      </span>
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5 shrink-0 translate-x-0 transition-transform duration-300 ease-[var(--ease-organic)] group-hover/arrow:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
      </svg>
    </>
  );

  if (asText || !href) {
    return <span className={classes}>{content}</span>;
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
