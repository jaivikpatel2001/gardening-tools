import Image from "next/image";

import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { communityContent } from "@/data/home";
import { variantSectionBody, variantSectionCopy, type VariantId } from "@/data/variants/shared";

/**
 * The community band, for the Home variants.
 *
 * The live Home page carries one photographic statement about why any of this
 * matters. Two settings here: the same full-bleed treatment with the deep-green
 * scrim the design system requires under type on photography, or a plate layout
 * that keeps the text off the image entirely for pages that already have a
 * photographic band.
 */

type Layout = "photo" | "plate";

interface VariantCommunityProps {
  variant: VariantId;
  layout?: Layout;
  /** Plate layout only. The photo layout carries its own deep-green ground. */
  tone?: "canvas" | "surface" | "warm" | "elevated" | "soft";
  id?: string;
}

export function VariantCommunity({ variant, layout = "photo", tone = "soft", id }: VariantCommunityProps) {
  const copy = variantSectionCopy[variant].community;
  const sectionId = id ?? `variant${variant}-community`;
  const headingId = `${sectionId}-heading`;

  if (layout === "plate") {
    return (
      <Section id={sectionId} tone={tone} labelledBy={headingId}>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
            <Reveal className="lg:col-span-5">
              <Eyebrow>{copy.eyebrow}</Eyebrow>
              <h2 id={headingId} className="mt-4 text-display-md text-ink">
                {copy.heading}
              </h2>
              <p className="mt-5 text-body-md text-body">{communityContent.body}</p>
              <p className="mt-4 text-body-sm text-muted">{variantSectionBody.community}</p>
              <ArrowLink href={communityContent.cta.href} className="mt-7">
                {communityContent.cta.label}
              </ArrowLink>
            </Reveal>

            <Reveal className="lg:col-span-7">
              <ImagePlate
                image={communityContent.image}
                ratio="16/10"
                sizes="(max-width: 1127px) 92vw, 54vw"
                radius="xl"
              />
            </Reveal>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <section
      id={sectionId}
      aria-labelledby={headingId}
      className="relative isolate overflow-hidden bg-[var(--green-800)]"
    >
      <Image
        src={communityContent.image.src}
        alt={communityContent.image.alt}
        fill
        sizes="100vw"
        quality={80}
        className="-z-10 object-cover"
      />
      {/* Two scrim layers, as on the live Home page: a flat wash for overall
          contrast and a vertical gradient so the copy sits on the darkest part
          of the frame. Type never lands on an unscrimmed photograph. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[var(--green-800)]/72" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--green-800)]/45 via-transparent to-[var(--green-800)]/60"
      />

      <Container className="py-24 md:py-28 lg:py-32">
        <Reveal className="max-w-2xl" distance={26}>
          <Eyebrow tone="on-band">{copy.eyebrow}</Eyebrow>
          <h2 id={headingId} className="mt-5 text-display-lg text-white">
            {copy.heading}
          </h2>
          <p className="mt-5 max-w-xl text-body-lg text-white/85">{communityContent.body}</p>
          <p className="mt-4 max-w-xl text-body-sm text-white/70">{variantSectionBody.community}</p>
          <ArrowLink href={communityContent.cta.href} tone="on-band" className="mt-8">
            {communityContent.cta.label}
          </ArrowLink>
        </Reveal>
      </Container>
    </section>
  );
}
