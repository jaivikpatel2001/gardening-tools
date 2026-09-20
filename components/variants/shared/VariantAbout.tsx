import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { aboutContent } from "@/data/home";
import { variantActions, variantSectionBody, variantSectionCopy, type VariantId } from "@/data/variants/shared";
import { cn } from "@/lib/cn";

/**
 * The about band, for the Home variants that had no introduction of their own.
 *
 * Reads the same paragraphs and the same photograph as the live Home page, so
 * the company is described once and only the arrangement differs.
 */

type Layout = "split" | "statement";

interface VariantAboutProps {
  variant: VariantId;
  layout?: Layout;
  tone?: "canvas" | "surface" | "warm" | "elevated" | "soft";
  id?: string;
}

export function VariantAbout({ variant, layout = "split", tone = "warm", id }: VariantAboutProps) {
  const copy = variantSectionCopy[variant].about;
  const sectionId = id ?? `variant${variant}-about`;
  const headingId = `${sectionId}-heading`;

  return (
    <Section id={sectionId} tone={tone} labelledBy={headingId}>
      <Container>
        <div
          className={cn(
            "grid gap-10",
            layout === "split" ? "lg:grid-cols-12 lg:items-center lg:gap-16" : "lg:gap-14",
          )}
        >
          <Reveal className={layout === "split" ? "lg:col-span-6" : "max-w-3xl"}>
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <h2 id={headingId} className="mt-4 text-display-md text-ink">
              {copy.heading}
            </h2>
            <p className="mt-5 text-body-md text-body">{variantSectionBody.about}</p>

            <div className="mt-6 flex flex-col gap-4">
              {aboutContent.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-body-sm text-muted">
                  {paragraph}
                </p>
              ))}
            </div>

            <ul className="mt-7 flex flex-col gap-3 border-t border-hairline pt-6">
              {aboutContent.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-body-sm text-body">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {point}
                </li>
              ))}
            </ul>

            <ArrowLink href={variantActions.about.href} className="mt-7">
              {variantActions.about.label}
            </ArrowLink>
          </Reveal>

          <Reveal className={layout === "split" ? "lg:col-span-6" : ""}>
            <ImagePlate
              image={aboutContent.image}
              ratio={layout === "split" ? "4/5" : "21/9"}
              sizes="(max-width: 1127px) 92vw, 46vw"
              radius="xl"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
