import Link from "next/link";

import { cursorIntent } from "@/components/cursor/cursor-intent";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { routes } from "@/lib/routes";
import type { PhotographedProduct } from "@/types/content";

/**
 * Product showcase card. Presents a product as an object worth looking at, not
 * as a listing: no price, no availability and no purchase control anywhere.
 *
 * It links to the product category the item belongs to rather than to a page of
 * its own. Only the categories carry detail pages, because those are the
 * product lines the client actually publishes.
 */
export function ProductShowcaseCard({ product }: { product: PhotographedProduct }) {
  return (
    <Link
      href={routes.productCategory(product.categorySlug)}
      {...cursorIntent("view")}
      className="group flex h-full w-full flex-col overflow-hidden rounded-lg border border-hairline-soft bg-surface shadow-card outline-offset-4 transition-[transform,box-shadow] duration-300 ease-[var(--ease-organic)] hover:-translate-y-1 hover:shadow-hover"
    >
      <ImagePlate
        image={product.image}
        ratio="1/1"
        radius="none"
        sizes="(max-width: 743px) 100vw, (max-width: 1127px) 50vw, 25vw"
        className="bg-surface-elevated"
      />

      <div className="flex flex-1 flex-col p-5">
        <p className="text-eyebrow uppercase text-muted">{product.category}</p>
        <h3 className="mt-2.5 text-title-md text-ink transition-colors duration-200 group-hover:text-brand">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-body-sm text-muted">{product.description}</p>
        <ArrowLink asText className="mt-5">
          View Range
        </ArrowLink>
      </div>
    </Link>
  );
}
