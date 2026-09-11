"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { primaryNav } from "@/data/navigation";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";

const SCROLL_THRESHOLD = 24;

/**
 * Sticky header. Over the top of the hero it sits on the bare canvas with no
 * border; past the threshold it settles onto a translucent surface with a
 * hairline and a slightly reduced height.
 *
 * Only `background-color`, `border-color` and `height` transition, and the
 * scrolled state re-renders once per threshold crossing, never per scroll frame.
 */
export function Header() {
  const scrolled = useScrollThreshold(SCROLL_THRESHOLD);
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ease-[var(--ease-soft)]",
        scrolled
          ? "border-hairline-soft bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          "container-page flex items-center justify-between gap-6 transition-[height] duration-300 ease-[var(--ease-soft)]",
          scrolled ? "h-[68px]" : "h-[76px]",
        )}
      >
        <Logo />

        {/* Full navigation from the tablet breakpoint up, per the design
            system's collapsing strategy. The CTA holds back until desktop,
            where there is room for it beside six nav items. */}
        <nav aria-label="Primary" className="hidden sm:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group/nav relative inline-flex h-11 items-center px-2.5 font-body text-[0.875rem] font-semibold transition-colors duration-200 lg:px-3.5 lg:text-[0.9375rem]",
                      active ? "text-brand" : "text-ink/85 hover:text-brand",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-2.5 bottom-2 h-0.5 origin-left rounded-full bg-brand transition-transform duration-300 ease-[var(--ease-organic)] lg:inset-x-3.5",
                        active ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          {/* `max-lg:hidden` rather than `hidden lg:inline-flex`: Button's base
              class already sets `inline-flex`, and between two unconditional
              display utilities Tailwind's sort order lets `inline-flex` win. A
              variant is emitted later in the sheet, so it reliably wins. */}
          <Button href={routes.contact} className="max-lg:hidden">
            Get in Touch
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
