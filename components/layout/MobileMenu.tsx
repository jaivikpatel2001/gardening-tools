"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { primaryNav } from "@/data/navigation";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Right-side navigation sheet for viewports below the desktop breakpoint.
 *
 * Handles the three things a dialog has to get right: focus moves into the
 * sheet on open and back to the trigger on close, Tab is trapped inside it, and
 * Escape closes it. Background scroll is locked while it is open.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
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
        className="grid h-11 w-11 place-items-center rounded-full border border-hairline text-ink transition-colors duration-300 hover:border-brand hover:text-brand sm:hidden"
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
                  {primaryNav.map((item) => {
                    const active = pathname === item.href;
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
                <Button href="/contact" size="lg" className="w-full">
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
