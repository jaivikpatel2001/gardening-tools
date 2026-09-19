import { Check } from "lucide-react";

import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { aboutContent } from "@/data/home";

export function AboutPreview() {
  const { eyebrow, heading, paragraphs, points, cta, image } = aboutContent;

  return (
    <Section tone="warm" size="lg" labelledBy="about-heading">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <div className="relative">
              <ImagePlate
                image={image}
                ratio="3/4"
                sizes="(max-width: 1127px) 100vw, 46vw"
                zoomOnHover={false}
                className="lg:rounded-tl-organic"
              />
              {/* Small sage plate offset behind the photograph — depth without
                  another shadow tier. */}
              <span
                aria-hidden="true"
                className="absolute -bottom-5 -right-5 -z-10 hidden h-40 w-40 rounded-lg bg-surface-strong lg:block"
              />
            </div>
          </Reveal>

          <Reveal className="order-1 lg:order-2" delay={0.08}>
            <Eyebrow>{eyebrow}</Eyebrow>

            <h2 id="about-heading" className="mt-5 text-display-md text-ink">
              {heading}
            </h2>

            <div className="mt-6 flex flex-col gap-4 text-body-md text-body">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <ul className="mt-7 flex flex-col gap-3.5">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-body-sm text-body">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-surface-strong text-[var(--green-800)]"
                  >
                    <Check className="h-3 w-3" strokeWidth={2.6} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <ArrowLink href={cta.href} className="mt-8">
              {cta.label}
            </ArrowLink>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
