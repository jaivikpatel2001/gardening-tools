import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { TrustCounters, type CounterStat } from "@/components/variants/interactive/TrustCounters";
import { site } from "@/config/site";
import { interactiveTrust } from "@/data/variants/interactive";
import { getGroupedCategories } from "@/lib/catalogue";

/**
 * Server binding for the counted statistics.
 *
 * Every figure is derived, never typed: the years come from the founding year
 * in `config/site.ts`, the category and tool counts from the catalogue itself.
 * A number on a page that nobody maintains is a number that goes stale, and
 * these are the only figures variant 2 puts in front of a reader.
 *
 * The one deep band on this variant: the figures are its proof point, so they
 * get the weight, and the page closes on a light surface above the footer.
 */
export function InteractiveTrust() {
  const { eyebrow, heading, labels, statement } = interactiveTrust;

  const groups = getGroupedCategories();
  const categories = groups.flatMap((group) => group.categories);
  const toolTypes = categories.reduce((total, category) => total + category.tools.length, 0);
  const years = new Date().getFullYear() - Number(site.founded);

  const stats: CounterStat[] = [
    { key: "years", value: years, suffix: "+", label: labels.years },
    { key: "categories", value: categories.length, label: labels.categories },
    { key: "toolTypes", value: toolTypes, suffix: "+", label: labels.toolTypes },
  ];

  return (
    <section aria-labelledby="interactive-trust" className="bg-band py-20 text-on-band lg:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow tone="on-band">{eyebrow}</Eyebrow>
          <h2 id="interactive-trust" className="mt-5 text-display-md text-on-band">
            {heading}
          </h2>
        </Reveal>

        <Reveal className="mt-12 lg:mt-16" distance={24}>
          <TrustCounters stats={stats} statement={statement} />
        </Reveal>
      </Container>
    </section>
  );
}
