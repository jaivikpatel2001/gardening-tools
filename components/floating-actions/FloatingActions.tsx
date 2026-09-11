import { ScrollToTop } from "./ScrollToTop";
import { WhatsAppButton } from "./WhatsAppButton";

/**
 * Bottom-right floating controls: scroll-to-top above, WhatsApp below.
 *
 * A server component. Only `ScrollToTop` ships JavaScript, and the WhatsApp
 * link appears only once a number is configured. Offsets honour the device safe
 * area so the controls clear the iOS home indicator, and the stack sits below
 * the mobile navigation sheet in the stacking order.
 */
export function FloatingActions() {
  return (
    <div className="pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40 flex flex-col items-end gap-3 sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))] sm:right-[max(1.5rem,env(safe-area-inset-right))]">
      <ScrollToTop />
      <WhatsAppButton />
    </div>
  );
}
