import { WhatsAppIcon } from "@/components/decor/SocialIcons";
import { env } from "@/config/env";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { buildWhatsAppHref } from "@/lib/whatsapp";

import { floatingControlClassName } from "./styles";

interface WhatsAppButtonProps {
  /**
   * Validated international number, digits only. Defaults to
   * NEXT_PUBLIC_WHATSAPP_NUMBER via `config/env.ts`; pass one explicitly to
   * reuse the button for a different line.
   */
  number?: string | null;
  /** Pre-filled opening message. */
  message?: string;
  className?: string;
}

/**
 * Floating WhatsApp link.
 *
 * The number is injected rather than written into the component, and until one
 * is configured the button renders nothing at all, so a dead or placeholder chat
 * link can never ship. A server component: it needs no JavaScript.
 */
export function WhatsAppButton({
  number = env.whatsappNumber,
  message = site.whatsapp.defaultMessage,
  className,
}: WhatsAppButtonProps) {
  if (!number) return null;

  return (
    <a
      href={buildWhatsAppHref(number, message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${site.name} on WhatsApp (opens in a new tab)`}
      className={cn(floatingControlClassName, "bg-brand text-on-brand hover:bg-brand-hover", className)}
    >
      {/* Hover label. Decorative: the aria-label already names the link. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-full mr-3 translate-x-1 whitespace-nowrap rounded-full bg-surface px-3 py-1.5 font-body text-caption font-semibold text-ink opacity-0 shadow-card transition-[opacity,translate] duration-300 ease-[var(--ease-organic)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
      >
        Chat on WhatsApp
      </span>
      <WhatsAppIcon className="h-[22px] w-[22px] transition-[scale] duration-300 ease-[var(--ease-organic)] group-hover:scale-110" />
    </a>
  );
}
