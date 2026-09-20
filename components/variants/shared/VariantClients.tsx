import Link from "next/link";

import { cursorIntent } from "@/components/cursor/cursor-intent";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { industries } from "@/data/clients";
import { variantActions, variantSectionBody, variantSectionCopy, type VariantId } from "@/data/variants/shared";
import { resolveCategories } from "@/lib/catalogue";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";

/**
 * The clients band, for the Home variants.
 *
 * Clients replaced Resources across the site, so the three variant sections
 * that used to preview guides now carry this instead, and the two variants that
 * had no equivalent section gain one. The content is the six kinds of customer
 * the business actually states; the layout is what changes between pages.
 *
 * No client is named and no logo is drawn here. The named logo wall lives on
 * the Clients page and renders only what the client supplies.
 */

type Layout = "spread" | "register" | "wall" | "rail" | "arc";

const LIST_CLASS: Record<Layout, string> = {
  spread: "grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3",
  register: "grid border-t-2 border-ink md:grid-cols-2",
  wall: "grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-3",
  rail: "-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-3 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden",
  arc: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
};

const ITEM_CLASS: Record<Layout, string> = {
  spread: "flex flex-col",
  register: "flex flex-col border-b border-hairline py-7 md:[&:nth-child(even)]:md:border-l md:[&:nth-child(even)]:md:pl-8 md:[&:nth-child(odd)]:md:pr-8",
  wall: "flex flex-col bg-surface p-7",
  rail: "flex w-[78%] shrink-0 snap-start flex-col rounded-lg border border-hairline-soft bg-surface p-6 sm:w-auto",
  arc: "flex flex-col rounded-organic border border-hairline-soft bg-surface p-7",
};

interface VariantClientsProps {
  variant: VariantId;
  layout?: Layout;
  tone?: "canvas" | "surface" | "warm" | "elevated" | "soft";
  id?: string;
}

export function VariantClients({ variant, layout = "spread", tone = "surface", id }: VariantClientsProps) {
  const copy = variantSectionCopy[variant].clients;
  const sectionId = id ?? `variant${variant}-clients`;
  const headingId = `${sectionId}-heading`;

  return (
    <Section id={sectionId} tone={tone} labelledBy={headingId}>
      <Container>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <h2 id={headingId} className="mt-4 text-display-md text-ink">
              {copy.heading}
            </h2>
            <p className="mt-4 text-body-md text-body">{variantSectionBody.clients}</p>
          </div>
          <div className="shrink-0 md:pb-1">
            <ArrowLink href={routes.clients}>{variantActions.clients.label}</ArrowLink>
          </div>
        </Reveal>

        <Reveal as="ul" stagger={0.07} className={cn("mt-12", LIST_CLASS[layout])}>
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <li key={industry.title} className={ITEM_CLASS[layout]}>
                {layout === "register" ? (
                  <p
                    aria-hidden="true"
                    className="font-heading text-caption font-bold tracking-[0.2em] text-brand-soft"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </p>
                ) : (
                  <span
                    aria-hidden="true"
                    className="grid h-11 w-11 place-items-center rounded-full bg-brand/10 text-brand"
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
                  </span>
                )}

                <h3 className="mt-4 text-title-md text-ink">{industry.title}</h3>
                <p className="mt-2 flex-1 text-body-sm text-muted">{industry.description}</p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {resolveCategories(industry.categorySlugs)
                    .slice(0, 3)
                    .map((category) => (
                      <li key={category.slug}>
                        <Link
                          href={routes.productCategory(category.slug)}
                          {...cursorIntent("view")}
                          className="inline-flex rounded-full border border-hairline px-2.5 py-1 text-caption-sm text-body transition-colors duration-200 hover:border-brand hover:text-brand"
                        >
                          {category.shortTitle}
                        </Link>
                      </li>
                    ))}
                </ul>
              </li>
            );
          })}
        </Reveal>
      </Container>
    </Section>
  );
}
