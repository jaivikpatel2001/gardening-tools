import Link from "next/link";

import { cursorIntent } from "@/components/cursor/cursor-intent";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { Reveal } from "@/components/ui/Reveal";
import { cinematicJournal } from "@/data/variants/cinematic";
import { resources } from "@/data/resources";
import { routes } from "@/lib/routes";

/**
 * Variant 1 resources: a magazine front page. One lead story at full width with
 * its headline set large under the photograph, then the two shorter pieces in a
 * column beside it, separated by rules rather than boxed into cards.
 *
 * Editorial content lives under Resources. There is no blog and no journal
 * route anywhere on this site; "field notes" here is a heading, not a section.
 */
export function MagazineJournal() {
  const { eyebrow, heading, body, cta } = cinematicJournal;
  const [lead, ...rest] = resources;

  return (
    <section aria-labelledby="cinematic-journal" className="bg-surface py-20 lg:py-28">
      <Container>
        <Reveal className="flex flex-col gap-6 border-b border-hairline pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id="cinematic-journal" className="mt-5 text-display-lg text-ink">
              {heading}
            </h2>
          </div>
          <p className="max-w-xs text-body-md text-body md:text-right">{body}</p>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <Link
              href={routes.resource(lead.slug)}
              className="group block"
              {...cursorIntent("open")}
            >
              <ImagePlate
                image={lead.image}
                ratio="16/10"
                sizes="(max-width: 1127px) 92vw, 56vw"
                radius="lg"
              />
              <div className="mt-6 flex items-center gap-3 font-body text-caption-sm uppercase tracking-[0.16em] text-muted">
                {lead.category}
                <span aria-hidden="true" className="h-px w-8 bg-hairline-strong" />
                {lead.readingTime}
              </div>
              <h3 className="mt-4 max-w-[22ch] text-display-sm text-ink transition-colors duration-300 group-hover:text-brand">
                {lead.title}
              </h3>
              <p className="mt-4 max-w-[52ch] text-body-md text-body">{lead.excerpt}</p>
            </Link>
          </Reveal>

          <Reveal as="ul" className="lg:col-span-5" stagger={0.08}>
            {rest.map((resource) => (
              <li key={resource.slug} className="border-t border-hairline first:border-t-0">
                <Link
                  href={routes.resource(resource.slug)}
                  className="group flex gap-5 py-7 first:pt-0"
                  {...cursorIntent("open")}
                >
                  <div className="w-[104px] shrink-0 sm:w-[128px]">
                    <ImagePlate
                      image={resource.image}
                      ratio="1/1"
                      sizes="128px"
                      radius="md"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-body text-caption-sm uppercase tracking-[0.16em] text-muted">
                      {resource.category}
                    </p>
                    <h3 className="mt-2 text-title-lg text-ink transition-colors duration-300 group-hover:text-brand">
                      {resource.title}
                    </h3>
                    <p className="mt-2 font-body text-caption text-muted">{resource.readingTime}</p>
                  </div>
                </Link>
              </li>
            ))}

            <li className="border-t border-hairline pt-7">
              <ArrowLink href={cta.href}>{cta.label}</ArrowLink>
            </li>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
