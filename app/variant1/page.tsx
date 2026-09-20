import type { Metadata } from "next";

import { CinematicClosing } from "@/components/variants/cinematic/CinematicClosing";
import { CinematicHero } from "@/components/variants/cinematic/CinematicHero";
import { EditorialCollage } from "@/components/variants/cinematic/EditorialCollage";
import { EditorialVoices } from "@/components/variants/cinematic/EditorialVoices";
import { ProductStories } from "@/components/variants/cinematic/ProductStories";
import { SolutionsLedger } from "@/components/variants/cinematic/SolutionsLedger";
import { StoryBand } from "@/components/variants/cinematic/StoryBand";
import { ConceptSwitcher } from "@/components/variants/shared/ConceptSwitcher";
import { VariantBenefits } from "@/components/variants/shared/VariantBenefits";
import { VariantClients } from "@/components/variants/shared/VariantClients";
import { VariantCommunity } from "@/components/variants/shared/VariantCommunity";
import { VariantHighlights } from "@/components/variants/shared/VariantHighlights";
import { VariantNewsletter } from "@/components/variants/shared/VariantNewsletter";
import { VariantTrust } from "@/components/variants/shared/VariantTrust";
import { enforcePageVisibility } from "@/lib/page-guard";
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
 * Carries all thirteen sections of the live Home page. The five that this
 * design had no equivalent for come from the shared variant bands, each set in
 * the layout that suits an editorial page: ruled trust rows, a benefits ledger,
 * figures ruled like a contents list and a clients spread.
 *
 * The hero and the story band are already deep, so the community section takes
 * its plate layout rather than adding a third dark band.
 *
 * Variants are review material, so they are `noindex` regardless of deployment,
 * and closed in production by the `variants` flag in `config/pageVisibility.ts`.
 */
export const metadata: Metadata = buildMetadata({
  title: "Variant 01, Cinematic Editorial",
  path: routes.variant(1),
  noIndex: true,
});

export default function CinematicEditorialPage() {
  enforcePageVisibility("variants");

  return (
    <>
      <CinematicHero />
      <VariantTrust variant={1} layout="ruled" tone="surface" />
      <EditorialCollage />
      <ProductStories />
      <StoryBand />
      <SolutionsLedger />
      <VariantBenefits variant={1} layout="ledger" tone="surface" />
      <VariantHighlights variant={1} layout="ledger" tone="warm" />
      <VariantClients variant={1} layout="spread" tone="canvas" />
      <VariantCommunity variant={1} layout="plate" tone="soft" />
      <EditorialVoices />
      <CinematicClosing />
      <VariantNewsletter variant={1} layout="inline" tone="surface" />
      <ConceptSwitcher />
    </>
  );
}
