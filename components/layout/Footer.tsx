import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { socialIcons, type SocialLabel } from "@/components/decor/SocialIcons";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { site } from "@/config/site";
import {
  footerResourceLinks,
  footerServiceLinks,
  footerToolCategorySlugs,
  legalLinks,
  primaryNav,
} from "@/data/navigation";
import { getCategoryLinks } from "@/lib/catalogue";
import type { NavItem } from "@/types/content";

function LinkColumn({ title, items }: { title: string; items: readonly NavItem[] }) {
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
 * Global footer. Built once here and reused by every future page; nothing in it
 * is Home-specific. A server component, which is what lets the tool column read
 * the catalogue without that data reaching the browser.
 *
 * No Blog or Journal link exists in any column, by design.
 */
export function Footer() {
  const { contact } = site;
  const toolLinks = getCategoryLinks(footerToolCategorySlugs);

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

            {site.social.length > 0 ? (
              <ul className="mt-6 flex items-center gap-2.5">
                {site.social.map((channel) => {
                  const Icon = socialIcons[channel.label as SocialLabel];
                  return (
                    <li key={channel.label}>
                      <a
                        href={channel.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${site.name} on ${channel.label}`}
                        className="grid h-11 w-11 place-items-center rounded-full border border-white/18 text-on-band-muted transition-colors duration-200 hover:border-white/50 hover:text-on-band"
                      >
                        <Icon className="h-[17px] w-[17px]" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-4 lg:grid-cols-4">
            <LinkColumn title="Quick Links" items={primaryNav} />
            <LinkColumn title="Tools" items={toolLinks} />
            <LinkColumn title="Services" items={footerServiceLinks} />
            <LinkColumn title="Resources" items={footerResourceLinks} />
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

          <div>
            <h3 className="text-title-sm text-on-band">Newsletter</h3>
            <p className="mt-4 text-body-sm text-on-band-muted">
              Seasonal advice and tool guides, a few times a year. No noise.
            </p>
            <NewsletterForm tone="on-band" className="mt-5" />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/12 pt-7 text-caption-sm text-on-band-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 {site.name}. All Rights Reserved.</p>
          <ul className="flex items-center gap-6">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors duration-200 hover:text-on-band">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
