import Link from "next/link";

import { cursorIntent } from "@/components/cursor/cursor-intent";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { Reveal } from "@/components/ui/Reveal";
import { catalogueSpecimens } from "@/data/variants/catalogue";
import { featuredTools } from "@/data/tools";
import { routes } from "@/lib/routes";

/**
 * Variant 5 products: a specimen sheet.
 *
 * Four ruled cells sharing one frame, each holding a plate, a name and three
 * lines of specification, the way a trade catalogue lays out a page of tools.
 * The frame is drawn by a one-pixel gap over a hairline background, so the rules
 * between cells are always exactly one pixel whatever the grid does.
 */
export function SpecimenBoard() {
  const { eyebrow, heading, body, specs } = catalogueSpecimens;

  return (
    <section
      id="catalogue-specimens"
      aria-labelledby="catalogue-specimens-heading"
      className="bg-surface-warm py-20 lg:py-28"
    >
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id="catalogue-specimens-heading" className="mt-5 text-display-lg text-ink">
              {heading}
            </h2>
          </div>
          <p className="text-body-md text-body lg:col-span-5 lg:pb-2">{body}</p>
        </Reveal>

        <Reveal
          as="ul"
          className="mt-14 grid gap-px border border-hairline bg-hairline lg:mt-16 lg:grid-cols-2"
          stagger={0.08}
        >
          {featuredTools.map((tool, index) => (
            <li key={tool.slug} className="bg-surface-warm">
              <Link
                href={routes.tool(tool.categorySlug, tool.slug)}
                className="group grid h-full gap-6 p-5 transition-colors duration-300 hover:bg-surface-elevated sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:p-6 lg:p-8"
                {...cursorIntent("view")}
              >
                <ImagePlate
                  image={tool.image}
                  ratio="1/1"
                  sizes="(max-width: 743px) 90vw, 240px"
                  radius="md"
                />

                <div className="flex min-w-0 flex-col">
                  <p className="flex items-center justify-between gap-4 font-body text-caption-sm uppercase tracking-[0.16em] text-muted">
                    <span>{tool.category}</span>
                    <span className="tabular-nums">{`Plate ${String(index + 2).padStart(2, "0")}`}</span>
                  </p>

                  <h3 className="mt-3 text-title-lg text-ink transition-colors duration-300 group-hover:text-brand">
                    {tool.name}
                  </h3>
                  <p className="mt-2 text-body-sm text-body">{tool.description}</p>

                  <dl className="mt-5 border-t border-hairline">
                    {(specs[tool.slug] ?? []).map((spec) => (
                      <div
                        key={spec.label}
                        className="flex items-baseline justify-between gap-4 border-b border-hairline py-2"
                      >
                        <dt className="font-body text-caption text-muted">{spec.label}</dt>
                        <dd className="text-right font-body text-caption font-semibold text-ink">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <span className="mt-5 inline-flex items-center gap-2 font-body text-[0.875rem] font-semibold text-brand sm:mt-auto sm:pt-5">
                    View this tool
                    <ArrowIcon className="transition-transform duration-300 ease-[var(--ease-organic)] group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
