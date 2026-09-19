import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { finalCtaContent } from "@/data/home";

/**
 * The closing call to action on the soft botanical band. Deliberately
 * unadorned: calm and helpful rather than sales-heavy, as the design system
 * asks. Light rather than deep green because the dark footer is two sections
 * away and the photographic community band has already given the page its
 * dark beat.
 */
export function FinalCTA() {
  const { heading, body, primaryCta, secondaryCta } = finalCtaContent;

  return (
    <Section tone="band-soft" size="none" labelledBy="cta-heading" className="py-24 md:py-28 lg:py-32" id="final-cta">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center" distance={24}>
          <h2 id="cta-heading" className="text-display-lg text-on-band-soft">
            {heading}
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-body-lg text-body">{body}</p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href={primaryCta.href} size="lg">
              {primaryCta.label}
              <ArrowIcon />
            </Button>

            <Button href={secondaryCta.href} variant="secondary" size="lg">
              {secondaryCta.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
