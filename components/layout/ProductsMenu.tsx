"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/cn";
import { MEDIA } from "@/lib/media";
import type { ProductMenuLink } from "@/types/content";

/**
 * The Products dropdown in the desktop header.
 *
 * One seamless column with no inner scrollbar, and a flyout on the two entries
 * the client's own menu nests. That is deliberate: an internally scrolling
 * panel had two problems, a scrollbar running down a premium menu, and Lenis
 * swallowing the wheel so the page moved behind the panel instead of the list
 * moving inside it.
 *
 * The panel is as tall as its contents and **scrolls with the page**, which is
 * how the client's own menu behaves and what makes a long list reachable: a
 * menu longer than the viewport is simply scrolled to. That is why it is
 * portalled to the body and positioned in document coordinates rather than
 * hung off the header, which is fixed and would have pinned it to the viewport.
 *
 * A disclosure, not a `role="menu"`. These are ordinary navigation links, and
 * the menu role would promise application-menu semantics the browser does not
 * give links: it hides them from the document, takes Tab away and makes arrow
 * keys the only way through. A button with `aria-expanded` over a plain list
 * keeps every link a link, and the arrow keys are added on top as a convenience
 * rather than as the only route.
 *
 * `items` is resolved on the server and passed down. This file is a client
 * component, so it must never reach for `lib/catalogue.ts` or the catalogue
 * data itself: that would ship the whole range to the browser.
 */
