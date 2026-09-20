"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ProductsMenu } from "@/components/layout/ProductsMenu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { headerSchemeFor } from "@/config/variants";
import { primaryNav } from "@/data/navigation";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";
import { visibleLinks } from "@/lib/visibility";
import type { ProductMenuLink } from "@/types/content";

const SCROLL_THRESHOLD = 24;

/**
 * Sticky header. Over the top of the hero it sits on the bare canvas with no
 * border; past the threshold it settles onto a translucent surface with a
 * hairline and a slightly reduced height.
 *
 * A page whose hero is a full-bleed photograph or a dark stage registers an
 * `on-band` scheme in `config/variants.ts`, and the header then paints white
 * over that hero and reverts to ink the moment it lands on a surface. Nothing
 * else about the header changes between pages: same navigation, same order,
 * same actions.
 *
 * Only `background-color`, `border-color` and `height` transition, and the
 * scrolled state re-renders once per threshold crossing, never per scroll frame.
 *
 * `productMenu` is resolved from the catalogue in the root layout, on the
 * server, and passed in. The header and the mobile sheet are client components,
 * so neither may import `lib/catalogue.ts`; handing them plain labels and
 * hrefs is what keeps the range out of the browser bundle. One header serves
 * every page and every Home variant, so the Products menu is defined once here
 * and nowhere else.
 */
export function Header({ productMenu }: { productMenu: readonly ProductMenuLink[] }) {
  const scrolled = useScrollThreshold(SCROLL_THRESHOLD);
  const pathname = usePathname();
  // Unreleased pages never reach the menu. The flags are inlined at build time,
  // so a withdrawn page is absent from the markup rather than hidden by CSS.
  const navItems = visibleLinks(primaryNav);
  // Product pages share one visibility flag, so filtering the top level is
  // enough: if Products is withdrawn the whole menu goes with it.
  const productItems = visibleLinks(productMenu) as ProductMenuLink[];

  // The white treatment only applies while the header is still over the hero.
  // Once it has a surface behind it, ink is the readable choice on every page.
  const overHero = !scrolled && headerSchemeFor(pathname) === "on-band";

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
        <Logo tone={overHero ? "on-band" : "ink"} />

        {/* Full navigation from the tablet breakpoint up, per the design
            system's collapsing strategy. The CTA holds back until desktop,
            where there is room for it beside six nav items. */}
        <nav aria-label="Primary" className="hidden sm:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;

              // Products opens a menu instead of navigating. "All Products"
              // inside it is what goes to the listing page.
              if (item.href === routes.products) {
                return (
                  <li key={item.href}>
                    <ProductsMenu
                      label={item.label}
                      allLabel="All Products"
                      allHref={routes.products}
                      items={productItems}
                      active={pathname.startsWith(routes.products)}
                      overHero={overHero}
                    />
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group/nav relative inline-flex h-11 items-center px-2.5 font-body text-[0.875rem] font-semibold transition-colors duration-200 lg:px-3.5 lg:text-[0.9375rem]",
                      overHero
                        ? "text-on-band/85 hover:text-on-band"
                        : active
                          ? "text-brand"
                          : "text-ink/85 hover:text-brand",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-2.5 bottom-2 h-0.5 origin-left rounded-full transition-transform duration-300 ease-[var(--ease-organic)] lg:inset-x-3.5",
                        overHero ? "bg-on-band" : "bg-brand",
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
          <ThemeToggle tone={overHero ? "on-band" : "ink"} />
          {/* `max-lg:hidden` rather than `hidden lg:inline-flex`: Button's base
              class already sets `inline-flex`, and between two unconditional
              display utilities Tailwind's sort order lets `inline-flex` win. A
              variant is emitted later in the sheet, so it reliably wins. */}
          <Button
            href={routes.contact}
            variant={overHero ? "on-band" : "primary"}
            className="max-lg:hidden"
          >
            Get in Touch
          </Button>
          <MobileMenu tone={overHero ? "on-band" : "ink"} productMenu={productItems} />
        </div>
      </div>
    </header>
  );
}
