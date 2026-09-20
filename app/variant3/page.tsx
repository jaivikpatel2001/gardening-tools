import type { Metadata } from "next";

import { BotanicalCategories } from "@/components/variants/botanical/BotanicalCategories";
import { BotanicalClosing } from "@/components/variants/botanical/BotanicalClosing";
import { BotanicalHero } from "@/components/variants/botanical/BotanicalHero";
import { BotanicalShowcase } from "@/components/variants/botanical/BotanicalShowcase";
import { BotanicalVoices } from "@/components/variants/botanical/BotanicalVoices";
import { CraftStory } from "@/components/variants/botanical/CraftStory";
import { GardenJourney } from "@/components/variants/botanical/GardenJourney";
import { ConceptSwitcher } from "@/components/variants/shared/ConceptSwitcher";
import { VariantBenefits } from "@/components/variants/shared/VariantBenefits";
import { VariantClients } from "@/components/variants/shared/VariantClients";
import { VariantCommunity } from "@/components/variants/shared/VariantCommunity";
import { VariantHighlights } from "@/components/variants/shared/VariantHighlights";
import { VariantNewsletter } from "@/components/variants/shared/VariantNewsletter";
import { VariantSolutions } from "@/components/variants/shared/VariantSolutions";
import { VariantTrust } from "@/components/variants/shared/VariantTrust";
import { enforcePageVisibility } from "@/lib/page-guard";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

/**
 * Variant 3, "Modern Indian Botanical".
 *
 * Warm, light and organic: a split hero, a ring of categories around one arch,
 * products marked inside a real garden, a four chapter story and a walk through
 * five Indian garden environments. The botanical feeling is carried by arcs and
 * photography, never by drawn leaves.
 *
 * Carries all thirteen sections of the live Home page. The walk through five
 * Indian gardens is this page's treatment of garden solutions, and the four
 * solutions themselves follow it, so no content from `/` is lost. This is the
 * one variant with no deep band of its own, so it is the one that keeps the full-bleed
 * photographic community section, exactly as `/` does. The clients band uses
 * the organic radius, which the design system reserves for Home and this page.
 *
 * Variants are review material, so they are `noindex` regardless of deployment,
 * and closed in production by the `variants` flag in `config/pageVisibility.ts`.
 */
export const metadata: Metadata = buildMetadata({
  title: "Variant 03, Modern Indian Botanical",
  path: routes.variant(3),
  noIndex: true,
});

export default function IndianBotanicalPage() {
  enforcePageVisibility("variants");

  return (
    <>
      <BotanicalHero />
      <VariantTrust variant={3} layout="plates" tone="surface" />
      <BotanicalCategories />
      <BotanicalShowcase />
      <CraftStory />
      <VariantBenefits variant={3} layout="split" tone="surface" />
      <GardenJourney />
      <VariantSolutions variant={3} tone="surface" />
      <VariantHighlights variant={3} layout="column" tone="canvas" />
      <VariantClients variant={3} layout="arc" tone="surface" />
      <VariantCommunity variant={3} layout="photo" />
      <BotanicalVoices />
      <BotanicalClosing />
      <VariantNewsletter variant={3} layout="inline" tone="surface" />
      <ConceptSwitcher />
    </>
  );
}
