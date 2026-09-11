import Link from "next/link";

import { cursorIntent } from "@/components/cursor/cursor-intent";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { formatPowerSource, formatToolName } from "@/lib/catalogue";
import { routes } from "@/lib/routes";
import type { ToolCategoryGroup } from "@/types/content";

interface CategoryIndexProps {
  /** Anchor target, for example "complete-range". */
  id: string;
  eyebrow: string;
  heading: string;
  description: string;
  groups: readonly ToolCategoryGroup[];
}

/**
 * A typographic index of the entire tool range, split into its two groups.
 *
 * Photographs sell a category; this proves the range is complete. It needs no
 * imagery, so a new category appears here the moment it is added to the data,
 * long before it has been photographed. Built to sit under a card grid on Home
 * and to be reused unchanged at the top of the Tools page.
 *
 * Each row uses a stretched link: only the category title is the link, which
 * keeps its accessible name short and meaningful, while an overlay makes the
 * whole row clickable.
 */
export function CategoryIndex({ id, eyebrow, heading, description, groups }: CategoryIndexProps) {
  const headingId = `${id}-heading`;

  return (
    <div id={id} role="region" aria-labelledby={headingId} className="mt-20 scroll-mt-28 lg:mt-24">
      <Reveal className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h3 id={headingId} className="mt-4 text-display-sm text-ink">
          {heading}
        </h3>
        <p className="mt-4 text-body-md text-body">{description}</p>
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
        {groups.map((group) => {
          const groupHeadingId = `${id}-${group.id}`;

          return (
            <Reveal key={group.id} className="min-w-0">
              <h4 id={groupHeadingId} className="text-eyebrow uppercase text-brand-soft">
                {group.title}
              </h4>
              <p className="mt-2 max-w-md text-body-sm text-muted">{group.description}</p>

              <ul aria-labelledby={groupHeadingId} className="mt-6 border-t border-hairline">
                {group.categories.map((category) => (
                  <li key={category.slug} className="group/row relative border-b border-hairline py-5">
                    <div className="flex items-start justify-between gap-6">
                      <div className="min-w-0">
                        <Link
                          href={routes.toolCategory(category.slug)}
                          {...cursorIntent("explore")}
                          className="font-heading text-title-sm text-ink transition-colors duration-200 after:absolute after:inset-0 group-hover/row:text-brand"
                        >
                          {category.title}
                        </Link>

                        <p className="mt-1.5 text-body-sm text-muted">
                          {category.tools.map(formatToolName).join(" · ")}
                        </p>

                        {category.powerSources && category.powerSources.length > 0 ? (
                          <ul aria-label="Power options" className="mt-3 flex flex-wrap gap-1.5">
                            {category.powerSources.map((source) => (
                              <li
                                key={source}
                                className="rounded-full border border-hairline px-2.5 py-0.5 text-caption-sm text-body"
                              >
                                {formatPowerSource(source)}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>

                      <ArrowIcon className="mt-1 text-muted transition-[translate,color] duration-300 ease-[var(--ease-organic)] group-hover/row:translate-x-1 group-hover/row:text-brand" />
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
