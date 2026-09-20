import type { Metadata } from "next";

import { CatalogueClosing } from "@/components/variants/catalogue/CatalogueClosing";
import { CatalogueHero } from "@/components/variants/catalogue/CatalogueHero";
import { CatalogueRange } from "@/components/variants/catalogue/CatalogueRange";
import { ServiceColumns } from "@/components/variants/catalogue/ServiceColumns";
import { SpecimenBoard } from "@/components/variants/catalogue/SpecimenBoard";
import { WorkshopFactSheet } from "@/components/variants/catalogue/WorkshopFactSheet";
import { ConceptSwitcher } from "@/components/variants/shared/ConceptSwitcher";
import { VariantBenefits } from "@/components/variants/shared/VariantBenefits";
import { VariantClients } from "@/components/variants/shared/VariantClients";
import { VariantCommunity } from "@/components/variants/shared/VariantCommunity";
import { VariantHighlights } from "@/components/variants/shared/VariantHighlights";
import { VariantTestimonials } from "@/components/variants/shared/VariantTestimonials";
import { VariantTrust } from "@/components/variants/shared/VariantTrust";
import { enforcePageVisibility } from "@/lib/page-guard";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

/**
 * Variant 5, "Structured Catalogue".
 *
 * A printed trade catalogue brought to the web: a cover with its own contents
 * list, the complete fourteen-category range as a ruled index, a specimen
 * sheet, printed solution columns, a fact sheet, a clientele register and a
 * colophon.
 *
 * Carries all thirteen sections of the live Home page. Every section sits on a
 * light surface, the deep green stays for text, rules and actions, and the
 * footer remains the only dark band on the page, which is why the community
 * section takes its plate layout here.
 *
 * Variants are review material, so they are `noindex` regardless of deployment,
 * and closed in production by the `variants` flag in `config/pageVisibility.ts`.
 */
export const metadata: Metadata = buildMetadata({
  title: "Variant 05, Structured Catalogue",
  path: routes.variant(5),
  noIndex: true,
});

export default function StructuredCataloguePage() {
  enforcePageVisibility("variants");

  return (
    <>
      <CatalogueHero />
      <VariantTrust variant={5} layout="ruled" tone="warm" />
      <CatalogueRange />
      <SpecimenBoard />
      <ServiceColumns />
      <WorkshopFactSheet />
      <VariantBenefits variant={5} layout="grid" tone="surface" />
      <VariantHighlights variant={5} layout="ledger" tone="warm" />
      <VariantClients variant={5} layout="register" tone="canvas" />
      <VariantCommunity variant={5} layout="plate" tone="soft" />
      <VariantTestimonials variant={5} layout="rows" tone="surface" />
      <CatalogueClosing />
      <ConceptSwitcher />
    </>
  );
}
