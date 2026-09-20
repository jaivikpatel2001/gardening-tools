"use client";

import { useEffect, useRef } from "react";

import { CURSOR_LABELS, isCursorIntent } from "@/components/cursor/cursor-intent";

import styles from "./CustomCursor.module.css";

/** Elements that open the trailing dot into the circular interaction indicator. */
const INTERACTIVE_SELECTOR = 'a[href], button:not([disabled]), [role="button"], summary, label[for], [data-cursor]';

/** Places where people type. The custom cursor steps aside for the native caret. */
const TEXT_ENTRY_SELECTOR =
  'input:not([type="button"], [type="submit"], [type="reset"], [type="checkbox"], [type="radio"], [type="range"], [type="color"], [type="file"]), textarea, select, [contenteditable]:not([contenteditable="false"])';

/** Share of the remaining gap the dot closes per 60Hz frame, from 0 to 1. */
const FOLLOW = 0.22;
/** How far the leaf's lean moves toward its target per 60Hz frame. */
const TILT_EASE = 0.18;
/** Leaf lean in degrees per pixel the dot trails behind, and its clamp. */
const TILT_PER_PIXEL = 0.55;
const MAX_TILT = 18;
/** The easing factors above are tuned per 60Hz frame and rescaled to the real frame time. */
const FRAME_MS = 1000 / 60;
/** Longest frame the easing will account for, so a stalled frame never makes the dot jump. */
const MAX_FRAME_MS = 64;

type CursorState = "idle" | "interactive" | "text";

/**
 * Plant-inspired custom cursor.
 *
 * The leaf is the cursor: its tip sits exactly on the pointer's hotspot with no
 * easing, so aim never waits on an animation. A small dot eases along behind it
 * and, over anything interactive, opens into a ring that carries a contextual
 * label.
 *
 * Mounted only for a fine pointer (a mouse or trackpad) and only when the
 * visitor has not asked for reduced motion. On touch devices, coarse pointers or
 * with reduced motion it renders nothing, and the system cursor is untouched.
 *
 * Purely visual: every part is `pointer-events: none` and `aria-hidden`, so
 * clicking, text selection, scrolling, forms, keyboard navigation and assistive
 * technology all behave exactly as they would without it.
 */
/**
 * The cursor itself, split into its own module so it can be fetched on demand.
 *
 * React renders this layer once. After that there are no state updates at all:
 * pointer events write the leaf's position straight to the DOM, and a single rAF
 * loop eases the dot after it and stops itself once everything has settled.
 */
export function CursorLayer() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const leafRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const pointer = pointerRef.current;
    const follower = followerRef.current;
    const leaf = leafRef.current;
    const labelElement = labelRef.current;
    if (!root || !pointer || !follower || !leaf || !labelElement) return;

    const html = document.documentElement;
    html.classList.add("has-custom-cursor");

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let tilt = 0;
    let frame = 0;
    let lastTime = 0;
    let visible = false;
    let state: CursorState = "idle";
    let label = "";

    const setVisible = (next: boolean) => {
      if (visible === next) return;
      visible = next;
      root.dataset.visible = String(next);
    };

    // Rescales a per-frame easing factor to the time that actually passed, so
    // the dot trails the same distance on 60Hz, 120Hz and 144Hz displays.
    const eased = (factor: number, elapsed: number) => 1 - Math.pow(1 - factor, elapsed / FRAME_MS);

    const tick = (time: number) => {
      const elapsed = lastTime ? Math.min(time - lastTime, MAX_FRAME_MS) : FRAME_MS;
      lastTime = time;

      const dx = target.x - current.x;
      const dy = target.y - current.y;
      const follow = eased(FOLLOW, elapsed);
      current.x += dx * follow;
      current.y += dy * follow;

      // While the dot trails, the leaf leans back against the direction of
      // travel, like a sprig drawn through the air, then eases upright.
      const targetTilt = Math.max(-MAX_TILT, Math.min(MAX_TILT, dx * TILT_PER_PIXEL));
      tilt += (targetTilt - tilt) * eased(TILT_EASE, elapsed);

      follower.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      leaf.style.rotate = `${tilt}deg`;

      const settled = Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1 && Math.abs(tilt) < 0.05;
      if (settled) {
        frame = 0;
        lastTime = 0;
      } else {
        frame = window.requestAnimationFrame(tick);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      // Touchscreen laptops also emit pointer events; only a real pointer drives the cursor.
      if (event.pointerType === "touch") return;

      target.x = event.clientX;
      target.y = event.clientY;
      pointer.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;

      if (!visible) {
        // Appear at the pointer instead of gliding in from wherever it was last seen.
        current.x = target.x;
        current.y = target.y;
        follower.style.transform = pointer.style.transform;
        setVisible(true);
      }

      if (!frame) frame = window.requestAnimationFrame(tick);
    };

    const onPointerOver = (event: PointerEvent) => {
      const element = event.target instanceof Element ? event.target : null;
      if (!element) return;

      let nextState: CursorState = "idle";
      let nextLabel = "";

      if (element.closest(TEXT_ENTRY_SELECTOR)) {
        nextState = "text";
      } else if (element.closest(INTERACTIVE_SELECTOR)) {
        nextState = "interactive";
        const intent = element.closest<HTMLElement>("[data-cursor]")?.dataset.cursor;
        if (isCursorIntent(intent)) nextLabel = CURSOR_LABELS[intent];
      }

      if (nextState !== state) {
        state = nextState;
        root.dataset.state = nextState;
      }

      if (nextLabel !== label) {
        label = nextLabel;
        labelElement.textContent = nextLabel;
        root.dataset.labelled = String(nextLabel !== "");
      }
    };

    const onPointerDown = () => {
      root.dataset.pressed = "true";
    };

    const onPointerUp = () => {
      root.dataset.pressed = "false";
    };

    const onMouseOut = (event: MouseEvent) => {
      // `relatedTarget` is null only when the pointer leaves the window itself.
      if (!event.relatedTarget) setVisible(false);
    };

    // Keyboard navigation: step out of the way of focus rings until the mouse moves again.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") setVisible(false);
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("pointerup", onPointerUp, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("keydown", onKeyDown);
      if (frame) window.cancelAnimationFrame(frame);
      html.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={styles.root}
      data-state="idle"
      data-visible="false"
      data-labelled="false"
      data-pressed="false"
    >
      {/* Painted first, so the leaf always sits above the dot and its ring. */}
      <div ref={followerRef} className={styles.follower}>
        <span className={styles.dot} />
        <div className={styles.ring}>
          <span ref={labelRef} className={styles.label} />
        </div>
      </div>

      {/* Positioning and rotation live on separate elements: a CSS `rotate` or
          `scale` on the element that carries the translate would transform the
          translation too. */}
      <div ref={pointerRef} className={styles.pointer}>
        <div ref={leafRef} className={styles.leaf}>
          <svg viewBox="0 0 24 24" className={styles.leafShape}>
            <path className={styles.leafBody} d="M3 3C12 3.4 19.4 9.6 18.4 18.4 9.6 19.4 3.4 12 3 3Z" />
            <path className={styles.leafVein} d="M4.2 4.2 16 16" />
            <path className={styles.leafStem} d="M18.2 18.2 21.4 21.4" />
          </svg>
        </div>
      </div>
    </div>
  );
}
