import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { env } from "@/config/env";
import { site } from "@/config/site";
import { contactCta, contactHero, enquiryForm, enquiryReasons, locationSection } from "@/data/contact";
import { enforcePageVisibility } from "@/lib/page-guard";
import { routes } from "@/lib/routes";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { buildWhatsAppHref } from "@/lib/whatsapp";

const trail = [
  { name: "Home", path: routes.home },
  { name: "Contact", path: routes.contact },
];

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: `Call, email or send an enquiry to ${site.legalName}, ${site.contact.address.area}, ${site.contact.address.locality}. Garden machinery, hand tools, watering products and plant protection equipment.`,
  path: routes.contact,
});

const { contact } = site;

/**
 * Contact page.
 *
 * Every fact on it is read from `config/site.ts`, which came from the client's
 * own contact page. No opening hours, postcode, response time or map pin is
 * shown, because none has been supplied: the page says so instead of guessing.
 *
 * The map is embedded, and also linked. The embed was requested in review; it
 * is lazy-loaded, so the third-party frame is not fetched until someone scrolls
 * to it, and the written address above it remains the authority.
 */
export default function ContactPage() {
  enforcePageVisibility("contact");

  const whatsappHref = env.whatsappNumber
    ? buildWhatsAppHref(env.whatsappNumber, site.whatsapp.defaultMessage)
    : null;

  const address = `${contact.address.street}, ${contact.address.area}, ${contact.address.locality}, ${contact.address.region}`;
  const mapQuery = encodeURIComponent(`${site.legalName}, ${address}`);
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  // The keyless embed endpoint: no API key to leak and nothing to configure.
  const mapEmbedSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`;

  const channels = [
    { icon: Phone, label: "Phone", value: contact.phone, href: contact.phoneHref },
    { icon: Phone, label: "Second line", value: contact.phoneAlt, href: contact.phoneAltHref },
    { icon: Mail, label: "Email", value: contact.email, href: contact.emailHref },
    ...(whatsappHref
      ? [{ icon: MessageCircle, label: "WhatsApp", value: "Message us", href: whatsappHref }]
      : []),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(trail)) }}
      />

      <PageHero
        eyebrow={contactHero.eyebrow}
        heading={contactHero.heading}
        body={contactHero.body}
        trail={trail}
        aside={
          <ul className="flex flex-col gap-3">
            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    className="group flex items-center gap-4 rounded-lg border border-hairline-soft bg-surface p-5 transition-colors duration-200 hover:border-brand"
                  >
                    <span
                      aria-hidden="true"
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand/10 text-brand"
                    >
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-caption uppercase tracking-[0.14em] text-muted">
                        {channel.label}
                      </span>
                      <span className="mt-1 block font-heading text-title-sm text-ink transition-colors duration-200 group-hover:text-brand">
                        {channel.value}
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}

            <li className="flex items-start gap-4 rounded-lg border border-hairline-soft bg-surface p-5">
              <span
                aria-hidden="true"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand/10 text-brand"
              >
                <MapPin className="h-[18px] w-[18px]" strokeWidth={1.7} />
              </span>
              <span className="min-w-0">
                <span className="block text-caption uppercase tracking-[0.14em] text-muted">
                  Address
                </span>
                <address className="mt-1 not-italic text-body-sm text-body">
                  {contact.address.street}
                  <br />
                  {contact.address.area}
                  <br />
                  {contact.address.locality}, {contact.address.region}
                </address>
              </span>
            </li>
          </ul>
        }
      />

      <Section id="enquiry" tone="surface" size="lg" labelledBy="enquiry-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                id="enquiry-heading"
                eyebrow={enquiryForm.eyebrow}
                title={enquiryForm.heading}
                description={enquiryForm.body}
              />

              <ul className="mt-10 flex flex-col gap-6 border-t border-hairline pt-8">
                {enquiryReasons.map((reason) => (
                  <li key={reason.title}>
                    <h3 className="text-title-sm text-ink">{reason.title}</h3>
                    <p className="mt-1.5 text-body-sm text-muted">{reason.body}</p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="lg:col-span-7">
              <div className="rounded-xl border border-hairline bg-canvas p-6 lg:p-9">
                <EnquiryForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section id="location" tone="canvas" size="lg" labelledBy="location-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
            <Reveal className="lg:col-span-6">
              <Eyebrow>{locationSection.eyebrow}</Eyebrow>
              <h2 id="location-heading" className="mt-4 text-display-md text-ink">
                {locationSection.heading}
              </h2>
              <p className="mt-5 text-body-md text-body">{locationSection.body}</p>

              <address className="mt-7 not-italic text-body-md text-ink">
                {site.legalName}
                <br />
                {contact.address.street}, {contact.address.area}
                <br />
                {contact.address.locality}, {contact.address.region}, {contact.address.country}
              </address>

              <p className="mt-6 text-body-sm text-muted">{locationSection.hoursNote}</p>

              <a
                href={mapHref}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-sm border border-hairline-strong px-5 font-body text-[0.875rem] font-semibold text-brand transition-colors duration-200 hover:border-brand"
              >
                <MapPin className="h-4 w-4" strokeWidth={1.7} />
                {locationSection.mapLinkLabel}
              </a>
            </Reveal>

            <Reveal className="lg:col-span-6">
              {/* Rounded and clipped like every other plate on the site, so the
                  frame does not sit in a square hole. */}
              <div className="overflow-hidden rounded-xl border border-hairline bg-surface-soft">
                <iframe
                  src={mapEmbedSrc}
                  title={locationSection.mapTitle}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="aspect-[4/3] w-full border-0"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow={contactCta.eyebrow}
        heading={contactCta.heading}
        body={contactCta.body}
        primaryCta={contactCta.primaryCta}
        secondaryCta={contactCta.secondaryCta}
      />
    </>
  );
}
