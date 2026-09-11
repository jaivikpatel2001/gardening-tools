import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { benefits } from "@/data/benefits";
import { whyChooseContent } from "@/data/home";

/**
 * Split layout with a sticky photograph. The image holds while the four numbered
 * benefits scroll past it, which reads as one continuous argument rather than
 * four disconnected claims.
 */
export function WhyChooseUs() {
  const { eyebrow, heading, body, image } = whyChooseContent;

  return (
    <Section tone="soft" size="lg" labelledBy="why-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
              <h2 id="why-heading" className="mt-5 max-w-lg text-display-md text-ink">
                {heading}
              </h2>
              <p className="mt-5 max-w-md text-body-md text-body">{body}</p>
            </Reveal>

            <Reveal as="ol" stagger={0.08} className="mt-12 flex flex-col">
              {benefits.map((benefit) => (
                <li
                  key={benefit.index}
                  className="flex gap-5 border-t border-hairline py-6 last:border-b"
                >
                  <span
                    aria-hidden="true"
                    className="font-heading text-[0.8125rem] font-bold tabular-nums text-brand-soft"
                  >
                    {benefit.index}
                  </span>
                  <div>
                    <h3 className="text-title-md text-ink">{benefit.title}</h3>
                    <p className="mt-2 max-w-md text-body-sm text-muted">{benefit.description}</p>
                  </div>
                </li>
              ))}
            </Reveal>
          </div>

          <Reveal className="hidden lg:block">
            <div className="sticky top-28">
              <ImagePlate
                image={image}
                ratio="3/4"
                sizes="44vw"
                zoomOnHover={false}
                className="rounded-br-[clamp(48px,6vw,110px)]"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
