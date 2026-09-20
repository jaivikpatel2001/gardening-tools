"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { LawnScene } from "@/components/preloader/LawnScene";
import styles from "@/components/preloader/Preloader.module.css";
import { DAWN, DUSK, RUN_MS, authoredTime, type LawnPalette } from "@/components/preloader/lawn-scene";

/**
 * The branded preloader: a lawn grows, a mower crosses and cuts it, and the
 * trimmed lawn hands over to the site.
 *
 * The scene carries the brand on its own. A logo plate was tried over it and
 * removed in review: it covered the frame the composition had been built to
 * deliver, and the header shows the mark a moment later anyway.
 *
 * The composition is the client's, authored in Claude Design and ported in
 * `LawnScene.tsx`. This file is the part that belongs to the site: when the
 * overlay is on screen, how long it stays, which palette the scene uses, and
 * how it leaves.
 *
 * It is armed before first paint by the script in `app/layout.tsx`, on every
 * document load: every browser reload plays it, and only a reload does, since
 * client-side navigation never re-runs that script. It is skipped when
 * JavaScript is off, when motion is reduced and when the browser asks for
 * reduced data. Everything else about the page renders underneath it, so
 * nothing is actually waiting on the animation.
 *
 * The design loops for as long as you watch it. A preloader cannot, so the
 * authored five second timeline is played through once and the overlay then
 * fades. The pacing is the `TIMELINE` warp in `lawn-scene.ts`, which keeps the
 * mower near its authored speed while the beats around it stay brisk. The
 * timeout fires whatever happens, so a slow device cannot trap anyone behind it.
 */

/** The fade out, matching the transition in the stylesheet. */
const FADE_MS = 460;

interface SceneConfig {
  palette: LawnPalette;
  /**
   * Depth of field. The three band blurs are by far the most expensive thing
   * in the frame, so a narrow or low-powered device turns them down instead of
   * dropping frames.
   */
  depthBlur: boolean;
}

/**
 * `data-theme` is set on `<html>` by the blocking script before first paint, so
 * it is an external store rather than React state. Reading it through
 * `useSyncExternalStore` means no mount effect and no second render pass, and
 * the server snapshot is `null`, so the scene is simply absent from the server
 * HTML rather than being rendered in the wrong palette and corrected a frame
 * later.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

let cached: SceneConfig | null = null;
let cachedTheme: string | null = null;

function getSnapshot(): SceneConfig {
  const theme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";

  // The snapshot must be referentially stable between renders or
  // useSyncExternalStore re-renders forever, so it is rebuilt only when the
  // theme actually changes.
  if (cached && cachedTheme === theme) return cached;

  const cores = navigator.hardwareConcurrency ?? 8;
  cachedTheme = theme;
  cached = {
    palette: theme === "dark" ? DUSK : DAWN,
    depthBlur: window.innerWidth >= 744 && cores > 4,
  };
  return cached;
}

function getServerSnapshot(): SceneConfig | null {
  return null;
}

export function Preloader() {
  const config = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [t, setT] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.preloader !== "active") return;

    // Scrolling is locked only while the overlay is on screen, and the same
    // cleanup releases it however the effect ends.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const started = performance.now();

    // One loop drives the whole composition. The scene is a pure function of
    // this value, which is what makes the sequence reproducible and lets it be
    // stepped through frame by frame when reviewing it.
    const tick = (now: number) => {
      const elapsed = now - started;
      setT(authoredTime(elapsed));
      if (elapsed < RUN_MS) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);

    const fade = window.setTimeout(() => {
      root.dataset.preloader = "done";
    }, RUN_MS);

    const clear = window.setTimeout(() => {
      root.removeAttribute("data-preloader");
    }, RUN_MS + FADE_MS);

    return () => {
      cancelAnimationFrame(frame.current);
      window.clearTimeout(fade);
      window.clearTimeout(clear);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div className={styles.overlay} aria-hidden="true">
      {config ? (
        <div className={styles.scene}>
          <LawnScene t={t} palette={config.palette} depthBlur={config.depthBlur} />
        </div>
      ) : null}
    </div>
  );
}
