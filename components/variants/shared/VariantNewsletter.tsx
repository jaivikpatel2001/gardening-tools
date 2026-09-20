import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { newsletterContent } from "@/data/home";
import { variantSectionBody, variantSectionCopy, type VariantId } from "@/data/variants/shared";
import { cn } from "@/lib/cn";

/**
 * The newsletter strip, for the Home variants.
 *
 * The live Home page closes with one, so every variant does too. Deliberately
 * short: by this point the page has already made its argument.
 */

type Layout = "inline" | "panel" | "ruled";

interface VariantNewsletterProps {
  variant: VariantId;
  layout?: Layout;
  tone?: "canvas" | "surface" | "warm" | "elevated" | "soft";
  id?: string;
}

export function VariantNewsletter({
  variant,
  layout = "inline",
  tone = "surface",
  id,
}: VariantNewsletterProps) {
  const copy = variantSectionCopy[variant].newsletter;
  const sectionId = id ?? `variant${variant}-newsletter`;
  const headingId = `${sectionId}-heading`;

  return (
    <Section
      id={sectionId}
      tone={tone}
      size="none"
      labelledBy={headingId}
      className={cn("py-14 md:py-16", layout === "ruled" && "border-t border-hairline")}
    >
      <Container>
        <Reveal
          className={cn(
            layout === "panel"
              ? "rounded-2xl border border-hairline-soft bg-surface p-8 lg:p-12"
              : "grid items-center gap-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-16",
          )}
        >
          <div className={layout === "panel" ? "max-w-xl" : undefined}>
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <h2 id={headingId} className="mt-4 text-display-sm text-ink">
              {copy.heading}
            </h2>
            <p className="mt-3 max-w-md text-body-md text-body">{newsletterContent.body}</p>
            <p className="mt-2 text-body-sm text-muted">{variantSectionBody.newsletter}</p>
          </div>

          <NewsletterForm className={layout === "panel" ? "mt-8 max-w-md" : undefined} />
        </Reveal>
      </Container>
    </Section>
  );
}
