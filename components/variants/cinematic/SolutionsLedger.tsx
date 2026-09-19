import Link from "next/link";

import { cursorIntent } from "@/components/cursor/cursor-intent";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { Reveal } from "@/components/ui/Reveal";
import { cinematicSolutions } from "@/data/variants/cinematic";
import { services } from "@/data/services";
import { routes } from "@/lib/routes";

/**
 * Variant 1 solutions: a ledger of four entries down the page, with the section
 * heading pinned beside them on desktop.
 *
 * Cards would give four services equal weight and equal silence. Rows let each
 * one carry a full line of explanation, and the small photograph at the end of
 * the row grows on hover instead of a card lifting.
 */
export function SolutionsLedger() {
  const { eyebrow, heading, body } = cinematicSolutions;

  return (
    <section aria-labelledby="cinematic-solutions" className="bg-canvas py-20 lg:py-28">
      <Container className="lg:grid lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id="cinematic-solutions" className="mt-5 text-display-md text-ink">
              {heading}
            </h2>
            <p className="mt-5 max-w-sm text-body-md text-body">{body}</p>
          </div>
        </Reveal>

        <Reveal as="ul" className="mt-12 border-t border-hairline lg:col-span-8 lg:mt-0" stagger={0.07}>
          {services.map((service, index) => (
            <li key={service.slug} className="border-b border-hairline">
              <Link
                href={routes.service(service.slug)}
                className="group flex items-start gap-6 py-8 lg:gap-10 lg:py-10"
                {...cursorIntent("view")}
              >
                <span className="mt-1 font-heading text-caption font-bold tracking-[0.2em] text-brand-soft">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="text-display-sm text-ink transition-colors duration-300 group-hover:text-brand">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-[46ch] text-body-md text-body">{service.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-body text-[0.875rem] font-semibold text-brand">
                    Learn more
                    <ArrowIcon className="transition-transform duration-300 ease-[var(--ease-organic)] group-hover:translate-x-1" />
                  </span>
                </div>

                <div className="hidden w-[120px] shrink-0 transition-all duration-500 ease-[var(--ease-organic)] group-hover:w-[190px] sm:block">
                  <ImagePlate
                    image={service.image}
                    ratio="4/5"
                    sizes="190px"
                    radius="md"
                    className="grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                  />
                </div>
              </Link>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
