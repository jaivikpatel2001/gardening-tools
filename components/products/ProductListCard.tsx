import Link from "next/link";

import { cursorIntent } from "@/components/cursor/cursor-intent";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { routes } from "@/lib/routes";
import type { ProductListRow } from "@/types/content";

/**
 * A category card for the Products page.
 *
 * Unlike the Home card, this one has to work for categories that have not been
 * photographed yet. Rather than invent an image or grey out the card, an
 * unphotographed category gets a typographic plate carrying the group name and
 * the number of product types inside it, which is honest and still reads as a
 * finished card in the grid.
 *
 * There is no price, no availability and no purchase control, here or anywhere:
 * the site is a showcase and every path leads to an enquiry.
 */
export function ProductListCard({ row }: { row: ProductListRow }) {
  return (
    <Link
      href={routes.productCategory(row.slug)}
      {...cursorIntent("view")}
      className="group flex h-full w-full flex-col overflow-hidden rounded-lg border border-hairline-soft bg-surface shadow-card outline-offset-4 transition-[transform,box-shadow] duration-300 ease-[var(--ease-organic)] hover:-translate-y-1 hover:shadow-hover"
    >
      {row.image ? (
        <ImagePlate
          image={row.image}
          ratio="4/3"
          radius="none"
          sizes="(max-width: 743px) 100vw, (max-width: 1127px) 50vw, 33vw"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex aspect-[4/3] flex-col justify-between bg-surface-elevated p-6"
        >
          <p className="text-eyebrow uppercase text-brand-soft">{row.groupTitle}</p>
          <p className="font-heading text-display-sm leading-none text-hairline-strong">
            {String(row.itemCount).padStart(2, "0")}
          </p>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <p className="text-eyebrow uppercase text-muted">{row.groupTitle}</p>
        <h3 className="mt-2.5 text-title-md text-ink transition-colors duration-200 group-hover:text-brand">
          {row.title}
        </h3>
        <p className="mt-2 flex-1 text-body-sm text-muted">{row.description}</p>

        <p className="mt-4 text-caption text-muted">
          {row.itemCount} product {row.itemCount === 1 ? "type" : "types"}
        </p>

        <ArrowLink asText className="mt-4">
          View Products
        </ArrowLink>
      </div>
    </Link>
  );
}
