"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { allHomeVariants } from "@/config/variants";
import { cn } from "@/lib/cn";

/**
 * A review aid, not site furniture.
 *
 * It is mounted on the five variant routes so the directions can be compared
 * without retyping URLs, and deliberately not on the live Home page, which
 * stays exactly as it was. "Home" is the live page; 01 to 05 are the variants,
 * matching their URLs. Deleting the one line that mounts it in each variant
 * page removes it completely.
 *
 * Sits bottom left on a phone, clear of the floating WhatsApp and
 * scroll-to-top controls on the right, and bottom centre from 1128px, where it
 * also clears the framework's development badge in the bottom-left corner.
 */
export function ConceptSwitcher() {
  const pathname = usePathname();
  const current = allHomeVariants.find((variant) => variant.href === pathname);

  return (
    <nav
      aria-label="Home design variants"
      className="fixed bottom-4 left-4 z-40 print:hidden lg:bottom-6 lg:left-1/2 lg:-translate-x-1/2"
    >
      <div className="flex items-center gap-1 rounded-full border border-hairline bg-[color-mix(in_srgb,var(--surface)_92%,transparent)] p-1.5 shadow-float backdrop-blur-md">
        <ul className="flex items-center gap-1">
          {allHomeVariants.map((variant) => {
            const active = variant.href === pathname;
            const isHome = variant.chip === "Home";

            return (
              <li key={variant.href}>
                <Link
                  href={variant.href}
                  aria-current={active ? "page" : undefined}
                  title={variant.name}
                  className={cn(
                    "grid h-9 min-w-9 place-items-center rounded-full px-2 font-body text-[0.8125rem] font-semibold transition-colors duration-200",
                    isHome && "px-3",
                    active
                      ? "bg-brand text-on-brand"
                      : "text-muted hover:bg-surface-soft hover:text-brand",
                  )}
                >
                  {variant.chip}
                  <span className="sr-only">{` ${variant.name}`}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {current ? (
          <span className="hidden pl-2 pr-3 font-body text-caption-sm text-ink md:block">
            {current.name}
          </span>
        ) : null}
      </div>
    </nav>
  );
}
