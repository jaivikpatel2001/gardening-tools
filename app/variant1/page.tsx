import type { Metadata } from "next";

import { CinematicClosing } from "@/components/variants/cinematic/CinematicClosing";
import { CinematicHero } from "@/components/variants/cinematic/CinematicHero";
import { EditorialCollage } from "@/components/variants/cinematic/EditorialCollage";
import { EditorialVoices } from "@/components/variants/cinematic/EditorialVoices";
import { MagazineJournal } from "@/components/variants/cinematic/MagazineJournal";
import { ProductStories } from "@/components/variants/cinematic/ProductStories";
import { SolutionsLedger } from "@/components/variants/cinematic/SolutionsLedger";
import { StoryBand } from "@/components/variants/cinematic/StoryBand";
import { ConceptSwitcher } from "@/components/variants/shared/ConceptSwitcher";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

/**
 * Variant 1, "Cinematic Editorial".
 *
 * A luxury lifestyle magazine that happens to sell nothing: full-bleed
 * photography, an asymmetric category spread, four long product chapters and a
 * closing statement. Every section is a different shape from its neighbour, and
 * a different shape from the same section on the live Home page.
 *
 * Variants are review material, so they are `noindex` regardless of deployment.
 */
export const metadata: Metadata = buildMetadata({
  title: "Variant 01, Cinematic Editorial",
  path: routes.variant(1),
  noIndex: true,
});

export default function CinematicEditorialPage() {
  return (
    <>
      <CinematicHero />
      <EditorialCollage />
      <ProductStories />
      <StoryBand />
      <SolutionsLedger />
      <MagazineJournal />
      <EditorialVoices />
      <CinematicClosing />
      <ConceptSwitcher />
    </>
  );
}
