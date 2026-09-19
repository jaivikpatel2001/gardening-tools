"use client";

import Link from "next/link";
import { useState } from "react";

import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { cn } from "@/lib/cn";

export interface FinderItem {
  id: string;
  question: string;
  answer: string;
  categoryTitle: string;
  href: string;
  tools: readonly string[];
}

/**
 * Variant 2 solutions: the reader states the problem, the page names the tool.
 *
 * A disclosure list rather than a grid of service cards. One row is open at a
 * time, which keeps the whole set of questions readable on a phone without
 * scrolling past four expanded answers.
 *
 * The open panel is animated with a `grid-template-rows` transition from `0fr`
 * to `1fr`, so the height animates without being measured in JavaScript and the
 * closed panel is genuinely hidden from assistive technology.
 */
export function SolutionFinder({ items }: { items: readonly FinderItem[] }) {
  // `undefined` is a real state here: every row can be closed at once.
  const [openId, setOpenId] = useState<string | undefined>(items[0]?.id);

  return (
    <ul className="border-t border-hairline">
      {items.map((item, index) => {
        const open = item.id === openId;
        const panelId = `finder-panel-${item.id}`;

        return (
          <li key={item.id} className="border-b border-hairline">
            <h3>
              <button
                type="button"
                onClick={() => setOpenId(open ? undefined : item.id)}
                aria-expanded={open}
                aria-controls={panelId}
                className="group flex w-full items-center gap-5 py-6 text-left lg:gap-8 lg:py-8"
              >
                <span className="font-body text-caption-sm tracking-[0.2em] text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span
                  className={cn(
                    "min-w-0 flex-1 font-heading text-[1.125rem] font-bold leading-snug tracking-[-0.01em] transition-colors duration-300 sm:text-title-lg lg:text-display-sm",
                    open ? "text-ink" : "text-ink/70 group-hover:text-brand",
                  )}
                >
                  {item.question}
                </span>

                <span
                  aria-hidden="true"
                  className={cn(
                    "relative grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors duration-300",
                    open ? "border-brand bg-brand" : "border-hairline-strong group-hover:border-brand",
                  )}
                >
                  <span className={cn("h-px w-3.5", open ? "bg-on-brand" : "bg-ink")} />
                  <span
                    className={cn(
                      "absolute h-3.5 w-px transition-transform duration-300 ease-[var(--ease-organic)]",
                      open ? "scale-y-0 bg-on-brand" : "scale-y-100 bg-ink",
                    )}
                  />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              // A collapsed panel is still in the layout, so `inert` is what
              // actually takes it out of the tab order and out of the
              // accessibility tree. `display: none` would kill the transition.
              inert={!open}
              className={cn(
                "grid transition-[grid-template-rows] duration-500 ease-[var(--ease-organic)]",
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="grid gap-6 pb-8 lg:grid-cols-12 lg:gap-10 lg:pl-[3.25rem]">
                  <p className="text-body-md text-body lg:col-span-6">{item.answer}</p>

                  <div className="lg:col-span-6">
                    <ul className="flex flex-wrap gap-2">
                      {item.tools.map((tool) => (
                        <li
                          key={tool}
                          className="rounded-full border border-hairline-strong bg-surface px-3.5 py-1.5 font-body text-caption text-body"
                        >
                          {tool}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={item.href}
                      className="group/link mt-6 inline-flex items-center gap-2 font-body text-[0.9375rem] font-semibold text-brand"
                    >
                      {item.categoryTitle}
                      <ArrowIcon className="transition-transform duration-300 ease-[var(--ease-organic)] group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
