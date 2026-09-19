import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollLines } from "@/components/variants/shared/ScrollLines";
import { interactiveClosing } from "@/data/variants/interactive";

/**
 * Variant 2 closing: no photograph at all.
 *
 * The last screen is type on the soft botanical band with one action in it.
 * The page has already had its one deep band (the counted figures), and the
 * dark footer follows directly, so the closing stays light: a dark closing
 * above a dark footer reads as one heavy slab. The lines arrive as the block
 * does, which is the only motion left by this point.
 */
export function InteractiveClosing() {
  const { eyebrow, headingLines, body, primaryCta, secondaryCta } = interactiveClosing;

  return (
    <section
      aria-labelledby="interactive-closing"
      className="relative isolate overflow-hidden bg-band-soft py-24 text-on-band-soft lg:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-full -z-10 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--surface)_60%,transparent),transparent_65%)]"
      />

      <Container>
        <Reveal>
          <p className="flex items-center gap-3 font-body text-eyebrow uppercase text-brand-soft">
            <span aria-hidden="true" className="h-px w-10 bg-brand-soft/60" />
            {eyebrow}
          </p>
        </Reveal>

        <ScrollLines className="mt-8">
          <h2 id="interactive-closing" className="text-display-2xl text-on-band-soft">
            {headingLines.map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <span data-v-line className="block">
                  {line}
                </span>
              </span>
            ))}
          </h2>
        </ScrollLines>

        <Reveal className="mt-8 max-w-[34rem]">
          <p className="text-body-lg text-body">{body}</p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
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
