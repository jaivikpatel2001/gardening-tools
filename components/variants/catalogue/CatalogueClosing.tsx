import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollLines } from "@/components/variants/shared/ScrollLines";
import { site } from "@/config/site";
import { catalogueClosing } from "@/data/variants/catalogue";

/**
 * Variant 5 closing: the enquiry page and the colophon.
 *
 * A catalogue ends with the order form and the address block. This one ends
 * with the enquiry and the same four contact facts the footer carries, set as a
 * ruled colophon inside a single framed page. It stays on cream: this variant
 * has no dark section at all before the footer.
 */
export function CatalogueClosing() {
  const { eyebrow, heading, body, primaryCta, secondaryCta, colophonNote } = catalogueClosing;
  const { contact } = site;
  const { address } = contact;

  const colophon = [
    {
      label: "Visit",
      value: `${address.street}, ${address.area}, ${address.locality}`,
    },
    { label: "Call", value: contact.phone, href: contact.phoneHref },
    { label: "Write", value: contact.email, href: contact.emailHref },
    { label: "Or call", value: contact.phoneAlt, href: contact.phoneAltHref },
  ];

  return (
    <section
      id="catalogue-enquire"
      aria-labelledby="catalogue-enquire-heading"
      className="bg-surface-warm py-20 lg:py-28"
    >
      <Container>
        <div className="border border-hairline-strong bg-canvas p-6 sm:p-10 lg:p-16">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>

          <ScrollLines className="mt-6">
            <h2 id="catalogue-enquire-heading" className="max-w-[18ch] text-display-2xl text-ink">
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-v-line className="block">
                  {heading}
                </span>
              </span>
            </h2>
          </ScrollLines>

          <Reveal className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="max-w-[36rem] text-body-lg text-body">{body}</p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <MagneticButton>
                  <Button href={primaryCta.href} size="lg">
                    {primaryCta.label}
                    <ArrowIcon />
                  </Button>
                </MagneticButton>
                <Button href={secondaryCta.href} variant="secondary" size="lg">
                  {secondaryCta.label}
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal as="dl" className="mt-14 grid border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
            {colophon.map((item) => (
              <div key={item.label} className="border-b border-hairline py-4 sm:pr-6">
                <dt className="font-body text-caption-sm uppercase tracking-[0.16em] text-muted">{item.label}</dt>
                <dd className="mt-1.5 font-body text-body-sm text-ink">
                  {item.href ? (
                    <a href={item.href} className="transition-colors duration-200 hover:text-brand">
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </Reveal>

          <p className="mt-6 font-body text-caption text-muted">{colophonNote}</p>
        </div>
      </Container>
    </section>
  );
}