export function ProductsMenu({
  label,
  allLabel,
  allHref,
  items,
  active,
  overHero,
}: {
  label: string;
  allLabel: string;
  allHref: string;
  items: readonly ProductMenuLink[];
  /** True when the current page is Products or one of its categories. */
  active: boolean;
  /** The header is still transparent over a dark hero. */
  overHero: boolean;
}) {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  /** Label of the entry whose flyout is showing, if any. */
  const [flyout, setFlyout] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef(0);
  /** Document coordinates for the portalled panel, measured off the trigger. */
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  // Set while the panel is open because the pointer is over it and nothing has
  // been clicked yet. Without it, hovering opens the panel and the click that
  // follows toggles it straight back shut, which reads as a menu refusing to
  // open.
  const openedByHover = useRef(false);
  // Which item to focus once the panel has mounted: 0 for the first, -1 for the
  // last, null when the panel was opened by pointer and focus should stay put.
  const focusOnOpen = useRef<number | null>(null);

  // Hover opens the menu only where hovering is real. On a touch screen the
  // first tap would otherwise both open and immediately dismiss it.
  const canHover = useMediaQuery(MEDIA.finePointer);

  /**
   * Measures the trigger in document space, so the panel lands under it and
   * then travels with the page rather than with the viewport. Called before
   * the open, so there is never a frame in the wrong place.
   */
  const measure = useCallback(() => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition({ top: rect.bottom + window.scrollY + 4, left: rect.left + window.scrollX });
  }, []);

  const close = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    openedByHover.current = false;
    setOpen(false);
    setFlyout(null);
  }, []);

  /** Closes and puts focus back where the visitor left it. */
  const closeToTrigger = useCallback(() => {
    close();
    triggerRef.current?.focus();
  }, [close]);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      // The panel is portalled, so it is not inside the wrapper any more and
      // has to be checked separately or clicking it would dismiss it.
      if (wrapperRef.current?.contains(target) || panelRef.current?.contains(target)) return;
      close();
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeToTrigger();
      }
    }

    // Capture, so a click on anything at all closes the panel before that
    // element handles it.
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown);
    // Scrolling deliberately does not close it: the list is meant to be
    // scrolled to. A resize invalidates the measurement, so that one does.
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", close);
    };
  }, [open, close, closeToTrigger]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  // Keyboard opens move focus into the panel. This runs after the commit that
  // mounted it, which is why it is an effect rather than a frame callback: a
  // throttled or skipped animation frame would drop the focus move entirely.
  useEffect(() => {
    if (!open || focusOnOpen.current === null) return;
    const target = focusOnOpen.current;
    focusOnOpen.current = null;
    const links = panelRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]");
    if (!links || links.length === 0) return;
    links[(target + links.length) % links.length].focus();
  }, [open]);

  function focusItem(index: number) {
    const links = panelRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]");
    if (!links || links.length === 0) return;
    links[(index + links.length) % links.length].focus();
  }

  function onTriggerKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const target = event.key === "ArrowDown" ? 0 : -1;
    if (open) {
      focusItem(target);
      return;
    }
    focusOnOpen.current = target;
    openedByHover.current = false;
    measure();
    setOpen(true);
  }

  function onPanelKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const links = Array.from(panelRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? []);
    const index = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (index < 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusItem(index + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      focusItem(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusItem(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusItem(-1);
    }
  }

  const rowClass =
    "flex min-h-8 items-center rounded-sm px-3 font-body text-[0.8125rem] text-body transition-colors duration-200 hover:bg-surface-soft hover:text-brand";

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onPointerEnter={() => {
        if (!canHover) return;
        window.clearTimeout(closeTimer.current);
        openedByHover.current = !open;
        measure();
        setOpen(true);
      }}
      onPointerLeave={() => {
        if (!canHover) return;
        // A short grace period, so a diagonal move from the trigger to the
        // panel does not clip the corner and dismiss it.
        closeTimer.current = window.setTimeout(() => {
          openedByHover.current = false;
          setOpen(false);
          setFlyout(null);
        }, 140);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-current={active ? "page" : undefined}
        onClick={() => {
          if (open && openedByHover.current) {
            // Hover opened it a moment ago. Keep it open and let the next
            // click be the one that closes it.
            openedByHover.current = false;
            return;
          }
          openedByHover.current = false;
          if (!open) measure();
          setOpen((value) => !value);
        }}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          "group/nav relative inline-flex h-11 items-center gap-1 px-2.5 font-body text-[0.875rem] font-semibold transition-colors duration-200 lg:px-3.5 lg:text-[0.9375rem]",
          overHero
            ? "text-on-band/85 hover:text-on-band"
            : active
              ? "text-brand"
              : "text-ink/85 hover:text-brand",
        )}
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-300 ease-[var(--ease-organic)]",
            open && "rotate-180",
          )}
          strokeWidth={2}
        />
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-x-2.5 bottom-2 h-0.5 origin-left rounded-full transition-transform duration-300 ease-[var(--ease-organic)] lg:inset-x-3.5",
            overHero ? "bg-on-band" : "bg-brand",
            active || open ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100",
          )}
        />
      </button>

      {/* Portalled to the body so the panel escapes the fixed header and can be
          placed in document space. Guarded, because `document` does not exist
          while this renders on the server; closed, it produces no DOM either
          way, so the hydrated markup matches. */}
      {typeof document !== "undefined" &&
        createPortal(
        <AnimatePresence>
          {open && position ? (
          <m.div
            id={panelId}
            ref={panelRef}
            onKeyDown={onPanelKeyDown}
            onPointerEnter={() => window.clearTimeout(closeTimer.current)}
            onPointerLeave={() => {
              if (!canHover) return;
              closeTimer.current = window.setTimeout(close, 140);
            }}
            style={{ top: position.top, left: position.left }}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            // Absolutely positioned in document space, so opening it never
            // moves the page and scrolling carries it along with the content.
            // No max height and no overflow: the panel is exactly as tall as
            // its contents, which is what makes it seamless and what stops
            // Lenis and an inner scroll container fighting over the wheel.
            className="absolute z-[60] w-56 rounded-lg border border-hairline-soft bg-surface p-1.5 shadow-float"
          >
            <ul className="flex flex-col">
              <li>
                <Link
                  href={allHref}
                  onClick={close}
                  className="flex min-h-9 items-center rounded-sm px-3 font-body text-[0.875rem] font-semibold text-ink transition-colors duration-200 hover:bg-surface-soft hover:text-brand"
                >
                  {allLabel}
                </Link>
              </li>

              <li aria-hidden="true" className="my-1.5 h-px bg-hairline-soft" />

              {items.map((item) => {
                const showFlyout = flyout === item.label;

                return (
                  <li
                    key={item.label}
                    className="relative"
                    onPointerEnter={() => {
                      if (canHover) setFlyout(item.children ? item.label : null);
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={close}
                      onFocus={() => setFlyout(item.children ? item.label : null)}
                      className={cn(rowClass, item.children && "justify-between gap-2")}
                    >
                      {item.label}
                      {item.children ? (
                        <ChevronRight
                          aria-hidden="true"
                          className="h-3.5 w-3.5 shrink-0"
                          strokeWidth={2}
                        />
                      ) : null}
                    </Link>

                    {/* The client's second level, opening to the right exactly
                        as theirs does. It is an enhancement, never the only
                        route: the parent row is already a link to the same
                        range, so nothing here is reachable by hover alone. */}
                    {item.children && showFlyout ? (
                      <ul className="absolute left-full top-0 ml-1.5 w-52 rounded-lg border border-hairline-soft bg-surface p-1.5 shadow-float">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link href={child.href} onClick={close} className={rowClass}>
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </m.div>
          ) : null}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
}
