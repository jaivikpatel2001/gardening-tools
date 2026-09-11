import Link from "next/link";
import type { ReactNode } from "react";

import { cursorIntent } from "@/components/cursor/cursor-intent";
import { ArrowLink } from "@/components/ui/ArrowLink";

interface RangeTeaserCardProps {
  eyebrow: string;
  title: string;
  /** Short labels listed as chips, for example the machinery categories. */
  items: readonly string[];
  cta: { label: string; href: string };
}

const CARD_CLASS =
  "group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-lg bg-band p-6 text-on-band " +
  "outline-offset-4 transition-transform duration-300 ease-[var(--ease-organic)] hover:-translate-y-1 sm:p-7";

/**
 * A typographic card that sits in an image-card grid and points somewhere with
 * more depth: on Home, from the photographed hand-tool categories to the
 * machinery half of the range.
 *
 * Deliberately photograph-free, so it reads as a signpost rather than as a
 * category with a missing image. In-page anchors render a plain `<a>` so smooth
 * scrolling handles them; routes use `Link`.
 */
export function RangeTeaserCard({ eyebrow, title, items, cta }: RangeTeaserCardProps) {
  const content: ReactNode = (
    <>
      <div>
        <p className="text-eyebrow uppercase text-on-band-muted">{eyebrow}</p>
        <h3 className="mt-3 text-title-lg text-on-band">{title}</h3>

        <ul className="mt-6 flex flex-wrap gap-2">
          {items.map((item) => (
            <li
              key={item}
              className="rounded-full border border-white/20 px-3 py-1 text-caption text-on-band-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <ArrowLink asText tone="on-band" className="mt-8">
        {cta.label}
      </ArrowLink>
    </>
  );

  if (cta.href.startsWith("#")) {
    return (
      <a href={cta.href} {...cursorIntent("explore")} className={CARD_CLASS}>
        {content}
      </a>
    );
  }

  return (
    <Link href={cta.href} {...cursorIntent("explore")} className={CARD_CLASS}>
      {content}
    </Link>
  );
}
