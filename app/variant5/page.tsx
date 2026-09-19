import type { Metadata } from "next";

import { CatalogueClosing } from "@/components/variants/catalogue/CatalogueClosing";
import { CatalogueHero } from "@/components/variants/catalogue/CatalogueHero";
import { CatalogueRange } from "@/components/variants/catalogue/CatalogueRange";
import { ReadingList } from "@/components/variants/catalogue/ReadingList";
import { ServiceColumns } from "@/components/variants/catalogue/ServiceColumns";
import { SpecimenBoard } from "@/components/variants/catalogue/SpecimenBoard";
import { WorkshopFactSheet } from "@/components/variants/catalogue/WorkshopFactSheet";
import { ConceptSwitcher } from "@/components/variants/shared/ConceptSwitcher";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

/**
 * Variant 5, "Structured Catalogue".
 *
 * A printed trade catalogue brought to the web: a cover with its own contents
 * list, the complete fourteen-category range as a ruled index, a specimen sheet,
 * printed service columns, a fact sheet, a reading list and a colophon. Every
 * section sits on a light surface; the deep green is kept for text, rules and
 * actions, and the footer is the only dark band on the page.
 *
 * Variants are review material, so they are `noindex` regardless of deployment.
 */
export const metadata: Metadata = buildMetadata({
  title: "Variant 05, Structured Catalogue",
  path: routes.variant(5),
  noIndex: true,
});

export default function StructuredCataloguePage() {
  return (
    <>
      <CatalogueHero />
      <CatalogueRange />
      <SpecimenBoard />
      <ServiceColumns />
      <WorkshopFactSheet />
      <ReadingList />
      <CatalogueClosing />
      <ConceptSwitcher />
    </>
  );
}
