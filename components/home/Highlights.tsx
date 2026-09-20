import { HighlightsBand } from "@/components/sections/HighlightsBand";
import { highlightsContent } from "@/data/home";
import { getHighlights } from "@/lib/highlights";

/**
 * Home binding for the highlights band. Sits between the solutions and clients
 * sections, where it turns "we are experienced" into four figures a reader can
 * check against the rest of the page.
 */
export function Highlights() {
  return (
    <HighlightsBand
      eyebrow={highlightsContent.eyebrow}
      heading={highlightsContent.heading}
      description={highlightsContent.body}
      items={getHighlights()}
      tone="warm"
      layout="grid"
    />
  );
}
