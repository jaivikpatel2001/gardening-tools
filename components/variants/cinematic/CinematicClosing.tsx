import Image from "next/image";

import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { cinematicClosing } from "@/data/variants/cinematic";

/**
 * Variant 1 closing: the hero's composition answered at the other end of the
 * page. A photograph, one statement, one action, and nothing else in the frame
 * to compete with it.
 *
 * The frame is inset as a rounded panel on the warm surface instead of running
 * full bleed: the dark footer follows directly, and a full-bleed dark band
 * above it would merge with it into one heavy slab.
 */
export function CinematicClosing() {
  const { eyebrow, statement, body, primaryCta, secondaryCta, image } = cinematicClosing;

  return (
    <section aria-labelledby="cinematic-closing" className="bg-surface-warm py-6 sm:py-8 lg:py-10">
      <Container>
        <div
          data-closing-band
          className="relative isolate flex min-h-[70svh] items-center overflow-hidden rounded-2xl bg-band-deep px-6 py-20 text-on-band sm:px-10 lg:px-16 lg:py-28"
        >
          <ParallaxLayer
            className="absolute inset-0 -z-10"
            scaleFrom={1.12}
            yPercent={8}
            triggerSelector="[data-closing-band]"
          >
            <div className="absolute inset-0">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="100vw"
                quality={80}
                className="object-cover object-[50%_35%]"
              />
            </div>
          </ParallaxLayer>

          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[rgba(5,16,9,0.66)]" />

          <Reveal className="max-w-3xl">
            <p className="flex items-center gap-3 font-body text-eyebrow uppercase text-on-band-muted">
              <span aria-hidden="true" className="h-px w-10 bg-white/45" />
              {eyebrow}
            </p>

            <h2 id="cinematic-closing" className="mt-7 text-display-2xl text-on-band">
              {statement}
            </h2>

            <p className="mt-7 max-w-[34rem] text-body-lg text-on-band-muted">{body}</p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton>
                <Button href={primaryCta.href} variant="inverse" size="lg">
                  {primaryCta.label}
                  <ArrowIcon />
                </Button>
              </MagneticButton>
              <Button href={secondaryCta.href} variant="on-band" size="lg">
                {secondaryCta.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
