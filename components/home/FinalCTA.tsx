import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { finalCtaContent } from "@/data/home";

/**
 * The closing call to action on the deep botanical green band. Deliberately
 * unadorned: calm and helpful rather than sales-heavy, as the design system asks.
 */
export function FinalCTA() {
  const { heading, body, primaryCta, secondaryCta } = finalCtaContent;

  return (
    <Section tone="band" size="none" labelledBy="cta-heading" className="py-24 md:py-28 lg:py-32" id="final-cta">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center" distance={24}>
          <h2 id="cta-heading" className="text-display-lg text-on-band">
            {heading}
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-body-lg text-on-band-muted">{body}</p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href={primaryCta.href} variant="inverse" size="lg">
              {primaryCta.label}
              <ArrowIcon />
            </Button>

            <Button href={secondaryCta.href} variant="on-band" size="lg">
              {secondaryCta.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
