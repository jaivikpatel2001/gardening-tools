"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { primaryNav } from "@/data/navigation";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";
import { visibleLinks } from "@/lib/visibility";
import type { ProductMenuLink } from "@/types/content";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Right-side navigation sheet for viewports below the desktop breakpoint.
 *
 * Handles the three things a dialog has to get right: focus moves into the
 * sheet on open and back to the trigger on close, Tab is trapped inside it, and
 * Escape closes it. Background scroll is locked while it is open.
 *
 * Products expands in place rather than reusing the desktop dropdown. A hover
 * menu is the wrong shape on a touch screen, and the sheet is already the
 * navigation surface, so the client's second level is simply indented another
 * step rather than flying out. `productMenu` arrives from the header, which
 * got it from the server, so the catalogue never reaches the browser.
 */
export function MobileMenu({
  tone = "ink",
  productMenu,
}: {
  tone?: "ink" | "on-band";
  productMenu: readonly ProductMenuLink[];
}) {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();
  const navItems = visibleLinks(primaryNav);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Close on navigation — including back/forward — by adjusting state during
  // render rather than in an effect, which avoids the extra commit that a
  // route-change effect would cause.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setProductsOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const panel = panelRef.current;
    // Captured now: by cleanup time the ref may have moved on.
    const trigger = triggerRef.current;
    panel?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab" || !panel) return;

      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={open}
        className={cn(
          "grid h-11 w-11 place-items-center rounded-full border transition-colors duration-300 sm:hidden",
          tone === "ink"
            ? "border-hairline text-ink hover:border-brand hover:text-brand"
            : "border-white/25 text-on-band hover:border-white/60",
        )}
      >
        <Menu className="h-[19px] w-[19px]" strokeWidth={1.7} />
      </button>

      <AnimatePresence>
        {open ? (
          <m.div
            key="mobile-menu"
            className="fixed inset-0 z-[60] sm:hidden"
            initial="closed"
            animate="open"
            exit="closed"
          >
            <m.button
              type="button"
              aria-label="Close navigation menu"
              onClick={close}
              className="absolute inset-0 h-full w-full cursor-default bg-[var(--scrim)] backdrop-blur-[2px]"
              variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
              transition={{ duration: 0.25, ease: EASE }}
            />

            <m.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className="absolute inset-y-0 right-0 flex w-[min(22rem,88vw)] flex-col bg-surface shadow-float"
              variants={{ open: { x: "0%" }, closed: { x: "100%" } }}
              transition={{ type: "spring", stiffness: 320, damping: 34, mass: 0.9 }}
            >
              <div className="flex items-center justify-between border-b border-hairline-soft px-5 py-4">
                <span className="text-eyebrow uppercase text-muted">Menu</span>
                <button
                  type="button"
                  data-autofocus
                  onClick={close}
                  aria-label="Close navigation menu"
                  className="grid h-11 w-11 place-items-center rounded-full border border-hairline text-ink transition-colors duration-300 hover:border-brand hover:text-brand"
                >
                  <X className="h-[19px] w-[19px]" strokeWidth={1.7} />
                </button>
              </div>

              <nav aria-label="Primary" className="flex-1 overflow-y-auto px-5 py-6">
                <ul className="flex flex-col">
                  {navItems.map((item) => {
                    const active = pathname === item.href;

                    // Products expands a nested list in place. Tapping the row
                    // never navigates; "All Products" inside it does.
                    if (item.href === routes.products) {
                      const inProducts = pathname.startsWith(routes.products);
                      return (
                        <li key={item.href}>
                          <button
                            type="button"
                            aria-expanded={productsOpen}
                            aria-controls="mobile-products"
                            aria-current={inProducts ? "page" : undefined}
                            onClick={() => setProductsOpen((value) => !value)}
                            className={cn(
                              "flex min-h-12 w-full items-center justify-between gap-3 border-b border-hairline-soft font-body text-[1.0625rem] font-semibold transition-colors duration-200",
                              inProducts ? "text-brand" : "text-ink hover:text-brand",
                            )}
                          >
                            {item.label}
                            <ChevronDown
                              aria-hidden="true"
                              className={cn(
                                "h-4 w-4 shrink-0 transition-transform duration-300 ease-[var(--ease-organic)]",
                                productsOpen && "rotate-180",
                              )}
                              strokeWidth={2}
                            />
                          </button>

                          <AnimatePresence initial={false}>
                            {productsOpen ? (
                              <m.div
                                id="mobile-products"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.24, ease: EASE }}
                                className="overflow-hidden"
                              >
                                <ul className="flex flex-col border-b border-hairline-soft py-1 pl-4">
                                  <li>
                                    <Link
                                      href={routes.products}
                                      className="flex min-h-11 items-center font-body text-[0.9375rem] font-semibold text-ink transition-colors duration-200 hover:text-brand"
                                    >
                                      All Products
                                    </Link>
                                  </li>
                                  {productMenu.map((product) => (
                                    <li key={product.label}>
                                      <Link
                                        href={product.href}
                                        className="flex min-h-11 items-center font-body text-[0.9375rem] text-body transition-colors duration-200 hover:text-brand"
                                      >
                                        {product.label}
                                      </Link>
                                      {product.children ? (
                                        <ul className="flex flex-col pl-4">
                                          {product.children.map((child) => (
                                            <li key={child.label}>
                                              <Link
                                                href={child.href}
                                                className="flex min-h-10 items-center font-body text-[0.875rem] text-muted transition-colors duration-200 hover:text-brand"
                                              >
                                                {child.label}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      ) : null}
                                    </li>
                                  ))}
                                </ul>
                              </m.div>
                            ) : null}
                          </AnimatePresence>
                        </li>
                      );
                    }

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex min-h-12 items-center border-b border-hairline-soft font-body text-[1.0625rem] font-semibold transition-colors duration-200",
                            active ? "text-brand" : "text-ink hover:text-brand",
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="border-t border-hairline-soft px-5 py-5">
                <Button href={routes.contact} size="lg" className="w-full">
                  Get in Touch
                </Button>
                <a
                  href={site.contact.phoneHref}
                  className="mt-4 flex items-center justify-center gap-2 text-body-sm text-muted transition-colors duration-200 hover:text-brand"
                >
                  <Phone className="h-4 w-4" strokeWidth={1.7} />
                  {site.contact.phone}
                </a>
              </div>
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
