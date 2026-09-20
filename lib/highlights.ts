import { highlightsContent } from "@/data/home";
import { getRangeCounts } from "@/lib/catalogue";
import type { Highlight } from "@/types/content";

/**
 * The four figures used by the highlights band on Home, on About and on every
 * Home variant.
 *
 * Values are counted from the catalogue or derived from the founding year;
 * labels and supporting lines come from `data/home.ts`. Building them here
 * means the same four numbers appear everywhere and none of them is typed by
 * hand. Nothing that has not been supplied (customers served, orders shipped,
 * turnover) is included.
 */
export function getHighlights(): Highlight[] {
  const counts = getRangeCounts();
  const { labels, reachValue } = highlightsContent;

  return [
    { value: `${counts.years}`, ...labels.years },
    { value: `${counts.categories}`, ...labels.categories },
    { value: `${counts.productTypes}`, ...labels.productTypes },
    { value: reachValue, ...labels.reach },
  ];
}
