import Link from "next/link";

import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { catalogueServices } from "@/data/variants/catalogue";
import { services } from "@/data/services";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";

/**
 * Variant 5 services: four printed columns under one heavy rule.
 *
 * The range above is a table and the tools are a framed sheet, so the services
 * take the third catalogue form: text columns divided by vertical hairlines,
 * each with the one line most service pages leave out, who it is actually for.
 */
export function ServiceColumns() {
  const { eyebrow, heading, body, audiences } = catalogueServices;

  return (
    <section
      id="catalogue-services"
      aria-labelledby="catalogue-services-heading"
      className="bg-canvas py-20 lg:py-28"
    >
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id="catalogue-services-heading" className="mt-5 text-display-lg text-ink">
              {heading}
            </h2>
          </div>
          <p className="text-body-md text-body lg:col-span-5 lg:pb-2">{body}</p>
        </Reveal>

        <Reveal
          as="ol"
          className="mt-14 grid border-t-2 border-ink sm:grid-cols-2 lg:mt-16 lg:grid-cols-4"
          stagger={0.08}
        >
          {services.map((service, index) => (
            <li
              key={service.slug}
              // Rules and gutters are chosen per index rather than with
              // nth-child variants: two columns on a tablet and four on a desktop
              // disagree about which items start a row.
              className={cn(
                "border-b border-hairline py-8 lg:border-b-0 lg:px-7 lg:last:pr-0",
                index % 2 === 1 ? "sm:border-l sm:pl-6" : "sm:pr-6",
                index === 0 ? "lg:pl-0" : "lg:border-l",
              )}
            >
              <p aria-hidden="true" className="font-heading text-display-sm font-extrabold tabular-nums text-brand-soft/70">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-5 text-title-lg text-ink">{service.title}</h3>
              <p className="mt-3 text-body-sm text-body">{service.description}</p>

              <p className="mt-5 border-t border-hairline pt-4 font-body text-caption text-muted">
                <span className="font-semibold uppercase tracking-[0.14em] text-ink">For</span>
                <span className="mt-1 block">{audiences[service.slug]}</span>
              </p>

              <Link
                href={routes.service(service.slug)}
                className="group mt-6 inline-flex items-center gap-2 font-body text-[0.875rem] font-semibold text-brand"
              >
                Learn more
                <span className="sr-only">{` about ${service.title}`}</span>
                <ArrowIcon className="transition-transform duration-300 ease-[var(--ease-organic)] group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
