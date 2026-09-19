import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { newsletterContent } from "@/data/home";

/**
 * Compact white strip between the CTA and the footer. Kept deliberately short:
 * the page has already made its argument by this point.
 */
export function Newsletter() {
  const { heading, body } = newsletterContent;

  return (
    <Section tone="surface" size="none" labelledBy="newsletter-heading" className="py-14 md:py-16">
      <Container>
        <Reveal className="grid items-center gap-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-16">
          <div>
            <h2 id="newsletter-heading" className="text-display-sm text-ink">
              {heading}
            </h2>
            <p className="mt-3 max-w-md text-body-md text-body">{body}</p>
          </div>

          <NewsletterForm />
        </Reveal>
      </Container>
    </Section>
  );
}
