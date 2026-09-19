import type { Metadata } from "next";

import { BotanicalCategories } from "@/components/variants/botanical/BotanicalCategories";
import { BotanicalClosing } from "@/components/variants/botanical/BotanicalClosing";
import { BotanicalHero } from "@/components/variants/botanical/BotanicalHero";
import { BotanicalShowcase } from "@/components/variants/botanical/BotanicalShowcase";
import { BotanicalVoices } from "@/components/variants/botanical/BotanicalVoices";
import { CraftStory } from "@/components/variants/botanical/CraftStory";
import { GardenJourney } from "@/components/variants/botanical/GardenJourney";
import { ConceptSwitcher } from "@/components/variants/shared/ConceptSwitcher";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

/**
 * Variant 3, "Modern Indian Botanical".
 *
 * Warm, light and organic: a split hero, a ring of categories around one arch,
 * tools marked inside a real garden, a four chapter story and a walk through
 * five Indian garden environments. The botanical feeling is carried by arcs and
 * photography, never by drawn leaves.
 *
 * Variants are review material, so they are `noindex` regardless of deployment.
 */
export const metadata: Metadata = buildMetadata({
  title: "Variant 03, Modern Indian Botanical",
  path: routes.variant(3),
  noIndex: true,
});

export default function IndianBotanicalPage() {
  return (
    <>
      <BotanicalHero />
      <BotanicalCategories />
      <BotanicalShowcase />
      <CraftStory />
      <GardenJourney />
      <BotanicalVoices />
      <BotanicalClosing />
      <ConceptSwitcher />
    </>
  );
}
