import { SolutionCard } from "@/components/cards/SolutionCard";
import { CollectionSection } from "@/components/sections/CollectionSection";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  aboutIntroduction,
  brandStory,
  brandValues,
  capability,
  indianFocus,
  missionVision,
  productPhilosophy,
} from "@/data/about";
import { solutions } from "@/data/solutions";

/**
 * The About page sections.
 *
 * Grouped in one file for the same reason the Home collections are: they are
 * bindings of copy to the shared shells, not components with behaviour of their
 * own. Every one of them reads from `data/about.ts`, so a copy change never
 * touches a component.
 *
 * The page has its own visual identity through its rhythm, which is more
 * text-led than Home: ruled chapters, a two-panel statement, a values grid and
 * one photographic band, rather than Home's alternating card grids.
 */

export function AboutIntroduction() {
  return (
    <Section id="introduction" tone="surface" size="lg" labelledBy="introduction-heading">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow>{aboutIntroduction.eyebrow}</Eyebrow>
            <h2 id="introduction-heading" className="mt-4 text-display-md text-ink">
              {aboutIntroduction.heading}
            </h2>

            <ul className="mt-8 flex flex-col gap-3 border-t border-hairline pt-6">
              {aboutIntroduction.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-body-sm text-body">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="flex flex-col gap-5 lg:col-span-7">
            {aboutIntroduction.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 28)}
                className={index === 0 ? "text-body-lg text-ink" : "text-body-md text-body"}
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

export function BrandStory() {
  return (
    <Section id="story" tone="canvas" size="lg" labelledBy="story-heading">
      <Container>
        <Reveal className="max-w-2xl">
          <SectionHeading
            id="story-heading"
            eyebrow={brandStory.eyebrow}
            title={brandStory.heading}
            description={brandStory.body}
          />
        </Reveal>

        <Reveal as="ol" stagger={0.08} className="mt-12 border-t border-hairline">
          {brandStory.chapters.map((chapter) => (
            <li
              key={chapter.index}
              className="flex flex-col gap-3 border-b border-hairline py-8 lg:flex-row lg:gap-14"
            >
              <p
                aria-hidden="true"
                className="font-heading text-display-sm leading-none text-brand-soft lg:w-28 lg:shrink-0"
              >
                {chapter.index}
              </p>
              <div className="min-w-0">
                <h3 className="text-title-lg text-ink">{chapter.title}</h3>
                <p className="mt-3 max-w-[62ch] text-body-md text-body">{chapter.body}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}

export function MissionVision() {
  return (
    <Section id="mission" tone="band" size="lg" labelledBy="mission-heading">
      <Container>
        <h2 id="mission-heading" className="sr-only">
          Mission and vision
        </h2>

        <Reveal as="ul" stagger={0.1} className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {missionVision.map((entry) => (
            <li key={entry.key} className="border-t border-white/20 pt-8">
              <Eyebrow tone="on-band">{entry.eyebrow}</Eyebrow>
              <h3 className="mt-4 text-display-sm text-on-band">{entry.title}</h3>
              <p className="mt-4 max-w-[52ch] text-body-md text-on-band-muted">{entry.body}</p>
            </li>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}

export function BrandValues() {
  return (
    <Section id="values" tone="canvas" size="lg" labelledBy="values-heading">
      <Container>
        <Reveal>
          <SectionHeading
            id="values-heading"
            eyebrow="What we hold to"
            title="Four Things We Will Not Trade Away"
            description="They are not slogans. Each one costs us something, which is how you can tell they are real."
          />
        </Reveal>

        <Reveal as="ul" stagger={0.07} className="mt-12 grid gap-6 sm:grid-cols-2">
          {brandValues.map((value) => {
            const Icon = value.icon;
            return (
              <li
                key={value.title}
                className="flex flex-col rounded-lg border border-hairline-soft bg-surface p-7"
              >
                <span
                  aria-hidden="true"
                  className="grid h-12 w-12 place-items-center rounded-full bg-brand/10 text-brand"
                >
                  <Icon className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <h3 className="mt-5 text-title-lg text-ink">{value.title}</h3>
                <p className="mt-2 text-body-sm text-body">{value.body}</p>
              </li>
            );
          })}
        </Reveal>
      </Container>
    </Section>
  );
}

export function ProductPhilosophy() {
  return (
    <Section id="philosophy" tone="surface" size="lg" labelledBy="philosophy-heading">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                id="philosophy-heading"
                eyebrow={productPhilosophy.eyebrow}
                title={productPhilosophy.heading}
                description={productPhilosophy.body}
              />
            </div>
          </Reveal>

          <Reveal as="ol" stagger={0.08} className="border-t border-hairline lg:col-span-7">
            {productPhilosophy.checks.map((check) => (
              <li key={check.index} className="border-b border-hairline py-7">
                <div className="flex items-baseline gap-5">
                  <p aria-hidden="true" className="font-heading text-title-md text-brand-soft">
                    {check.index}
                  </p>
                  <div className="min-w-0">
                    <h3 className="text-title-lg text-ink">{check.title}</h3>
                    <p className="mt-2 max-w-[58ch] text-body-sm text-body">{check.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

export function Capability() {
  return (
    <Section id="capability" tone="elevated" size="lg" labelledBy="capability-heading">
      <Container>
        <Reveal className="max-w-2xl">
          <SectionHeading
            id="capability-heading"
            eyebrow={capability.eyebrow}
            title={capability.heading}
            description={capability.body}
          />
        </Reveal>

        <Reveal as="ul" stagger={0.07} className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {capability.items.map((item) => (
            <li key={item.title} className="border-t border-hairline pt-6">
              <h3 className="text-title-md text-ink">{item.title}</h3>
              <p className="mt-2 text-body-sm text-muted">{item.body}</p>
            </li>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}

export function IndianFocus() {
  return (
    <Section id="india" tone="soft" size="lg" labelledBy="india-heading">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="lg:col-span-6">
            <SectionHeading
              id="india-heading"
              eyebrow={indianFocus.eyebrow}
              title={indianFocus.heading}
              description={indianFocus.body}
            />

            <ul className="mt-9 grid gap-6 sm:grid-cols-2">
              {indianFocus.points.map((point) => (
                <li key={point.title} className="border-t border-hairline pt-5">
                  <h3 className="text-title-sm text-ink">{point.title}</h3>
                  <p className="mt-2 text-body-sm text-muted">{point.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="lg:col-span-6">
            <ImagePlate
              image={indianFocus.image}
              ratio="4/5"
              sizes="(max-width: 1127px) 92vw, 46vw"
              radius="xl"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/**
 * The service content that would otherwise have needed a Services page. It sits
 * here, on About, because "what we do besides supplying products" is a claim
 * about the company rather than a product listing.
 */
export function AboutSolutions() {
  return (
    <CollectionSection
      id="what-we-do"
      tone="canvas"
      eyebrow="What we do"
      heading="More Than Just Supplying Products"
      description="Four kinds of help, from choosing a first khurpi to specifying a season of machinery for a crew."
      align="center"
      items={solutions}
      getKey={(solution) => solution.slug}
      renderItem={(solution) => <SolutionCard solution={solution} />}
      columns={4}
      stagger={0.07}
    />
  );
}
