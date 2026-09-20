import Link from "next/link";

import { cn } from "@/lib/cn";

export interface Crumb {
  name: string;
  path: string;
}

/**
 * Interior-page breadcrumbs.
 *
 * The final crumb is the current page, so it is plain text with
 * `aria-current="page"` rather than a link to itself. The same `trail` array is
 * handed to `breadcrumbJsonLd` in `lib/seo.ts`, so the visible trail and the
 * structured data can never disagree.
 */
export function Breadcrumbs({
  trail,
  tone = "default",
  className,
}: {
  trail: readonly Crumb[];
  tone?: "default" | "on-band";
  className?: string;
}) {
  const onBand = tone === "on-band";

  return (
    <nav aria-label="Breadcrumb" className={cn("min-w-0", className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-body text-caption">
        {trail.map((crumb, index) => {
          const last = index === trail.length - 1;

          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden="true" className={onBand ? "text-on-band-muted" : "text-muted"}>
                  /
                </span>
              ) : null}

              {last ? (
                <span aria-current="page" className={onBand ? "text-on-band" : "text-ink"}>
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className={cn(
                    "transition-colors duration-200",
                    onBand ? "text-on-band-muted hover:text-on-band" : "text-muted hover:text-brand",
                  )}
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
