import Image from "next/image";

import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cinematicStory } from "@/data/variants/cinematic";

/**
 * Variant 1 brand story: a photographic band with the typography set into the
 * environment rather than beside it.
 *
 * The photograph is a macro, so the parallax push reads as a slow camera move
 * across material rather than as an image sliding. The three facts at the foot
 * are the only figures on the page, which is what keeps them credible.
 */
export function StoryBand() {
  const { eyebrow, statement, body, cta, facts, image } = cinematicStory;

  return (
    <section
      data-story-band
      aria-labelledby="cinematic-story"
      className="relative isolate overflow-hidden bg-band-deep py-24 text-on-band lg:py-36"
    >
      <ParallaxLayer
        className="absolute inset-0 -z-10"
        scaleFrom={1.14}
        yPercent={10}
        triggerSelector="[data-story-band]"
      >
        <div className="absolute inset-0">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            quality={80}
            className="object-cover"
          />
        </div>
      </ParallaxLayer>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[rgba(5,16,9,0.7)]"
      />

      <Container>
        <Reveal className="max-w-4xl">
          <p className="flex items-center gap-3 font-body text-eyebrow uppercase text-on-band-muted">
            <span aria-hidden="true" className="h-px w-10 bg-white/45" />
            {eyebrow}
          </p>

          <h2 id="cinematic-story" className="mt-7 text-display-lg text-on-band">
            {statement}
          </h2>

          <p className="mt-6 max-w-[38rem] text-body-lg text-on-band-muted">{body}</p>

          <ArrowLink href={cta.href} tone="on-band" className="mt-8">
            {cta.label}
          </ArrowLink>
        </Reveal>

        <Reveal
          as="ul"
          className="mt-16 grid gap-8 border-t border-white/20 pt-8 sm:grid-cols-3 lg:mt-24"
          stagger={0.08}
        >
          {facts.map((fact) => (
            <li key={fact.label}>
              <p className="font-heading text-display-sm font-extrabold text-on-band">{fact.value}</p>
              <p className="mt-2 max-w-[22ch] font-body text-body-sm text-on-band-muted">{fact.label}</p>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
