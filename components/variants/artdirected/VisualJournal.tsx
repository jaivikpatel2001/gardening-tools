import Link from "next/link";

import { cursorIntent } from "@/components/cursor/cursor-intent";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { Reveal } from "@/components/ui/Reveal";
import { artJournal } from "@/data/variants/artDirected";
import { resources } from "@/data/resources";
import { routes } from "@/lib/routes";

/**
 * Variant 4 resources: three entries, three completely different shapes.
 *
 * The first runs wide with its headline overlapping the photograph, the second
 * is a narrow column pushed right, the third is a wide strip with the type
 * beside it. A card grid would have made three guides look like three products.
 *
 * Editorial content belongs under Resources. There is no blog or journal route
 * on this site and none should be added.
 */
export function VisualJournal() {
  const { eyebrow, heading, body, cta } = artJournal;
  const [first, second, third] = resources;

  return (
    <section aria-labelledby="art-journal" className="bg-surface py-20 lg:py-28">
      <Container>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id="art-journal" className="mt-5 text-display-lg text-ink">
              {heading}
            </h2>
          </div>
          <p className="max-w-xs text-body-md text-body md:pb-1 md:text-right">{body}</p>
        </Reveal>

        <div className="mt-14 lg:mt-20">
          <Reveal distance={26}>
            <Link
              href={routes.resource(first.slug)}
              className="group relative block"
              {...cursorIntent("open")}
            >
              <ImagePlate
                image={first.image}
                ratio="21/9"
                sizes="(max-width: 1127px) 92vw, 92vw"
                radius="xl"
              />
              {/* The headline steps off the photograph and onto the page. */}
              <div className="relative -mt-8 max-w-[46rem] bg-surface pr-6 pt-6 lg:-mt-16 lg:pr-12 lg:pt-10">
                <p className="font-body text-caption-sm uppercase tracking-[0.16em] text-brand-soft">
                  {first.category}
                </p>
                <h3 className="mt-3 text-display-sm text-ink transition-colors duration-300 group-hover:text-brand">
                  {first.title}
                </h3>
                <p className="mt-4 max-w-[52ch] text-body-md text-body">{first.excerpt}</p>
                <p className="mt-4 font-body text-caption text-muted">{first.readingTime}</p>
              </div>
            </Link>
          </Reveal>

          <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4 lg:col-start-2" distance={26}>
              <Link
                href={routes.resource(second.slug)}
                className="group block"
                {...cursorIntent("open")}
              >
                <p className="font-body text-caption-sm uppercase tracking-[0.16em] text-brand-soft">
                  {second.category}
                </p>
                <h3 className="mt-3 text-title-lg text-ink transition-colors duration-300 group-hover:text-brand">
                  {second.title}
                </h3>
                <p className="mt-4 text-body-sm text-body">{second.excerpt}</p>
                <p className="mt-4 font-body text-caption text-muted">{second.readingTime}</p>
                <div className="mt-6">
                  <ImagePlate
                    image={second.image}
                    ratio="3/4"
                    sizes="(max-width: 1127px) 92vw, 30vw"
                    radius="lg"
                  />
                </div>
              </Link>
            </Reveal>

            <Reveal className="lg:col-span-6 lg:col-start-7 lg:pt-24" distance={26}>
              <Link
                href={routes.resource(third.slug)}
                className="group block"
                {...cursorIntent("open")}
              >
                <ImagePlate
                  image={third.image}
                  ratio="16/10"
                  sizes="(max-width: 1127px) 92vw, 46vw"
                  radius="lg"
                />
                <div className="mt-6">
                  <p className="font-body text-caption-sm uppercase tracking-[0.16em] text-brand-soft">
                    {third.category}
                  </p>
                  <h3 className="mt-3 text-display-sm text-ink transition-colors duration-300 group-hover:text-brand">
                    {third.title}
                  </h3>
                  <p className="mt-4 max-w-[46ch] text-body-md text-body">{third.excerpt}</p>
                  <p className="mt-4 font-body text-caption text-muted">{third.readingTime}</p>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-16 flex justify-center border-t border-hairline pt-8">
          <ArrowLink href={cta.href}>{cta.label}</ArrowLink>
        </Reveal>
      </Container>
    </section>
  );
}
