import { HighlightsBand } from "@/components/sections/HighlightsBand";
import { variantSectionBody, variantSectionCopy, type VariantId } from "@/data/variants/shared";
import { getHighlights } from "@/lib/highlights";

/**
 * The highlights band, for the Home variants.
 *
 * The same four derived figures the live Home page carries, set in whichever of
 * the band's four layouts suits the variant. Nothing here is a number somebody
 * typed: the values are counted from the catalogue at render time.
 */
export function VariantHighlights({
  variant,
  layout = "grid",
  tone = "warm",
  id,
}: {
  variant: VariantId;
  layout?: "grid" | "ledger" | "inline" | "column";
  tone?: "canvas" | "surface" | "warm" | "elevated" | "soft" | "band" | "band-soft";
  id?: string;
}) {
  const copy = variantSectionCopy[variant].highlights;

  return (
    <HighlightsBand
      id={id ?? `variant${variant}-highlights`}
      eyebrow={copy.eyebrow}
      heading={copy.heading}
      description={variantSectionBody.highlights}
      items={getHighlights()}
      tone={tone}
      layout={layout}
    />
  );
}
