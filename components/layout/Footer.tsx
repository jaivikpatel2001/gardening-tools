import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { SocialLinks } from "@/components/decor/SocialLinks";
import { WhatsAppIcon } from "@/components/decor/SocialIcons";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/config/site";
import {
  footerCompanyLinks,
  footerEnquiry,
  footerHandCategorySlugs,
  footerMachineryCategorySlugs,
  primaryNav,
} from "@/data/navigation";
import { getCategoryLinks } from "@/lib/catalogue";
import { getSocialChannels } from "@/lib/social";
import { routes } from "@/lib/routes";
import { visibleLinks } from "@/lib/visibility";
import type { NavItem } from "@/types/content";

/**
 * A column of footer links.
 *
 * Renders nothing at all when every link in it has been filtered out by the
 * page switchboard. A heading above an empty list would advertise a section
 * that has not been released.
 */
function LinkColumn({ title, items }: { title: string; items: readonly NavItem[] }) {
  if (items.length === 0) return null;

  return (
    <div>
      <h3 className="text-title-sm text-on-band">{title}</h3>
      <ul className="mt-4 flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-body-sm text-on-band-muted transition-colors duration-200 hover:text-on-band"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Global footer. Built once here and reused by every page; nothing in it is
 * Home-specific. A server component, which is what lets the product columns
 * read the catalogue without that data reaching the browser.
 *
 * Every column of site links is passed through `visibleLinks`, so a page that
 * has not been released in production disappears from the footer at the same
 * moment it disappears from the header and the sitemap. Product category links
 * are covered by the Products flag, which `visibleLinks` resolves from the URL.
 *
 * No Blog, Journal, Services or Resources link exists in any column, by design.
 */
export function Footer() {
  const { contact } = site;
  const handLinks = visibleLinks(getCategoryLinks(footerHandCategorySlugs));
  const machineryLinks = visibleLinks(getCategoryLinks(footerMachineryCategorySlugs));
  const quickLinks = visibleLinks(primaryNav);
  const companyLinks = visibleLinks(footerCompanyLinks);
  const whatsappChannel = getSocialChannels().find((channel) => channel.label === "WhatsApp");

  return (
    <footer className="bg-band text-on-band-muted">
      <Container className="py-14 md:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,minmax(0,1fr))] lg:gap-10">
          <div className="max-w-sm">
            <Logo tone="on-band" />
            <p className="mt-5 text-body-sm text-on-band-muted">
              {site.legalName}, {site.contact.address.locality}. {site.tagline}: garden machinery, plant
              protection equipment, hand tools and watering products.
            </p>

            <SocialLinks tone="on-band" className="mt-6" />
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-4 lg:grid-cols-4">
            <LinkColumn title="Quick Links" items={quickLinks} />
            <LinkColumn title="Hand Tools" items={handLinks} />
            <LinkColumn title="Machinery" items={machineryLinks} />
            <LinkColumn title="Company" items={companyLinks} />
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-white/12 pt-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <h3 className="text-title-sm text-on-band">Contact</h3>
            <ul className="mt-4 flex flex-col gap-3 text-body-sm">
              <li>
                <a
                  href={contact.phoneHref}
                  className="inline-flex items-start gap-3 text-on-band-muted transition-colors duration-200 hover:text-on-band"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.7} />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={contact.phoneAltHref}
                  className="inline-flex items-start gap-3 text-on-band-muted transition-colors duration-200 hover:text-on-band"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.7} />
                  {contact.phoneAlt}
                </a>
              </li>
              <li>
                <a
                  href={contact.emailHref}
                  className="inline-flex items-start gap-3 text-on-band-muted transition-colors duration-200 hover:text-on-band"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.7} />
                  {contact.email}
                </a>
              </li>
              <li className="inline-flex items-start gap-3 text-on-band-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.7} />
                <address className="not-italic">
                  {contact.address.street}, {contact.address.area}
                  <br />
                  {contact.address.locality}, {contact.address.region}
                </address>
              </li>
            </ul>
          </div>

          {/* The newsletter panel stood here and was removed on the client's
              instruction. It is replaced by the enquiry routes rather than by
              another large block: every conversion path on this site ends in an
              enquiry, so that is what the space should carry. */}
          <div>
            <h3 className="text-title-sm text-on-band">Get in Touch</h3>
            <p className="mt-4 text-body-sm text-on-band-muted">{footerEnquiry.body}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button href={routes.contact} variant="inverse">
                {footerEnquiry.ctaLabel}
              </Button>

              {whatsappChannel ? (
                <a
                  href={whatsappChannel.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-white/30 px-4 font-body text-[0.875rem] font-semibold text-on-band transition-colors duration-200 hover:border-white/70"
                >
                  <WhatsAppIcon className="h-[17px] w-[17px]" />
                  {footerEnquiry.whatsappLabel}
                </a>
              ) : null}
            </div>

            {/* The same row as the brand column above it would be a duplicate,
                so the profiles are drawn once, at the top. */}
          </div>
        </div>

        {/* No privacy or terms links: those pages do not exist yet, and a link
            to a page that is not there is worse than no link at all. */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/12 pt-7 text-caption-sm text-on-band-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All Rights Reserved.
          </p>
          <p>
            {site.legalName}, {site.contact.address.locality}
          </p>
        </div>
      </Container>
    </footer>
  );
}
