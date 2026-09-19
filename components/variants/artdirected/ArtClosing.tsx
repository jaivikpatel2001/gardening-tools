import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollLines } from "@/components/variants/shared/ScrollLines";
import { artClosing } from "@/data/variants/artDirected";

/**
 * Variant 4 closing: the hero's typographic idea taken to the full screen.
 *
 * Three lines, each masked and released in turn as the block arrives, one
 * action under them, and nothing else. The line that carries the promise is set
 * in the brand green so the eye lands there last.
 *
 * Set on the warm light surface, not a deep band: the category wall is this
 * variant’s dark feature, and a dark closing directly above the dark footer
 * would read as one heavy slab.
 */
export function ArtClosing() {
  const { eyebrow, words, body, primaryCta, secondaryCta } = artClosing;

  return (
    <section
      aria-labelledby="art-closing"
      className="relative isolate flex min-h-[72svh] flex-col justify-center overflow-hidden bg-surface-warm py-24 lg:py-32"
    >
      <Container>
        <Reveal>
          <p className="flex items-center gap-3 font-body text-eyebrow uppercase text-brand-soft">
            <span aria-hidden="true" className="h-px w-10 bg-brand-soft/60" />
            {eyebrow}
          </p>
        </Reveal>

        <ScrollLines className="mt-10">
          <h2 id="art-closing" className="text-display-3xl uppercase text-ink">
            {words.map((word, index) => (
              <span key={word} className="block overflow-hidden pb-[0.04em]">
                <span
                  data-v-line
                  className={index === words.length - 1 ? "block text-brand" : "block"}
                >
                  {word}
                </span>
              </span>
            ))}
          </h2>
        </ScrollLines>

        <Reveal className="mt-12 flex flex-col gap-8 border-t border-hairline pt-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-[30rem] text-body-lg text-body">{body}</p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <MagneticButton>
              <Button href={primaryCta.href} size="lg">
                {primaryCta.label}
                <ArrowIcon />
              </Button>
            </MagneticButton>
            <ArrowLink href={secondaryCta.href}>
              {secondaryCta.label}
            </ArrowLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
