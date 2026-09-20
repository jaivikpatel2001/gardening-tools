import type { CSSProperties } from "react";

import { LazyGardenPathScene } from "@/components/not-found/LazyGardenPathScene";
import { SceneParallax } from "@/components/not-found/SceneParallax";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { notFoundContent } from "@/data/notFound";
import { cn } from "@/lib/cn";
import { visibleLinks } from "@/lib/visibility";

import styles from "./NotFound.module.css";

const delay = (milliseconds: number) => ({ "--delay": `${milliseconds}ms` }) as CSSProperties;

/**
 * The 404 page body. A server component: the client code is the pointer parallax
 * on the illustration, the magnetic primary button, and the illustration itself,
 * which loads in the browser so it stays out of every other page payload.
 *
 * Copy first, illustration second in source order, so on a phone the way home
 * is the first thing a lost visitor sees.
 */
export function NotFoundView() {
  const { eyebrow, heading, body, primaryCta, secondaryCta, trailLabel, links } = notFoundContent;

  // The recovery links point at interior pages, and those are released one at a
  // time. A link to a page that is still withdrawn would land straight back on
  // this one, so the same filter the header and the footer use applies here.
  const trail = visibleLinks(links);
  const [secondary] = visibleLinks([secondaryCta]);

  return (
    <section aria-labelledby="not-found-heading" className="relative isolate overflow-hidden bg-canvas">
      <div className="container-page grid min-h-[min(100svh,900px)] items-center gap-12 pb-20 pt-28 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 lg:pt-32">
        <div className="max-w-xl">
          <div className={styles.enter} style={delay(60)}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>

          <h1
            id="not-found-heading"
            className={cn("mt-6 text-display-lg text-ink", styles.enter)}
            style={delay(140)}
          >
            {heading}
          </h1>

          <p className={cn("mt-6 max-w-md text-body-lg text-body", styles.enter)} style={delay(240)}>
            {body}
          </p>

          <div className={cn("mt-9 flex flex-wrap items-center gap-3", styles.enter)} style={delay(340)}>
            <MagneticButton>
              <Button href={primaryCta.href} size="lg">
                {primaryCta.label}
                <ArrowIcon />
              </Button>
            </MagneticButton>

            {secondary ? (
              <Button href={secondary.href} variant="secondary" size="lg">
                {secondary.label}
              </Button>
            ) : null}
          </div>

          {trail.length > 0 ? (
            <nav
              aria-label="Helpful links"
              className={cn("mt-12 border-t border-hairline pt-6", styles.enter)}
              style={delay(440)}
            >
              <p className="text-eyebrow uppercase text-muted">{trailLabel}</p>
              <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
                {trail.map((link) => (
                  <li key={link.href}>
                    <ArrowLink href={link.href}>{link.label}</ArrowLink>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>

        <SceneParallax
          className={cn("relative mx-auto w-full max-w-[440px] sm:max-w-[560px] lg:max-w-[600px]", styles.enter)}
          style={delay(200)}
        >
          <LazyGardenPathScene />
        </SceneParallax>
      </div>
    </section>
  );
}
