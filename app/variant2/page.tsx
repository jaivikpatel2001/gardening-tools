import type { Metadata } from "next";

import { InteractiveCategories } from "@/components/variants/interactive/InteractiveCategories";
import { InteractiveClosing } from "@/components/variants/interactive/InteractiveClosing";
import { InteractiveDurability } from "@/components/variants/interactive/InteractiveDurability";
import { InteractiveHero } from "@/components/variants/interactive/InteractiveHero";
import { InteractiveProducts } from "@/components/variants/interactive/InteractiveProducts";
import { InteractiveSolutions } from "@/components/variants/interactive/InteractiveSolutions";
import { InteractiveTrust } from "@/components/variants/interactive/InteractiveTrust";
import { ConceptSwitcher } from "@/components/variants/shared/ConceptSwitcher";
import { VariantAbout } from "@/components/variants/shared/VariantAbout";
import { VariantClients } from "@/components/variants/shared/VariantClients";
import { VariantCommunity } from "@/components/variants/shared/VariantCommunity";
import { VariantSolutions } from "@/components/variants/shared/VariantSolutions";
import { VariantTestimonials } from "@/components/variants/shared/VariantTestimonials";
import { VariantTrust } from "@/components/variants/shared/VariantTrust";
import { enforcePageVisibility } from "@/lib/page-guard";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

/**
 * Variant 2, "Interactive Product Experience".
 *
 * One object examined closely, then five ways of moving through the range: a
 * steered list, a dragged rail, a disclosure of questions, counted figures and
 * a scroll-lit set of checks. Nothing here is a card, except where a card is
 * the honest way to show six kinds of customer.
 *
 * Carries all thirteen sections of the live Home page. `InteractiveTrust` is
 * this page's highlights band, so the shared one is not repeated. The solution
 * finder is this page's treatment of "which product for which job", and the
 * four gardening solutions themselves follow it, so no content from `/` is
 * lost. The trust strip, about, clients, testimonials and community
 * sections come from the shared variant bands.
 *
 * The counted figures already spend this page's one deep band, so the community
 * section takes its plate layout.
 *
 * Variants are review material, so they are `noindex` regardless of deployment,
 * and closed in production by the `variants` flag in `config/pageVisibility.ts`.
 */
export const metadata: Metadata = buildMetadata({
  title: "Variant 02, Interactive Product Experience",
  path: routes.variant(2),
  noIndex: true,
});

export default function InteractiveProductPage() {
  enforcePageVisibility("variants");

  return (
    <>
      <InteractiveHero />
      <VariantTrust variant={2} layout="icons" tone="surface" />
      <InteractiveCategories />
      <InteractiveProducts />
      <VariantAbout variant={2} layout="split" tone="surface" />
      <InteractiveSolutions />
      <VariantSolutions variant={2} tone="elevated" />
      <InteractiveTrust />
      <InteractiveDurability />
      <VariantClients variant={2} layout="rail" tone="canvas" />
      <VariantTestimonials variant={2} layout="plates" tone="surface" />
      <VariantCommunity variant={2} layout="plate" tone="soft" />
      <InteractiveClosing />
      <ConceptSwitcher />
    </>
  );
}
