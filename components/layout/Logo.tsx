import Link from "next/link";

import { BRAND_MARK } from "@/config/brand";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";

/**
 * Wordmark plus the sprout mark. The mark's geometry comes from
 * `config/brand.ts`, the same source the favicon and app icons are generated
 * from, so the header logo and the browser tab can never disagree.
 *
 * Drawn inline rather than loaded as an asset, so it inherits `currentColor`
 * and needs no dark-theme variant.
 */
export function Logo({ className, tone = "ink" }: { className?: string; tone?: "ink" | "on-band" }) {
  return (
    <Link
      href={routes.home}
      aria-label="GreenTools home"
      className={cn(
        "group/logo inline-flex items-center gap-2.5 font-heading text-[1.0625rem] font-extrabold tracking-[-0.02em]",
        tone === "ink" ? "text-ink" : "text-on-band",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-[10px] transition-colors duration-300",
          tone === "ink" ? "bg-brand text-on-brand" : "bg-white/12 text-on-band",
        )}
      >
        <svg
          viewBox={BRAND_MARK.viewBox}
          className="h-[18px] w-[18px]"
          fill="none"
          stroke="currentColor"
          strokeWidth={BRAND_MARK.strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={BRAND_MARK.stem} />
          {BRAND_MARK.leaves.map((leaf) => (
            <path key={leaf} d={leaf} />
          ))}
        </svg>
      </span>
      <span>
        Green<span className={tone === "ink" ? "text-brand" : "text-brand-soft"}>Tools</span>
      </span>
    </Link>
  );
}
