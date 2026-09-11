"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

import { cn } from "@/lib/cn";

export const THEME_STORAGE_KEY = "gt-theme";

type Theme = "light" | "dark";

/**
 * The `data-theme` attribute on `<html>` is the source of truth, and it is set
 * by the blocking script in the root layout before first paint. That makes it an
 * external store rather than React state, so it is read with
 * `useSyncExternalStore` — no mount effect, no second render pass, and no
 * hydration mismatch, because the server snapshot is always "light".
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function getServerSnapshot(): Theme {
  return "light";
}

export function ThemeToggle({ className, tone = "ink" }: { className?: string; tone?: "ink" | "on-band" }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private browsing or blocked storage — the theme still applies for this
      // session, it simply will not be remembered.
    }
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      aria-pressed={isDark}
      className={cn(
        "relative grid h-11 w-11 place-items-center rounded-full border transition-colors duration-300",
        tone === "ink"
          ? "border-hairline text-ink hover:border-brand hover:text-brand"
          : "border-white/25 text-on-band hover:border-white/60",
        className,
      )}
    >
      <span className="relative block h-[18px] w-[18px]">
        <AnimatePresence initial={false} mode="wait">
          <m.span
            key={isDark ? "moon" : "sun"}
            initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 grid place-items-center"
          >
            {isDark ? <Moon className="h-[18px] w-[18px]" strokeWidth={1.7} /> : <Sun className="h-[18px] w-[18px]" strokeWidth={1.7} />}
          </m.span>
        </AnimatePresence>
      </span>
    </button>
  );
}
