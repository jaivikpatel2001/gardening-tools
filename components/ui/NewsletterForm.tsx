"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Check } from "lucide-react";
import { useId, useState, type FormEvent } from "react";

import { cursorIntent } from "@/components/cursor/cursor-intent";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { cn } from "@/lib/cn";

type Status = "idle" | "success";

/**
 * Newsletter capture, used both in the standalone section and in the footer.
 *
 * There is no backend in this phase, so submission is handled locally and the
 * success state is honest about that. When a provider is wired up, only
 * `onSubmit` changes; the markup, validation and success transition stay.
 */
export function NewsletterForm({
  tone = "light",
  className,
}: {
  tone?: "light" | "on-band";
  className?: string;
}) {
  const inputId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");

  const onBand = tone === "on-band";

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setStatus("success");
    setEmail("");
  }

  return (
    <div className={cn("w-full", className)}>
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <m.p
            key="success"
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "flex min-h-12 items-center gap-2.5 text-body-sm",
              onBand ? "text-on-band" : "text-brand",
            )}
          >
            <span
              className={cn(
                "grid h-6 w-6 shrink-0 place-items-center rounded-full",
                onBand ? "bg-white/15 text-on-band" : "bg-brand text-on-brand",
              )}
            >
              <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
            </span>
            Thanks, we&rsquo;ll be in touch when the next guide lands.
          </m.p>
        ) : (
          <m.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2.5 sm:flex-row"
          >
            <div className="flex-1">
              <label htmlFor={inputId} className="sr-only">
                Email address
              </label>
              <input
                id={inputId}
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={cn(
                  "h-12 w-full rounded-sm border px-4 text-body-sm outline-none transition-[border-color,box-shadow] duration-200",
                  onBand
                    ? "border-white/25 bg-white/8 text-on-band placeholder:text-on-band-muted/70 focus:border-white/60 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.12)]"
                    : "border-hairline bg-surface text-ink placeholder:text-muted focus:border-brand-soft focus:shadow-[0_0_0_3px_var(--ring-halo)]",
                )}
              />
            </div>

            <button
              type="submit"
              {...cursorIntent("click")}
              className={cn(
                "inline-flex h-12 items-center justify-center gap-2 rounded-sm px-6 font-body text-[0.9375rem] font-semibold transition-[background-color,transform] duration-200",
                onBand
                  ? "bg-white text-[var(--green-800)] hover:-translate-y-px hover:bg-white/90"
                  : "bg-brand text-on-brand hover:-translate-y-px hover:bg-brand-hover",
              )}
            >
              Subscribe
              <ArrowIcon />
            </button>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
