import Link from "next/link";

import { cursorIntent } from "@/components/cursor/cursor-intent";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { Reveal } from "@/components/ui/Reveal";
import { getHomeCategoryCards } from "@/lib/catalogue";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";
import { cinematicCategories } from "@/data/variants/cinematic";
import type { PhotographedToolCategory } from "@/types/content";

/**
 * Variant 1 categories: a magazine spread rather than a grid of equal cards.
 *
 * One category is given most of the spread and the rest are hung around it at
 * different widths and proportions, so the eye is led instead of scanned. The
 * composition is a table, not hand-placed elements: each slot declares its
 * column, width, ratio and reading order, and the categories fill the slots in
 * catalogue order.
 *
 * Desktop sets two independent columns rather than a row-spanning grid. A
 * spanning lead photograph stretches the rows beside it, which opened large
 * dead gaps between the smaller entries; separate columns let every entry sit
 * directly under the one above. On a phone the column wrappers dissolve
 * (`display: contents`) and the entries stack in catalogue order.
 */
interface Slot {
  column: "left" | "right";
  /** Width and indent inside its column on desktop. */
  className: string;
  ratio: "4/5" | "4/3" | "1/1" | "3/4" | "16/10";
  sizes: string;
  /** Catalogue position, used to keep the phone stack in order. */
  order: string;
  /** The lead slot is typeset larger and keeps its description visible. */
  lead?: boolean;
}

const SLOTS: readonly Slot[] = [
  { column: "left", className: "", ratio: "1/1", sizes: "(max-width: 1127px) 92vw, 58vw", order: "order-1", lead: true },
  { column: "right", className: "", ratio: "4/3", sizes: "(max-width: 1127px) 86vw, 40vw", order: "order-2" },
  { column: "right", className: "lg:ml-auto lg:w-4/5", ratio: "1/1", sizes: "(max-width: 1127px) 86vw, 32vw", order: "order-3" },
  { column: "left", className: "lg:ml-[14%] lg:w-3/5", ratio: "3/4", sizes: "(max-width: 1127px) 86vw, 34vw", order: "order-4" },
  { column: "right", className: "", ratio: "4/3", sizes: "(max-width: 1127px) 92vw, 40vw", order: "order-5" },
];

/** Mobile keeps the asymmetry by indenting alternate entries instead of stacking flush. */
const MOBILE_OFFSET = ["", "ml-8 sm:ml-16", "mr-8 sm:mr-16", "ml-6 sm:ml-12", "mr-4 sm:mr-10"];

function CollageEntry({
  category,
  slot,
  index,
}: {
  category: PhotographedToolCategory;
  slot: Slot;
  index: number;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <Reveal
      as="article"
      distance={26}
      start="top 90%"
      className={cn("group relative lg:order-none lg:mx-0", slot.order, MOBILE_OFFSET[index], slot.className)}
    >
      <Link href={routes.toolCategory(category.slug)} className="block" {...cursorIntent("view")}>
        <ImagePlate image={category.image} ratio={slot.ratio} sizes={slot.sizes} radius="lg">
          <div
            aria-hidden="true"
            className="scrim-caption absolute inset-0 opacity-90 transition-opacity duration-500 group-hover:opacity-100"
          />
          <span aria-hidden="true" className="photo-chip absolute left-4 top-4 lg:left-5 lg:top-5">
            {number}
          </span>
        </ImagePlate>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 lg:p-7">
          <p className="font-body text-caption-sm uppercase tracking-[0.16em] text-white/80">
            {category.group === "hand" ? "Traditional & hand tools" : "Power & garden machinery"}
          </p>
          <h3
            className={cn(
              "mt-2 text-white",
              slot.lead ? "text-display-sm lg:text-display-md" : "text-title-lg",
            )}
          >
            {category.title}
          </h3>
          <p
            className={cn(
              "mt-3 max-w-[34ch] text-body-sm text-white/85 transition-all duration-500 ease-[var(--ease-organic)]",
              slot.lead
                ? "max-w-[44ch]"
                : "hidden lg:block lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100",
            )}
          >
            {category.description}
          </p>
        </div>
      </Link>
    </Reveal>
  );
}

export function EditorialCollage() {
  const categories = getHomeCategoryCards().slice(0, SLOTS.length);
  const { eyebrow, heading, body, cta } = cinematicCategories;

  const entries = categories.map((category, index) => ({ category, slot: SLOTS[index], index }));
  const column = (side: Slot["column"]) =>
    entries
      .filter((entry) => entry.slot.column === side)
      .map((entry) => <CollageEntry key={entry.category.slug} {...entry} />);

  return (
    <section aria-labelledby="cinematic-categories" className="bg-canvas py-20 lg:py-28">
      <Container>
        <Reveal className="flex flex-col gap-8 border-b border-hairline pb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id="cinematic-categories" className="mt-5 text-display-lg text-ink">
              {heading}
            </h2>
          </div>
          <div className="max-w-sm md:pb-1">
            <p className="text-body-md text-body">{body}</p>
            <ArrowLink href={cta.href} className="mt-4">
              {cta.label}
            </ArrowLink>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col gap-10 lg:mt-16 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-8">
          <div className="contents lg:col-span-7 lg:flex lg:flex-col lg:gap-10">{column("left")}</div>
          <div className="contents lg:col-span-5 lg:flex lg:flex-col lg:gap-10 lg:pt-20">{column("right")}</div>
        </div>
      </Container>
    </section>
  );
}
