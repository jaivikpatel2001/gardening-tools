import type { Metadata } from "next";

import { ArtCategories } from "@/components/variants/artdirected/ArtCategories";
import { ArtClosing } from "@/components/variants/artdirected/ArtClosing";
import { ArtGallery } from "@/components/variants/artdirected/ArtGallery";
import { TechnicalSpecs } from "@/components/variants/artdirected/TechnicalSpecs";
import { TypeHero } from "@/components/variants/artdirected/TypeHero";
import { VisualJournal } from "@/components/variants/artdirected/VisualJournal";
import { ConceptSwitcher } from "@/components/variants/shared/ConceptSwitcher";
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
 * Variants are review material, so they are `noindex` regardless of deployment.
 */
export const metadata: Metadata = buildMetadata({
  title: "Variant 04, Bold Art-Directed Showcase",
  path: routes.variant(4),
  noIndex: true,
});

export default function ArtDirectedPage() {
  return (
    <>
      <TypeHero />
      <ArtCategories />
      <ArtGallery />
      <TechnicalSpecs />
      <VisualJournal />
      <ArtClosing />
      <ConceptSwitcher />
    </>
  );
}
