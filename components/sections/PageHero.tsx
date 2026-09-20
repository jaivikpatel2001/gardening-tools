import type { ReactNode } from "react";

import { Breadcrumbs, type Crumb } from "@/components/sections/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/types/content";

/**
 * The opening band of every interior page.
 *
 * One component rather than one per page, so About, Products, a product
 * category, Clients and Contact all share the same vertical rhythm, the same
 * breadcrumb placement and the same relationship between eyebrow, heading and
 * supporting copy. Pages differ through `image`, `aside` and their actions, not
 * through a second hero component.
 *
 * The photograph stays inside the container and never runs under the
 * transparent header, per the imagery rules in CLAUDE.md.
 */
export function PageHero({
  eyebrow,
  heading,
  body,
  trail,
  image,
  primaryCta,
  secondaryCta,
  aside,
  meta,
  tone = "warm",
  id = "page-hero",
}: {
  eyebrow: string;
  heading: ReactNode;
  body?: ReactNode;
  trail: readonly Crumb[];
  image?: ImageAsset;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Replaces the photograph when a page wants something else in that column. */
  aside?: ReactNode;
  /** Short label and value pairs set under the copy, ruled off. */
  meta?: readonly { label: string; value: string }[];
  tone?: "canvas" | "surface" | "warm" | "elevated" | "soft";
  id?: string;
}) {
  const headingId = `${id}-heading`;
  const hasColumn = Boolean(image ?? aside);

  return (
    <Section id={id} tone={tone} size="none" labelledBy={headingId} className="pb-16 pt-28 lg:pb-24 lg:pt-36">
      <Container>
        <Reveal>
          <Breadcrumbs trail={trail} />
        </Reveal>

        <div
          className={cn(
            "mt-8 grid gap-10",
            hasColumn && "lg:grid-cols-12 lg:items-center lg:gap-16",
          )}
        >
          <Reveal className={hasColumn ? "lg:col-span-7" : "max-w-3xl"}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 id={headingId} className="mt-5 text-display-xl text-ink">
              {heading}
            </h1>
            {body ? <p className="mt-6 max-w-xl text-body-lg text-body">{body}</p> : null}

            {primaryCta ?? secondaryCta ? (
              <div className="mt-9 flex flex-wrap items-center gap-3">
                {primaryCta ? (
                  <Button href={primaryCta.href} size="lg">
                    {primaryCta.label}
                  </Button>
                ) : null}
                {secondaryCta ? (
                  <Button href={secondaryCta.href} size="lg" variant="secondary">
                    {secondaryCta.label}
                  </Button>
                ) : null}
              </div>
            ) : null}

            {meta && meta.length > 0 ? (
              <dl className="mt-10 grid gap-x-8 gap-y-5 border-t border-hairline pt-7 sm:grid-cols-3">
                {meta.map((entry) => (
                  <div key={entry.label}>
                    <dt className="text-eyebrow uppercase text-muted">{entry.label}</dt>
                    <dd className="mt-1.5 font-heading text-title-md text-ink">{entry.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </Reveal>

          {hasColumn ? (
            <Reveal className="lg:col-span-5">
              {aside ?? (
                <ImagePlate
                  image={image as ImageAsset}
                  ratio="4/5"
                  sizes="(max-width: 1127px) 92vw, 38vw"
                  radius="xl"
                  preload
                  zoomOnHover={false}
                />
              )}
            </Reveal>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
