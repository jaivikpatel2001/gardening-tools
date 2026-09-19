import Link from "next/link";

import { cursorIntent } from "@/components/cursor/cursor-intent";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { Reveal } from "@/components/ui/Reveal";
import { catalogueReading } from "@/data/variants/catalogue";
import { resources } from "@/data/resources";
import { routes } from "@/lib/routes";

/**
 * Variant 5 resources: a numbered reading list.
 *
 * Each guide is one ruled line with its category, title, excerpt and reading
 * time, and the photograph for whichever line the reader is on grows in at the
 * end of that line. Short, scannable, and nothing like the magazine and journal
 * layouts the other variants use for the same three pieces.
 *
 * Editorial content belongs under Resources. There is no blog or journal route
 * on this site and none should be added.
 */
export function ReadingList() {
  const { eyebrow, heading, body, cta } = catalogueReading;

  return (
    <section
      id="catalogue-reading"
      aria-labelledby="catalogue-reading-heading"
      className="bg-surface py-20 lg:py-28"
    >
      <Container>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id="catalogue-reading-heading" className="mt-5 text-display-lg text-ink">
              {heading}
            </h2>
          </div>
          <p className="max-w-xs text-body-md text-body md:pb-1 md:text-right">{body}</p>
        </Reveal>

        <Reveal as="ol" className="mt-12 border-t-2 border-ink lg:mt-14" stagger={0.08}>
          {resources.map((resource, index) => (
            <li key={resource.slug} className="border-b border-hairline">
              <Link
                href={routes.resource(resource.slug)}
                className="group grid gap-4 py-7 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-center sm:gap-8 lg:py-8"
                {...cursorIntent("open")}
              >
                <span className="font-heading text-caption font-bold tabular-nums text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-caption-sm uppercase tracking-[0.16em] text-muted">
                    {resource.category}
                    <span aria-hidden="true" className="h-px w-6 bg-hairline-strong" />
                    {resource.readingTime}
                  </span>
                  <span className="mt-2 block font-heading text-title-lg text-ink transition-colors duration-300 group-hover:text-brand lg:text-display-sm">
                    {resource.title}
                  </span>
                  <span className="mt-2 block max-w-[62ch] text-body-sm text-body">{resource.excerpt}</span>
                </span>

                <span className="hidden items-center gap-5 sm:flex">
                  <span className="hidden w-24 overflow-hidden transition-[width] duration-500 ease-[var(--ease-organic)] group-hover:w-40 md:block">
                    <ImagePlate
                      image={resource.image}
                      ratio="4/3"
                      sizes="160px"
                      radius="md"
                    />
                  </span>
                  <ArrowIcon className="h-4 w-4 text-muted transition-all duration-300 ease-[var(--ease-organic)] group-hover:translate-x-1 group-hover:text-brand" />
                </span>
              </Link>
            </li>
          ))}
        </Reveal>

        <Reveal className="mt-10 flex justify-end">
          <ArrowLink href={cta.href}>{cta.label}</ArrowLink>
        </Reveal>
      </Container>
    </section>
  );
}
