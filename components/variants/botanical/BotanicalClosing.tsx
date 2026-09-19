import Image from "next/image";

import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { botanicalClosing } from "@/data/variants/botanical";

/**
 * Variant 3 closing: warm rather than dark.
 *
 * The other concepts end on a deep green or a black-green statement. This one
 * ends on cream with a single arched photograph behind it, drifting slowly, so
 * the page finishes in the same register it opened in.
 */
export function BotanicalClosing() {
  const { eyebrow, heading, body, primaryCta, secondaryCta, image } = botanicalClosing;

  return (
    <section
      data-botanical-closing
      aria-labelledby="botanical-closing"
      className="bg-surface-warm py-20 lg:py-28"
    >
      <Container>
        <div className="relative isolate overflow-hidden rounded-2xl rounded-tr-arch bg-band px-6 py-16 text-on-band sm:px-10 lg:px-16 lg:py-24">
          <ParallaxLayer
            className="absolute inset-0 -z-10"
            scaleFrom={1.16}
            yPercent={8}
            triggerSelector="[data-botanical-closing]"
          >
            <div className="absolute inset-0">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1127px) 100vw, 1400px"
                quality={80}
                className="object-cover"
              />
            </div>
          </ParallaxLayer>

          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[rgba(9,32,17,0.72)]" />

          <Reveal className="max-w-2xl">
            <Eyebrow tone="on-band">{eyebrow}</Eyebrow>
            <h2 id="botanical-closing" className="mt-5 text-display-lg text-on-band">
              {heading}
            </h2>
            <p className="mt-6 max-w-[34rem] text-body-lg text-on-band-muted">{body}</p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
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
