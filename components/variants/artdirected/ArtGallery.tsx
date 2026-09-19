import Link from "next/link";

import { cursorIntent } from "@/components/cursor/cursor-intent";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { Reveal } from "@/components/ui/Reveal";
import { artGallery } from "@/data/variants/artDirected";
import { featuredTools } from "@/data/tools";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";

/**
 * Variant 4 products: four objects, deliberately not photographed the same way
 * twice.
 *
 * Each slot sets its own proportion, position and caption treatment, so the
 * section reads as a gallery hang rather than a product grid. The four slots
 * are declared as data for exactly that reason: the variety is designed once,
 * here, and not improvised per tool.
 */
type Caption = "overlay" | "above" | "side" | "below";

interface Slot {
  className: string;
  ratio: "4/5" | "16/10" | "1/1" | "3/4";
  sizes: string;
  caption: Caption;
}

const SLOTS: readonly Slot[] = [
  {
    className: "lg:col-span-5 lg:row-span-2",
    ratio: "4/5",
    sizes: "(max-width: 1127px) 92vw, 40vw",
    caption: "overlay",
  },
  {
    className: "lg:col-span-6 lg:col-start-7 lg:mt-16",
    ratio: "16/10",
    sizes: "(max-width: 1127px) 92vw, 46vw",
    caption: "above",
  },
  {
    className: "lg:col-span-5 lg:col-start-1 lg:self-center",
    ratio: "1/1",
    sizes: "(max-width: 1127px) 92vw, 20vw",
    caption: "side",
  },
  {
    className: "lg:col-span-5 lg:col-start-7 lg:mt-4",
    ratio: "3/4",
    sizes: "(max-width: 1127px) 92vw, 38vw",
    caption: "below",
  },
];

export function ArtGallery() {
  const { eyebrow, heading, treatments } = artGallery;

  return (
    <section aria-labelledby="art-gallery" className="bg-canvas py-20 lg:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="art-gallery" className="mt-5 text-display-lg text-ink">
            {heading}
          </h2>
        </Reveal>

        <Reveal
          as="ul"
          className="mt-14 flex flex-col gap-14 lg:mt-20 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-16"
          stagger={0.1}
          distance={26}
        >
          {featuredTools.map((tool, index) => {
            const slot = SLOTS[index];
            const treatment = treatments[tool.slug];
            if (!slot) return null;

            const meta = (
              <div className={cn(slot.caption === "side" && "lg:pt-2")}>
                <p className="font-body text-caption-sm uppercase tracking-[0.16em] text-brand-soft">
                  {treatment?.label ?? tool.category}
                </p>
                <h3
                  className={cn(
                    "mt-2 text-ink",
                    slot.caption === "overlay" ? "text-display-sm" : "text-title-lg",
                  )}
                >
                  {tool.name}
                </h3>
                <p className="mt-2 max-w-[38ch] text-body-sm text-body">{tool.description}</p>
                <p className="mt-3 font-body text-caption text-muted">{treatment?.note}</p>
              </div>
            );

            return (
              <li key={tool.slug} className={cn("group", slot.className)}>
                <Link
                  href={routes.tool(tool.categorySlug, tool.slug)}
                  className={cn(
                    "block",
                    // Two equal columns: an `auto` text column takes its full
                    // measure and squeezes the photograph to a thumbnail.
                    slot.caption === "side" && "lg:grid lg:grid-cols-2 lg:items-end lg:gap-6",
                  )}
                  {...cursorIntent("view")}
                >
                  {slot.caption === "above" ? <div className="mb-5">{meta}</div> : null}

                  <div className="relative">
                    <ImagePlate
                      image={tool.image}
                      ratio={slot.ratio}
                      sizes={slot.sizes}
                      radius="lg"
                    />

                    <span
                      aria-hidden="true"
                      className="photo-chip absolute right-4 top-4"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {slot.caption === "overlay" ? (
                      <div className="scrim-caption absolute inset-x-0 bottom-0 rounded-b-lg p-6 pt-20 lg:p-8 lg:pt-28">
                        <p className="font-body text-caption-sm uppercase tracking-[0.16em] text-white/80">
                          {treatment?.label ?? tool.category}
                        </p>
                        <h3 className="mt-2 text-display-sm text-white">{tool.name}</h3>
                        <p className="mt-2 max-w-[36ch] text-body-sm text-white/85">
                          {tool.description}
                        </p>
                      </div>
                    ) : null}
                  </div>

                  {slot.caption === "below" ? (
                    <div className="mt-5 lg:text-right">{meta}</div>
                  ) : null}
                  {slot.caption === "side" ? <div className="mt-5 lg:mt-0">{meta}</div> : null}
                </Link>
              </li>
            );
          })}
        </Reveal>

        <Reveal className="mt-16 flex justify-end border-t border-hairline pt-8">
          <ArrowLink href={routes.tools}>Browse the range</ArrowLink>
        </Reveal>
      </Container>
    </section>
  );
}
