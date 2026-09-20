import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

/**
 * The closing call to action for interior pages.
 *
 * The same shape the live Home page closes with, generalised so About,
 * Products, a product category, Clients and Contact do not each grow their own.
 * Deliberately unadorned: calm and helpful rather than sales-heavy, and every
 * path leads to an enquiry, never to a cart.
 */
export function CtaBand({
  id = "cta",
  eyebrow,
  heading,
  body,
  primaryCta,
  secondaryCta,
  tone = "band-soft",
}: {
  id?: string;
  eyebrow?: string;
  heading: string;
  body: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  tone?: "canvas" | "surface" | "warm" | "elevated" | "soft" | "band" | "band-soft";
}) {
  const headingId = `${id}-heading`;
  const onBand = tone === "band" || tone === "band-soft";

  return (
    <Section
      id={id}
      tone={tone}
      size="none"
      labelledBy={headingId}
      className="py-24 md:py-28 lg:py-32"
    >
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center" distance={24}>
          {eyebrow ? (
            <div className="flex justify-center">
              <Eyebrow tone={tone === "band" ? "on-band" : "brand"}>{eyebrow}</Eyebrow>
            </div>
          ) : null}

          <h2
            id={headingId}
            className={
              tone === "band"
                ? "mt-6 text-display-lg text-on-band"
                : onBand
                  ? "mt-6 text-display-lg text-on-band-soft"
                  : "mt-6 text-display-lg text-ink"
            }
          >
            {heading}
          </h2>

          <p
            className={
              tone === "band"
                ? "mx-auto mt-6 max-w-xl text-body-lg text-on-band-muted"
                : "mx-auto mt-6 max-w-xl text-body-lg text-body"
            }
          >
            {body}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href={primaryCta.href} size="lg" variant={tone === "band" ? "inverse" : "primary"}>
              {primaryCta.label}
              <ArrowIcon />
            </Button>

            {secondaryCta ? (
              <Button
                href={secondaryCta.href}
                size="lg"
                variant={tone === "band" ? "on-band" : "secondary"}
              >
                {secondaryCta.label}
              </Button>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
