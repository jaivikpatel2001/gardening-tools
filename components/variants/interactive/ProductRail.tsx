"use client";

import Link from "next/link";
import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

import { cursorIntent } from "@/components/cursor/cursor-intent";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { MEDIA } from "@/lib/media";
import type { ImageAsset } from "@/types/content";

export interface RailItem {
  slug: string;
  name: string;
  category: string;
  description: string;
  href: string;
  image: ImageAsset;
  specs: readonly string[];
}

/** Pixels of pointer travel after which a drag is a drag and not a click. */
const DRAG_THRESHOLD = 6;

/**
 * Variant 2 products: one horizontal rail the reader drags through, instead of
 * a row of four cards that all arrive at once.
 *
 * The track is a real scroll container with scroll snapping, so the wheel, a
 * trackpad, touch and the keyboard all work before a line of JavaScript runs.
 * Pointer dragging and the two arrow buttons are added on top of that, and the
 * progress bar reads the same scroll position rather than a separate index.
 */
export function ProductRail({ items, dragHint }: { items: readonly RailItem[]; dragHint: string }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: 0 });
  const [progress, setProgress] = useState(0);
  const [index, setIndex] = useState(0);

  function readPosition() {
    const track = trackRef.current;
    if (!track) return;

    const max = track.scrollWidth - track.clientWidth;
    const ratio = max > 0 ? track.scrollLeft / max : 0;
    setProgress(ratio);
    setIndex(Math.min(items.length - 1, Math.round(ratio * (items.length - 1))));
  }

  function scrollByPanel(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;

    // One panel per press, measured from the rail rather than guessed from the
    // viewport: a fraction of the track width overshoots the end, and the
    // browser then snaps the whole rail back to where it started.
    const first = track.firstElementChild as HTMLElement | null;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    const step = first ? first.getBoundingClientRect().width + gap : track.clientWidth * 0.8;

    const reduced = window.matchMedia(MEDIA.reduced).matches;
    track.scrollBy({ left: direction * step, behavior: reduced ? "auto" : "smooth" });
  }

  function onPointerDown(event: ReactPointerEvent<HTMLUListElement>) {
    const track = trackRef.current;
    // Touch already has momentum scrolling that is better than anything we can
    // emulate, so dragging is added for mouse and pen only.
    if (!track || event.pointerType === "touch") return;

    drag.current = { active: true, startX: event.clientX, startLeft: track.scrollLeft, moved: 0 };
    track.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: ReactPointerEvent<HTMLUListElement>) {
    const track = trackRef.current;
    if (!track || !drag.current.active) return;

    const delta = event.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(delta));
    track.scrollLeft = drag.current.startLeft - delta;
  }

  function endDrag(event: ReactPointerEvent<HTMLUListElement>) {
    const track = trackRef.current;
    if (!track || !drag.current.active) return;

    drag.current.active = false;
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
  }

  return (
    <div>
      <ul
        ref={trackRef}
        onScroll={readPosition}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        // A drag that ends on a panel would otherwise follow its link.
        onClickCapture={(event) => {
          if (drag.current.moved > DRAG_THRESHOLD) {
            event.preventDefault();
            event.stopPropagation();
            drag.current.moved = 0;
          }
        }}
        // The grab cursor is CSS, not state: the drag itself lives in a ref so
        // that moving the pointer never re-renders the rail.
        // Proximity snapping, not mandatory: the last panel stops short of a
        // snap point when the rail only just overflows, and mandatory snapping
        // would drag the whole track back to the start rather than rest there.
        className="rail-x flex cursor-grab snap-x snap-proximity gap-5 overflow-x-auto pb-2 active:cursor-grabbing lg:gap-8"
      >
        {items.map((item, itemIndex) => (
          <li
            key={item.slug}
            className="w-[78vw] shrink-0 snap-start sm:w-[52vw] lg:w-[40vw] xl:w-[32vw]"
          >
            <Link href={item.href} className="group block" {...cursorIntent("view")} draggable={false}>
              <ImagePlate
                image={item.image}
                ratio="4/5"
                sizes="(max-width: 743px) 78vw, (max-width: 1127px) 46vw, 30vw"
                radius="xl"
                className="bg-surface-soft"
              />

              <div className="mt-5 flex items-baseline justify-between gap-4">
                <p className="font-body text-caption-sm uppercase tracking-[0.16em] text-muted">
                  {item.category}
                </p>
                <p className="font-heading text-caption font-bold text-muted">
                  {String(itemIndex + 1).padStart(2, "0")}
                </p>
              </div>

              <h3 className="mt-2 text-title-lg text-ink transition-colors duration-300 group-hover:text-brand">
                {item.name}
              </h3>
              <p className="mt-2 max-w-[38ch] text-body-sm text-body">{item.description}</p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {item.specs.map((spec) => (
                  <li
                    key={spec}
                    className="rounded-full border border-hairline-strong px-3 py-1 font-body text-caption-sm text-body"
                  >
                    {spec}
                  </li>
                ))}
              </ul>
            </Link>
          </li>
        ))}
      </ul>

      {/* The track runs to the right edge of the screen; the controls stop
          short of it so nothing sits against the glass. */}
      <div className="mt-8 flex items-center gap-5 pr-4 sm:pr-6 lg:pr-10">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByPanel(-1)}
            aria-label="Previous tool"
            className="grid h-11 w-11 place-items-center rounded-full border border-hairline-strong text-ink transition-colors duration-200 hover:border-brand hover:text-brand"
          >
            <ArrowIcon className="rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => scrollByPanel(1)}
            aria-label="Next tool"
            className="grid h-11 w-11 place-items-center rounded-full border border-hairline-strong text-ink transition-colors duration-200 hover:border-brand hover:text-brand"
          >
            <ArrowIcon />
          </button>
        </div>

        <div className="h-px flex-1 bg-hairline">
          <div
            aria-hidden="true"
            className="h-px origin-left bg-brand transition-transform duration-200 ease-linear"
            style={{ transform: `scaleX(${Math.max(0.06, progress || 0.06)})` }}
          />
        </div>

        <p className="font-body text-caption text-muted">
          <span className="text-ink">{String(index + 1).padStart(2, "0")}</span>
          {` / ${String(items.length).padStart(2, "0")}`}
        </p>

        <p className="hidden font-body text-caption uppercase tracking-[0.16em] text-muted sm:block">
          {dragHint}
        </p>
      </div>
    </div>
  );
}
