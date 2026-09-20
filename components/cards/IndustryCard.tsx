import Link from "next/link";

import { cursorIntent } from "@/components/cursor/cursor-intent";
import { resolveCategories } from "@/lib/catalogue";
import { routes } from "@/lib/routes";
import type { Industry } from "@/types/content";

/**
 * One kind of customer, with the part of the range they actually buy from.
 *
 * The chips are resolved from the catalogue rather than typed, so a renamed
 * product updates here, an unknown slug fails the build and a list that names
 * the same product twice renders it once. The card itself is not a link: each
 * chip is, which keeps every accessible name meaningful.
 */
export function IndustryCard({ industry }: { industry: Industry }) {
  const Icon = industry.icon;

  return (
    <article className="flex h-full w-full flex-col rounded-lg border border-hairline-soft bg-surface p-6">
      <span
        aria-hidden="true"
        className="grid h-12 w-12 place-items-center rounded-full bg-brand/10 text-brand"
      >
        <Icon className="h-5 w-5" strokeWidth={1.7} />
      </span>

      <h3 className="mt-5 text-title-md text-ink">{industry.title}</h3>
      <p className="mt-2 flex-1 text-body-sm text-muted">{industry.description}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-hairline-soft pt-5">
        {resolveCategories(industry.categorySlugs).map((category) => (
          <li key={category.slug}>
            <Link
              href={routes.productCategory(category.slug)}
              {...cursorIntent("view")}
              className="inline-flex rounded-full border border-hairline px-2.5 py-1 text-caption-sm text-body transition-colors duration-200 hover:border-brand hover:text-brand"
            >
              {category.shortTitle}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
