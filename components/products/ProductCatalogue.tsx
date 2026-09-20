"use client";

import { Search, X } from "lucide-react";
import { useId, useMemo, useState } from "react";

import { ProductListCard } from "@/components/products/ProductListCard";
import { cursorIntent } from "@/components/cursor/cursor-intent";
import { cn } from "@/lib/cn";
import type { ProductListRow } from "@/types/content";

/**
 * The Products page browser: group filter, search and sort over the category
 * rows.
 *
 * Client-side because filtering fourteen rows across a network round trip would
 * be absurd, but deliberately thin. `lib/catalogue.ts` and the catalogue data
 * never cross this boundary; the server hands down plain rows with the
 * searchable text already joined, and this file only decides which of them to
 * show.
 *
 * It is a showcase, not a shop. There is no price filter, no availability
 * filter, no sort by price and no cart, because none of those exist anywhere on
 * this site.
 */

type SortKey = "catalogue" | "a-z" | "z-a" | "largest";

const SORTS: readonly { key: SortKey; label: string }[] = [
  { key: "catalogue", label: "Catalogue order" },
  { key: "a-z", label: "Name, A to Z" },
  { key: "z-a", label: "Name, Z to A" },
  { key: "largest", label: "Most product types" },
];

interface ProductCatalogueProps {
  rows: readonly ProductListRow[];
  groups: readonly { id: string; title: string }[];
}

export function ProductCatalogue({ rows, groups }: ProductCatalogueProps) {
  const searchId = useId();
  const sortId = useId();
  const [group, setGroup] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("catalogue");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();

    const filtered = rows.filter((row) => {
      const inGroup = group === "all" || row.group === group;
      const matches = needle.length === 0 || row.keywords.includes(needle);
      return inGroup && matches;
    });

    const sorted = [...filtered];
    if (sort === "a-z") sorted.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "z-a") sorted.sort((a, b) => b.title.localeCompare(a.title));
    if (sort === "largest") sorted.sort((a, b) => b.itemCount - a.itemCount);
    return sorted;
  }, [rows, group, query, sort]);

  const filters = [{ id: "all", title: "Everything" }, ...groups];

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-hairline pb-7 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div className="min-w-0">
          <h3 className="sr-only">Filter the range</h3>
          <ul className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const active = group === filter.id;
              return (
                <li key={filter.id}>
                  <button
                    type="button"
                    onClick={() => setGroup(filter.id)}
                    aria-pressed={active}
                    {...cursorIntent("click")}
                    className={cn(
                      "inline-flex min-h-11 items-center rounded-full border px-4 font-body text-[0.875rem] font-semibold transition-colors duration-200",
                      active
                        ? "border-brand bg-brand text-on-brand"
                        : "border-hairline-strong text-body hover:border-brand hover:text-brand",
                    )}
                  >
                    {filter.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:shrink-0">
          <div className="relative">
            <label htmlFor={searchId} className="sr-only">
              Search the product range
            </label>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              strokeWidth={1.7}
            />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search, for example khurpi or mower"
              className="min-h-11 w-full rounded-sm border border-hairline-strong bg-surface pl-10 pr-10 font-body text-[0.9375rem] text-ink placeholder:text-muted sm:w-72"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-muted transition-colors duration-200 hover:text-brand"
              >
                <X className="h-4 w-4" strokeWidth={1.7} />
              </button>
            ) : null}
          </div>

          <div className="flex items-center gap-2.5">
            <label htmlFor={sortId} className="shrink-0 text-caption text-muted">
              Sort
            </label>
            <select
              id={sortId}
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="min-h-11 rounded-sm border border-hairline-strong bg-surface px-3 font-body text-[0.9375rem] text-ink"
            >
              {SORTS.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <p aria-live="polite" className="mt-6 text-body-sm text-muted">
        Showing {visible.length} of {rows.length} product categories
      </p>

      {visible.length > 0 ? (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((row) => (
            <li key={row.slug} className="flex">
              <ProductListCard row={row} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 rounded-lg border border-hairline bg-surface p-10 text-center">
          <p className="text-title-md text-ink">Nothing matches that yet</p>
          <p className="mx-auto mt-3 max-w-md text-body-sm text-muted">
            Try a different word, or clear the search. If it is a gardening product, there is a fair
            chance we stock it even when the website does not list it by that name.
          </p>
        </div>
      )}
    </div>
  );
}
