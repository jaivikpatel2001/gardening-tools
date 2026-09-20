import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { trustItems } from "@/data/trust";
import { variantSectionBody, variantSectionCopy, type VariantId } from "@/data/variants/shared";
import { cn } from "@/lib/cn";

/**
 * The trust strip, for the Home variants.
 *
 * The live Home page carries four assurances directly under the hero. Every
 * variant has to carry them too, so this renders the same four items in one of
 * four shapes: icons above text, a numbered rule, a plain ruled column, or a
 * boxed plate. One component, because the content never changes between pages
 * and only the setting does.
 */

type Layout = "icons" | "numbered" | "ruled" | "plates";

const LIST_CLASS: Record<Layout, string> = {
  icons: "grid gap-8 sm:grid-cols-2 lg:grid-cols-4",
  numbered: "grid border-t border-current/15 sm:grid-cols-2 lg:grid-cols-4",
  ruled: "flex flex-col border-t border-current/15",
  plates: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
};

const ITEM_CLASS: Record<Layout, string> = {
  icons: "flex flex-col",
  numbered: "border-b border-current/15 px-0 py-7 sm:[&:nth-child(even)]:sm:border-l sm:[&:nth-child(even)]:sm:pl-7 lg:border-l lg:px-7 lg:first:border-l-0 lg:first:pl-0",
  ruled: "flex flex-col gap-2 border-b border-current/15 py-6 sm:flex-row sm:items-baseline sm:gap-8",
  plates: "rounded-lg border border-hairline-soft bg-surface p-6",
};

interface VariantTrustProps {
  variant: VariantId;
  layout?: Layout;
  tone?: "canvas" | "surface" | "warm" | "elevated" | "soft" | "band" | "band-soft";
  id?: string;
}

export function VariantTrust({ variant, layout = "icons", tone = "surface", id }: VariantTrustProps) {
  const copy = variantSectionCopy[variant].trust;
  const sectionId = id ?? `variant${variant}-trust`;
  const headingId = `${sectionId}-heading`;
  const onBand = tone === "band" || tone === "band-soft";

  return (
    <Section id={sectionId} tone={tone} labelledBy={headingId}>
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow tone={onBand ? "on-band" : "brand"}>{copy.eyebrow}</Eyebrow>
          <h2 id={headingId} className={cn("mt-4 text-display-sm", onBand ? "text-on-band" : "text-ink")}>
            {copy.heading}
          </h2>
          <p className={cn("mt-4 text-body-md", onBand ? "text-on-band-muted" : "text-body")}>
            {variantSectionBody.trust}
          </p>
        </Reveal>

        <Reveal as="ul" stagger={0.07} className={cn("mt-12", LIST_CLASS[layout])}>
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={item.title} className={ITEM_CLASS[layout]}>
                {layout === "icons" || layout === "plates" ? (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "grid h-12 w-12 place-items-center rounded-full",
                      onBand ? "bg-white/10 text-on-band" : "bg-brand/10 text-brand",
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                ) : (
                  <p
                    aria-hidden="true"
                    className={cn(
                      "font-heading text-title-lg tabular-nums",
                      layout === "ruled" && "sm:w-16 sm:shrink-0",
                      onBand ? "text-on-band-muted" : "text-brand-soft",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </p>
                )}

                <div className={layout === "icons" || layout === "plates" ? "mt-5" : "min-w-0"}>
                  <h3 className={cn("text-title-md", onBand ? "text-on-band" : "text-ink")}>
                    {item.title}
                  </h3>
                  <p className={cn("mt-2 text-body-sm", onBand ? "text-on-band-muted" : "text-muted")}>
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </Reveal>
      </Container>
    </Section>
  );
}
