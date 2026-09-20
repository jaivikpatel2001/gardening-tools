import { SolutionCard } from "@/components/cards/SolutionCard";
import { CollectionSection } from "@/components/sections/CollectionSection";
import { solutions } from "@/data/solutions";
import { variantSectionBody, variantSectionCopy, type VariantId } from "@/data/variants/shared";

/**
 * The solutions band, for the one Home variant that had no equivalent section.
 *
 * A thin binding of the shared collection shell, exactly as the live Home page
 * uses it, so the four solutions are described once and rendered the same way
 * wherever they appear.
 */
export function VariantSolutions({
  variant,
  tone = "elevated",
  id,
}: {
  variant: VariantId;
  tone?: "canvas" | "surface" | "warm" | "elevated" | "soft";
  id?: string;
}) {
  const copy = variantSectionCopy[variant].solutions;

  return (
    <CollectionSection
      id={id ?? `variant${variant}-solutions`}
      tone={tone}
      eyebrow={copy.eyebrow}
      heading={copy.heading}
      description={variantSectionBody.solutions}
      items={solutions}
      getKey={(solution) => solution.slug}
      renderItem={(solution) => <SolutionCard solution={solution} />}
      columns={4}
      stagger={0.07}
    />
  );
}
