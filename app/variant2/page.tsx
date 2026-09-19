import type { Metadata } from "next";

import { InteractiveCategories } from "@/components/variants/interactive/InteractiveCategories";
import { InteractiveClosing } from "@/components/variants/interactive/InteractiveClosing";
import { InteractiveDurability } from "@/components/variants/interactive/InteractiveDurability";
import { InteractiveHero } from "@/components/variants/interactive/InteractiveHero";
import { InteractiveProducts } from "@/components/variants/interactive/InteractiveProducts";
import { InteractiveSolutions } from "@/components/variants/interactive/InteractiveSolutions";
import { InteractiveTrust } from "@/components/variants/interactive/InteractiveTrust";
import { ConceptSwitcher } from "@/components/variants/shared/ConceptSwitcher";
import { routes } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

/**
 * Variant 2, "Interactive Product Experience".
 *
 * One object examined closely, then five ways of moving through the range: a
 * steered list, a dragged rail, a disclosure of questions, counted figures and
 * a scroll-lit set of checks. Nothing here is a card.
 *
 * The sections run on the warm light surfaces the rest of the site uses, with
 * one deep green band at the very end. The interaction carries this direction,
 * not the background colour.
 *
 * Variants are review material, so they are `noindex` regardless of deployment.
 */
export const metadata: Metadata = buildMetadata({
  title: "Variant 02, Interactive Product Experience",
  path: routes.variant(2),
  noIndex: true,
});

export default function InteractiveProductPage() {
  return (
    <>
      <InteractiveHero />
      <InteractiveCategories />
      <InteractiveProducts />
      <InteractiveSolutions />
      <InteractiveTrust />
      <InteractiveDurability />
      <InteractiveClosing />
      <ConceptSwitcher />
    </>
  );
}
