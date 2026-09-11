/**
 * Builds a WhatsApp click-to-chat link.
 *
 * Kept apart from the button so the same link can later be reused by a contact
 * page or the footer without the formatting rules being copied. `number` must
 * already be validated digits, which `config/env.ts` guarantees.
 */
export function buildWhatsAppHref(number: string, message?: string): string {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
