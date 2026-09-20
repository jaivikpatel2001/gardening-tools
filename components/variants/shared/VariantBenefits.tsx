import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { benefits } from "@/data/benefits";
import { whyChooseContent } from "@/data/home";
import { variantSectionBody, variantSectionCopy, type VariantId } from "@/data/variants/shared";
import { cn } from "@/lib/cn";

/**
 * The "why choose us" band, for the Home variants.
 *
 * Same four numbered benefits the live Home page carries, in one of three
 * settings: a ruled ledger, a plain grid, or a split with the macro photograph
 * of a forged head beside them.
 */

type Layout = "ledger" | "grid" | "split";

interface VariantBenefitsProps {
  variant: VariantId;
  layout?: Layout;
  tone?: "canvas" | "surface" | "warm" | "elevated" | "soft" | "band" | "band-soft";
  id?: string;
}

export function VariantBenefits({
  variant,
  layout = "ledger",
  tone = "canvas",
  id,
}: VariantBenefitsProps) {
  const copy = variantSectionCopy[variant].benefits;
  const sectionId = id ?? `variant${variant}-benefits`;
  const headingId = `${sectionId}-heading`;
  const onBand = tone === "band" || tone === "band-soft";

  const list = (
    <Reveal
      as="ol"
      stagger={0.08}
      className={cn(
        layout === "grid" && "grid gap-8 sm:grid-cols-2",
        layout !== "grid" && "border-t border-current/15",
      )}
    >
      {benefits.map((benefit) => (
        <li
          key={benefit.index}
          className={cn(
            layout === "grid" ? "flex flex-col" : "border-b border-current/15 py-7",
            layout === "ledger" && "flex flex-col gap-2 sm:flex-row sm:gap-10",
          )}
        >
          <p
            aria-hidden="true"
            className={cn(
              "font-heading tabular-nums",
              layout === "grid" ? "text-title-lg" : "text-display-sm leading-none",
              layout === "ledger" && "sm:w-24 sm:shrink-0",
              onBand ? "text-on-band-muted" : "text-brand-soft",
            )}
          >
            {benefit.index}
          </p>
          <div className={cn("min-w-0", layout === "grid" && "mt-4")}>
            <h3 className={cn("text-title-lg", onBand ? "text-on-band" : "text-ink")}>
              {benefit.title}
            </h3>
            <p
              className={cn(
                "mt-2 max-w-[54ch] text-body-sm",
                onBand ? "text-on-band-muted" : "text-body",
              )}
            >
              {benefit.description}
            </p>
          </div>
        </li>
      ))}
    </Reveal>
  );

  return (
    <Section id={sectionId} tone={tone} labelledBy={headingId}>
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow tone={onBand ? "on-band" : "brand"}>{copy.eyebrow}</Eyebrow>
          <h2 id={headingId} className={cn("mt-4 text-display-md", onBand ? "text-on-band" : "text-ink")}>
            {copy.heading}
          </h2>
          <p className={cn("mt-4 text-body-md", onBand ? "text-on-band-muted" : "text-body")}>
            {variantSectionBody.benefits}
          </p>
        </Reveal>

        {layout === "split" ? (
          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <ImagePlate
                image={whyChooseContent.image}
                ratio="4/5"
                sizes="(max-width: 1127px) 92vw, 38vw"
                radius="xl"
              />
            </Reveal>
            <div className="lg:col-span-7">{list}</div>
          </div>
        ) : (
          <div className="mt-12">{list}</div>
        )}
      </Container>
    </Section>
  );
}
