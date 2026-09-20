import Image from "next/image";

import { IndustryCard } from "@/components/cards/IndustryCard";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { CollectionSection } from "@/components/sections/CollectionSection";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brandMarks, brandWall, industries, industriesSection, partnershipApproach } from "@/data/clients";
import { testimonials } from "@/data/testimonials";

/**
 * The Clients page sections.
 *
 * Clients replaced Resources across the site. This page is the credibility
 * page: who the business supplies, how a supply relationship works, and what
 * customers say about it.
 *
 * Nothing here is fabricated. The brand wall renders only marks the client has
 * supplied, and hides itself entirely while there are none. The testimonials
 * are the project's existing placeholder set, and they are labelled as
 * placeholder copy on the page as well as in the data file, so nobody can
 * mistake them for approved customer statements.
 */

/**
 * The manufacturer brands the business stocks.
 *
 * Third-party trademarks, so each mark is placed rather than treated: contained
 * inside its cell, never cropped or stretched, shown in its own colours and on
 * the white ground it was drawn for, in both themes. The marks are small
 * originals, so the cell caps their height rather than scaling them up into
 * softness.
 */
export function BrandWall() {
  if (brandMarks.length === 0) return null;

  return (
    <Section id="brands" tone="surface" size="lg" labelledBy="brands-heading">
      <Container>
        <Reveal className="max-w-2xl">
          <SectionHeading
            id="brands-heading"
            eyebrow={brandWall.eyebrow}
            title={brandWall.heading}
            description={brandWall.body}
          />
        </Reveal>

        <Reveal
          as="ul"
          stagger={0.05}
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-hairline sm:grid-cols-3 lg:grid-cols-5"
        >
          {brandMarks.map((mark) => (
            <li key={mark.name} className="grid place-items-center bg-white p-6 sm:p-8">
              {/* Unoptimised on purpose. The supplied marks are 160px wide and a
                  few kilobytes each, so re-encoding them gains nothing and the
                  optimiser was serving a 100px rendition that the cell then had
                  to scale back up. This way the exact file the client supplied
                  is what reaches the browser, which is also the right handling
                  for somebody else's trademark. */}
              <Image
                src={mark.image.src}
                alt={mark.image.alt}
                width={160}
                height={85}
                unoptimized
                className="h-auto w-full max-w-[130px] object-contain"
              />
            </li>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}

export function IndustriesServed() {
  return (
    <CollectionSection
      id="industries"
      tone="canvas"
      eyebrow={industriesSection.eyebrow}
      heading={industriesSection.heading}
      description={industriesSection.body}
      items={industries}
      getKey={(industry) => industry.title}
      renderItem={(industry) => <IndustryCard industry={industry} />}
      columns={3}
      stagger={0.07}
    />
  );
}

export function PartnershipApproach() {
  return (
    <Section id="approach" tone="band" size="lg" labelledBy="approach-heading">
      <Container>
        <Reveal className="max-w-2xl">
          <SectionHeading
            id="approach-heading"
            eyebrow={partnershipApproach.eyebrow}
            title={partnershipApproach.heading}
            description={partnershipApproach.body}
            tone="on-band"
          />
        </Reveal>

        <Reveal as="ol" stagger={0.08} className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {partnershipApproach.steps.map((step) => (
            <li key={step.index} className="border-t border-white/20 pt-6">
              <p aria-hidden="true" className="font-heading text-title-lg text-on-band-muted">
                {step.index}
              </p>
              <h3 className="mt-3 text-title-md text-on-band">{step.title}</h3>
              <p className="mt-2 text-body-sm text-on-band-muted">{step.body}</p>
            </li>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}

export function ClientVoices() {
  return (
    <CollectionSection
      id="voices"
      tone="soft"
      eyebrow="In their words"
      heading="What Customers Say"
      description="Placeholder copy while the client collects approved quotes. These are written in the voice of real Indian customers, but none of them is a real customer statement yet."
      items={testimonials}
      getKey={(testimonial) => testimonial.name}
      renderItem={(testimonial) => <TestimonialCard testimonial={testimonial} />}
      columns={3}
      stagger={0.08}
    />
  );
}
