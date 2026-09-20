import Link from "next/link";

import { cursorIntent } from "@/components/cursor/cursor-intent";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { routes } from "@/lib/routes";
import type { PhotographedProductCategory } from "@/types/content";

/**
 * Editorial collection card. The whole card is one link, so the arrow inside it
 * renders as text rather than a nested anchor.
 *
 * Typed to `PhotographedProductCategory`, so a category without a photograph cannot
 * be passed in by mistake. Unphotographed categories still appear in the
 * complete range index.
 */
export function ProductCategoryCard({ category }: { category: PhotographedProductCategory }) {
  return (
    <Link
      href={routes.productCategory(category.slug)}
      {...cursorIntent("explore")}
      className="group flex w-full flex-col rounded-lg outline-offset-4 transition-transform duration-300 ease-[var(--ease-organic)] hover:-translate-y-1"
    >
      <ImagePlate
        image={category.image}
        ratio="4/3"
        sizes="(max-width: 743px) 82vw, (max-width: 1127px) 50vw, 33vw"
      />

      <div className="flex flex-1 flex-col pt-5">
        <h3 className="text-title-md text-ink transition-colors duration-200 group-hover:text-brand">
          {category.title}
        </h3>
        <p className="mt-2 flex-1 text-body-sm text-muted">{category.description}</p>
        <ArrowLink asText className="mt-4">
          View Products
        </ArrowLink>
      </div>
    </Link>
  );
}
