/**
 * Shared shell for the floating round controls, so the scroll-to-top button and
 * the WhatsApp link stay visually identical without either importing the other.
 *
 * 48px keeps both comfortably above the 44px minimum touch target. The parent
 * container is `pointer-events: none` so the empty space around the controls
 * never blocks the page; each control opts back in.
 */
export const floatingControlClassName =
  "group pointer-events-auto relative grid h-12 w-12 place-items-center rounded-full shadow-float " +
  "transition-[translate,background-color,box-shadow] duration-300 ease-[var(--ease-organic)] " +
  "hover:-translate-y-0.5 hover:shadow-hover active:translate-y-0";
