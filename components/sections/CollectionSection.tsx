import type { ReactNode } from "react";

import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

/**
 * One section shell for every "heading plus grid of cards" block on the site.
 *
 * Tool categories, featured tools, services, resources and testimonials were
 * five near-identical components differing only in tone, column count and which
 * card they rendered. They are now five calls to this one, so a spacing or
 * reveal-timing change is made once, and the same block drops onto the Tools,
 * Services and Resources pages without being rewritten.
 *
 * It is extended through composition rather than new variants: `trailing`
 * appends a non-item cell to the grid, and `footer` renders below it.
 *
 * Generic over the item type, so the card component and its data stay strictly
 * typed at the call site.
 */

type Tone = "canvas" | "surface" | "warm" | "elevated" | "soft";

const COLUMN_CLASS = {
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

const GAP_CLASS = {
  /** Bordered cards that carry their own padding. */
  cards: "gap-6",
  /** Borderless editorial cards where the image needs more air around it. */
  editorial: "gap-x-6 gap-y-10 lg:gap-x-8 lg:gap-y-12",
} as const;

/**
 * Behaviour below the 744px tablet breakpoint. From 744px up, both are grids.
 *
 * `scroll` turns the cards into a swipeable row with the next card peeking in,
 * which is the design system's collapsing strategy for visual category cards.
 * Every utility that competes with a grid utility is paired with an `sm:`
 * variant rather than overridden, so Tailwind's sort order cannot flip it.
 */
const MOBILE_LAYOUT = {
  stack: {
    list: "grid",
    item: "flex",
  },
  scroll: {
    list:
      "-mx-4 flex snap-x snap-mandatory overflow-x-auto scroll-px-4 px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden " +
      "sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0",
    item: "flex w-[82%] shrink-0 snap-start sm:w-auto sm:shrink",
  },
} as const;

interface CollectionSectionProps<T> {
  /** Section anchor, and the prefix for the heading id that `aria-labelledby` points at. */
  id: string;
  tone?: Tone;
  eyebrow: string;
  heading: string;
  description?: string;
  /** Optional link rendered beside the heading on desktop. */
  cta?: { label: string; href: string };
  align?: "start" | "center";
  items: readonly T[];
  /** Stable list key for an item. */
  getKey: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  /** A final grid cell that is not one of `items`, such as a teaser card. */
  trailing?: ReactNode;
  /** Content rendered below the grid, inside the same section. */
  footer?: ReactNode;
  columns?: keyof typeof COLUMN_CLASS;
  gap?: keyof typeof GAP_CLASS;
  mobileLayout?: keyof typeof MOBILE_LAYOUT;
  /** Seconds between each card's reveal. */
  stagger?: number;
  className?: string;
}

export function CollectionSection<T>({
  id,
  tone = "canvas",
  eyebrow,
  heading,
  description,
  cta,
  align = "start",
  items,
  getKey,
  renderItem,
  trailing,
  footer,
  columns = 3,
  gap = "cards",
  mobileLayout = "stack",
  stagger = 0.06,
  className,
}: CollectionSectionProps<T>) {
  const headingId = `${id}-heading`;
  const layout = MOBILE_LAYOUT[mobileLayout];

  return (
    <Section id={id} tone={tone} size="lg" labelledBy={headingId} className={cn("scroll-mt-16", className)}>
      <Container>
        <Reveal>
          <SectionHeading
            id={headingId}
            eyebrow={eyebrow}
            title={heading}
            description={description}
            align={align}
            action={cta ? <ArrowLink href={cta.href}>{cta.label}</ArrowLink> : undefined}
          />
        </Reveal>

        <Reveal
          as="ul"
          stagger={stagger}
          className={cn("mt-12", layout.list, COLUMN_CLASS[columns], GAP_CLASS[gap])}
        >
          {items.map((item) => (
            <li key={getKey(item)} className={layout.item}>
              {renderItem(item)}
            </li>
          ))}
          {trailing ? <li className={layout.item}>{trailing}</li> : null}
        </Reveal>

        {footer}
      </Container>
    </Section>
  );
}
