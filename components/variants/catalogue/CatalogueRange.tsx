import Image from "next/image";
import Link from "next/link";

import { cursorIntent } from "@/components/cursor/cursor-intent";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { catalogueRange } from "@/data/variants/catalogue";
import { formatToolName, getGroupedCategories } from "@/lib/catalogue";
import { routes } from "@/lib/routes";

/** How many tool names the "What is inside" column shows before it summarises. */
const CONTENTS_PREVIEW = 4;

/**
 * Variant 5 categories: the complete range as a ruled index.
 *
 * The only variant that shows all fourteen categories at the top level, in both
 * groups, rather than the five that have been photographed. Photographed
 * categories carry a small plate at the end of the row; the others are listed
 * the same way without one, which is honest about the photography and still
 * puts the whole range in front of the reader.
 *
 * Rows are links, not table cells: every row goes somewhere, and a list of links
 * is simpler to navigate than a table with a link hidden in one column. The
 * column header is therefore visual only.
 */
export function CatalogueRange() {
  const { eyebrow, heading, body, columns, cta } = catalogueRange;
  const groups = getGroupedCategories();

  const gridColumns =
    "md:grid md:grid-cols-[3rem_minmax(0,1.1fr)_minmax(0,1.9fr)_4rem_4.5rem] md:items-center md:gap-6";

  return (
    <section id="catalogue-range" aria-labelledby="catalogue-range-heading" className="bg-surface py-20 lg:py-28">
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id="catalogue-range-heading" className="mt-5 text-display-lg text-ink">
              {heading}
            </h2>
          </div>
          <p className="text-body-md text-body lg:col-span-5 lg:pb-2">{body}</p>
        </Reveal>

        <div className="mt-14 lg:mt-16">
          <div
            aria-hidden="true"
            className={`hidden border-b border-ink pb-3 font-body text-caption-sm uppercase tracking-[0.16em] text-muted ${gridColumns}`}
          >
            <span>No.</span>
            <span>{columns.category}</span>
            <span>{columns.contents}</span>
            <span className="text-right">{columns.count}</span>
            <span />
          </div>

          {groups.map((group, groupIndex) => {
            const offset = groups
              .slice(0, groupIndex)
              .reduce((total, previous) => total + previous.categories.length, 0);

            return (
              <Reveal key={group.id} className="mt-8" distance={20}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-hairline-strong pb-3">
                  <h3 className="font-heading text-title-md text-ink">{group.title}</h3>
                  <p className="font-body text-caption text-muted">{group.description}</p>
                </div>

                <ul>
                  {group.categories.map((category, index) => {
                    const preview = category.tools.slice(0, CONTENTS_PREVIEW).map(formatToolName);
                    const remaining = category.tools.length - preview.length;

                    return (
                      <li key={category.slug} className="border-b border-hairline">
                        <Link
                          href={routes.toolCategory(category.slug)}
                          className={`group relative block py-5 pr-10 transition-colors duration-200 hover:bg-surface-soft md:py-4 md:pr-0 ${gridColumns}`}
                          {...cursorIntent("view")}
                        >
                          <span className="font-heading text-caption font-bold tabular-nums text-muted md:pl-2">
                            {String(offset + index + 1).padStart(2, "0")}
                          </span>

                          <span className="mt-1 block font-heading text-title-lg text-ink transition-colors duration-200 group-hover:text-brand md:mt-0">
                            {category.title}
                          </span>

                          <span className="mt-2 block text-body-sm text-body md:mt-0">
                            {preview.join(", ")}
                            {remaining > 0 ? `, and ${remaining} more` : ""}
                          </span>

                          <span className="mt-2 block font-body text-caption text-muted md:mt-0 md:text-right md:text-body-sm md:tabular-nums md:text-ink">
                            <span className="md:hidden">{`${columns.count}: `}</span>
                            {category.tools.length}
                          </span>

                          <span className="absolute right-0 top-5 flex items-center justify-end gap-3 md:static">
                            {category.image ? (
                              <span className="relative hidden h-12 w-12 overflow-hidden rounded-sm bg-surface-soft md:block">
                                <Image
                                  src={category.image.src}
                                  alt=""
                                  fill
                                  sizes="48px"
                                  quality={70}
                                  className="object-cover transition-transform duration-500 ease-[var(--ease-organic)] group-hover:scale-110"
                                />
                              </span>
                            ) : null}
                            <ArrowIcon className="text-muted transition-all duration-300 ease-[var(--ease-organic)] group-hover:translate-x-1 group-hover:text-brand md:mr-2" />
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12 flex justify-end">
          <ArrowLink href={cta.href}>{cta.label}</ArrowLink>
        </Reveal>
      </Container>
    </section>
  );
}
