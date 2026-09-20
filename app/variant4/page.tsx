import type { Metadata } from "next";

import { ArtCategories } from "@/components/variants/artdirected/ArtCategories";
import { ArtClosing } from "@/components/variants/artdirected/ArtClosing";
import { ArtGallery } from "@/components/variants/artdirected/ArtGallery";
import { TechnicalSpecs } from "@/components/variants/artdirected/TechnicalSpecs";
import { TypeHero } from "@/components/variants/artdirected/TypeHero";
import { ConceptSwitcher } from "@/components/variants/shared/ConceptSwitcher";
import { VariantAbout } from "@/components/variants/shared/VariantAbout";
import { VariantClients } from "@/components/variants/shared/VariantClients";
import { VariantCommunity } from "@/components/variants/shared/VariantCommunity";
import { VariantHighlights } from "@/components/variants/shared/VariantHighlights";
import { VariantNewsletter } from "@/components/variants/shared/VariantNewsletter";
import { VariantSolutions } from "@/components/variants/shared/VariantSolutions";
import { VariantTestimonials } from "@/components/variants/shared/VariantTestimonials";
import { VariantTrust } from "@/components/variants/shared/VariantTrust";
import { enforcePageVisibility } from "@/lib/page-guard";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

/**
 * Variant 4, "Bold Art-Directed Product Showcase".
 *
 * The most experimental of the five and the one where typography carries the
 * hierarchy: a hero built out of two words and an object, a wall of category
 * names that changes its surroundings, a gallery hung four different ways, a
 * specification sheet and a closing statement at full display size.
 *
 * Carries all thirteen sections of the live Home page. Seven of them come from
 * the shared variant bands, set in this page's shortest layouts: numbered trust
 * rows, a statement-width about block, figures on a single inline rule and a
 * gridded wall of clients.
 *
 * The category wall is already a deep band, so the community section takes its
 * plate layout.
 *
 * Variants are review material, so they are `noindex` regardless of deployment,
 * and closed in production by the `variants` flag in `config/pageVisibility.ts`.
 */
export const metadata: Metadata = buildMetadata({
  title: "Variant 04, Bold Art-Directed Showcase",
  path: routes.variant(4),
  noIndex: true,
});

export default function ArtDirectedPage() {
  enforcePageVisibility("variants");

  return (
    <>
      <TypeHero />
      <VariantTrust variant={4} layout="numbered" tone="surface" />
      <ArtCategories />
      <ArtGallery />
      <VariantAbout variant={4} layout="statement" tone="surface" />
      <TechnicalSpecs />
      <VariantSolutions variant={4} tone="elevated" />
      <VariantHighlights variant={4} layout="inline" tone="canvas" />
      <VariantClients variant={4} layout="wall" tone="surface" />
      <VariantCommunity variant={4} layout="plate" tone="soft" />
      <VariantTestimonials variant={4} layout="columns" tone="canvas" />
      <ArtClosing />
      <VariantNewsletter variant={4} layout="ruled" tone="surface" />
      <ConceptSwitcher />
    </>
  );
}
