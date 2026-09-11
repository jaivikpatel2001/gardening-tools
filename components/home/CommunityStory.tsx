import Image from "next/image";

import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { communityContent } from "@/data/home";

/**
 * Full-bleed emotional beat. The photograph sits behind a deep-green scrim and
 * drifts slowly as the section passes, so it reads as camera movement rather
 * than an animated element.
 */
export function CommunityStory() {
  const { eyebrow, heading, body, cta, image } = communityContent;

  return (
    <section
      data-community-story
      aria-labelledby="community-heading"
      className="relative isolate overflow-hidden bg-[var(--green-800)]"
    >
      <ParallaxLayer
        scaleFrom={1.12}
        yPercent={5}
        triggerSelector="[data-community-story]"
        className="absolute inset-0 -z-10"
      >
        <div className="relative h-full w-full">
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

      {/* Scrim. Two layers: a flat wash for overall contrast, and a soft vertical
          gradient so the text block sits on the darkest part of the frame. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[var(--green-800)]/72" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--green-800)]/45 via-transparent to-[var(--green-800)]/60"
      />

      <Container className="py-24 md:py-32 lg:py-40">
        <Reveal className="mx-auto max-w-2xl text-center" distance={26}>
          <div className="flex justify-center">
            <Eyebrow tone="on-band">{eyebrow}</Eyebrow>
          </div>

          <h2 id="community-heading" className="mt-6 text-display-lg text-white">
            {heading}
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-body-lg text-white/85">{body}</p>

          <div className="mt-9 flex justify-center">
            <ArrowLink href={cta.href} tone="on-band">
              {cta.label}
            </ArrowLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
