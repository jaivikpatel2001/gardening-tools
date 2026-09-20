import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import type { Highlight } from "@/types/content";

/**
 * The stats and highlights band, in four different shapes.
 *
 * One component rather than five, because the figures never change between
 * pages: only the way they are set does. Home and the variants each pick a
 * layout, which is what keeps the content identical across every design while
 * the page still looks like its own thing.
 *
 * `tone="band"` inverts the palette; the layout maps below never set a colour
 * directly, so a tone change cannot leave a figure unreadable.
 */

type Layout = "grid" | "ledger" | "inline" | "column";

interface HighlightsBandProps {
  id?: string;
  eyebrow: string;
  heading?: string;
  description?: string;
  items: readonly Highlight[];
  tone?: "canvas" | "surface" | "warm" | "elevated" | "soft" | "band" | "band-soft";
  layout?: Layout;
  className?: string;
}

const LIST_CLASS: Record<Layout, string> = {
  grid: "mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4",
  ledger: "mt-12 grid gap-0 border-t border-current/15 lg:grid-cols-2",
  inline: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
  column: "mt-12 flex flex-col gap-0 border-t border-current/15",
};

const ITEM_CLASS: Record<Layout, string> = {
  grid: "flex flex-col",
  ledger: "flex items-baseline gap-5 border-b border-current/15 py-6 lg:[&:nth-child(odd)]:lg:pr-10",
  inline: "flex flex-col border-l border-current/15 pl-5",
  column: "flex flex-col gap-2 border-b border-current/15 py-7 sm:flex-row sm:items-baseline sm:gap-8",
};

const VALUE_CLASS: Record<Layout, string> = {
  grid: "font-heading text-display-md leading-none",
  ledger: "font-heading text-display-sm leading-none",
  inline: "font-heading text-title-lg leading-none",
  column: "font-heading text-display-sm leading-none sm:w-48 sm:shrink-0",
};

export function HighlightsBand({
  id = "highlights",
  eyebrow,
  heading,
  description,
  items,
  tone = "warm",
  layout = "grid",
  className,
}: HighlightsBandProps) {
  const headingId = `${id}-heading`;
  const onBand = tone === "band" || tone === "band-soft";

  return (
    <Section id={id} tone={tone} labelledBy={heading ? headingId : undefined} className={className}>
      <Container>
        {heading ? (
          <Reveal>
            <SectionHeading
              id={headingId}
              eyebrow={eyebrow}
              title={heading}
              description={description}
              tone={onBand ? "on-band" : "default"}
            />
          </Reveal>
        ) : null}

        <Reveal as="ul" stagger={0.07} className={LIST_CLASS[layout]}>
          {items.map((item) => (
            <li key={item.label} className={ITEM_CLASS[layout]}>
              <p className={cn(VALUE_CLASS[layout], onBand ? "text-on-band" : "text-brand")}>
                {item.value}
              </p>
              <div className={layout === "ledger" || layout === "column" ? "min-w-0" : "mt-3"}>
                <p
                  className={cn(
                    "font-body text-[0.9375rem] font-semibold",
                    onBand ? "text-on-band" : "text-ink",
                  )}
                >
                  {item.label}
                </p>
                <p className={cn("mt-1 text-body-sm", onBand ? "text-on-band-muted" : "text-muted")}>
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
