"use client";

import dynamic from "next/dynamic";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MEDIA } from "@/lib/media";

/**
 * Plant-inspired custom cursor.
 *
 * The leaf is the cursor: its tip sits exactly on the pointer's hotspot with no
 * easing, so aim never waits on an animation. A small dot eases along behind it
 * and, over anything interactive, opens into a ring that carries a contextual
 * label. All of that lives in `CursorLayer`.
 *
 * This file is only the gate. It mounts the layer for a fine pointer (a mouse or
 * trackpad) and only when the visitor has not asked for reduced motion. On touch
 * devices, coarse pointers or with reduced motion it renders nothing, and the
 * system cursor is untouched.
 *
 * The layer is a dynamic import so that the visitors who will never see it never
 * download it either. Phones and tablets are most of the traffic a site like
 * this gets, and before the split they were paying for nine kilobytes of pointer
 * easing that could not run. `ssr: false` is what keeps it out of the server
 * payload as well, and it is legal here because this is a client component.
 *
 * Nothing is rendered until the import resolves, which is correct: the native
 * cursor stays visible until the layer mounts and adds `has-custom-cursor`,
 * so there is never a moment with no pointer at all.
 *
 * Purely visual: every part is `pointer-events: none` and `aria-hidden`, so
 * clicking, text selection, scrolling, forms, keyboard navigation and assistive
 * technology all behave exactly as they would without it.
 */
const CursorLayer = dynamic(() => import("./CursorLayer").then((mod) => mod.CursorLayer), {
  ssr: false,
});

export function CustomCursor() {
  const finePointer = useMediaQuery(MEDIA.finePointer);
  const reducedMotion = useMediaQuery(MEDIA.reduced);

  return finePointer && !reducedMotion ? <CursorLayer /> : null;
}
