import type { CSSProperties } from "react";

import styles from "./GardenPathScene.module.css";

/**
 * The 404 illustration: a garden path whose footprint trail wanders off the
 * paving toward a crooked, half-broken signpost reading "404".
 *
 * Drawn in SVG rather than shipped as an image, so it costs a few kilobytes,
 * renders crisply at any size and follows the light and dark themes through the
 * same colour tokens as the rest of the site. Hover the sign and it straightens.
 *
 * The landscape sits inside an organic island clip, so the ground never ends in
 * a hard rectangular edge; the sign, foliage and drifting leaves are drawn
 * outside it and break the silhouette for depth.
 *
 * Decorative: the page heading carries the meaning, so the whole scene is hidden
 * from assistive technology.
 */

type SceneStyle = CSSProperties & Record<`--${string}`, string | number>;

const depth = (value: number): SceneStyle => ({ "--depth": value });

const timing = (duration: number, delay: number): SceneStyle => ({
  "--duration": `${duration}s`,
  "--delay": `${delay}s`,
});

interface Frond {
  x: number;
  y: number;
  width: number;
  height: number;
  tone: string;
  duration: number;
  delay: number;
  flip?: boolean;
}

const STONES = [
  { cx: 300, cy: 530, rx: 20, ry: 6.5 },
  { cx: 270, cy: 492, rx: 17, ry: 6 },
  { cx: 262, cy: 456, rx: 15, ry: 5 },
  { cx: 284, cy: 424, rx: 13, ry: 4.5 },
  { cx: 344, cy: 394, rx: 10, ry: 3.8 },
  { cx: 382, cy: 368, rx: 7, ry: 2.8 },
];

const TUFTS = [
  { x: 196, y: 432 },
  { x: 426, y: 424 },
  { x: 150, y: 478 },
  { x: 468, y: 486 },
  { x: 226, y: 516 },
];

const FRONDS: readonly Frond[] = [
  { x: 22, y: 372, width: 70, height: 150, tone: "var(--brand)", duration: 7.2, delay: -1.4 },
  { x: 74, y: 404, width: 54, height: 118, tone: "var(--brand-soft)", duration: 6.1, delay: -3.2 },
  { x: 6, y: 436, width: 46, height: 100, tone: "var(--green-300)", duration: 8.4, delay: -0.6 },
  { x: 500, y: 364, width: 72, height: 156, tone: "var(--brand)", duration: 7.8, delay: -2.3, flip: true },
  { x: 458, y: 410, width: 54, height: 116, tone: "var(--brand-soft)", duration: 6.6, delay: -4.1, flip: true },
  { x: 544, y: 436, width: 46, height: 100, tone: "var(--green-300)", duration: 8.9, delay: -1.9, flip: true },
];

const LEAVES = [
  { x: 196, y: 108, size: 18, tone: "var(--brand-soft)", duration: 13, delay: -2 },
  { x: 318, y: 190, size: 14, tone: "var(--green-300)", duration: 11, delay: -7 },
  { x: 468, y: 236, size: 16, tone: "var(--brand)", duration: 14, delay: -4.5 },
  { x: 92, y: 238, size: 12, tone: "var(--green-300)", duration: 12, delay: -9 },
  { x: 540, y: 116, size: 13, tone: "var(--brand-soft)", duration: 15, delay: -11 },
];

const MOTES = [
  { cx: 420, cy: 226, r: 2.2, duration: 9, delay: -1 },
  { cx: 470, cy: 300, r: 1.6, duration: 11, delay: -5 },
  { cx: 360, cy: 262, r: 1.8, duration: 10, delay: -3 },
  { cx: 300, cy: 332, r: 1.4, duration: 12, delay: -8 },
  { cx: 520, cy: 236, r: 2, duration: 9.5, delay: -6 },
  { cx: 252, cy: 196, r: 1.5, duration: 10.5, delay: -2.5 },
  { cx: 392, cy: 168, r: 1.3, duration: 13, delay: -9.5 },
  { cx: 176, cy: 304, r: 1.7, duration: 11.5, delay: -4 },
];

export function GardenPathScene() {
  return (
    <svg viewBox="0 0 600 560" className={styles.scene} aria-hidden="true" focusable="false">
      <defs>
        <symbol id="gp-frond" viewBox="0 0 60 120" overflow="visible">
          <path d="M30 120C30 92 31 62 34 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M30.6 98C18 94 9 84 7 70c12 2 21 12 23.6 28Z" fill="currentColor" />
          <path d="M31.4 80C43 74 51 62 51 48c-12 4-20 16-19.6 32Z" fill="currentColor" />
          <path d="M32.2 60C21 56 13 46 12 34c11 2 19 12 20.2 26Z" fill="currentColor" />
          <path d="M33 43c9-6 15-16 14-28-9 4-15 14-14 28Z" fill="currentColor" />
          <path d="M34 25c-4-8-3-16 2-23 5 6 4 16-2 23Z" fill="currentColor" />
        </symbol>

        <symbol id="gp-leaf" viewBox="0 0 24 24" overflow="visible">
          <path d="M3 21C3 11 10 3 21 3c0 11-8 18-18 18Z" fill="currentColor" />
          <path d="M5 19 16.5 7.5" fill="none" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1" strokeLinecap="round" />
        </symbol>

        <radialGradient id="gp-glow">
          <stop offset="0%" className={styles.glowStart} />
          <stop offset="100%" className={styles.glowEnd} />
        </radialGradient>

        {/* Organic island that contains the landscape. The layers inside it
            still drift with the pointer while the island itself stays put. */}
        <clipPath id="gp-island">
          <path d="M34 262C34 128 162 34 318 38c160 4 250 110 250 250 0 150-118 256-270 256C142 544 34 410 34 262Z" />
        </clipPath>
      </defs>

      {/* Warm light, allowed to glow past the island's edge */}
      <g className={styles.layer} style={depth(4)}>
        <circle cx="438" cy="150" r="120" fill="url(#gp-glow)" />
        <circle className={styles.sun} cx="438" cy="150" r="34" />
      </g>

      <g clipPath="url(#gp-island)">
        {/* Sky wash */}
        <g className={styles.layer} style={depth(4)}>
          <path
            className={styles.blob}
            d="M88 168C120 86 214 34 318 40c112 6 206 64 238 160 30 92-4 196-86 250-84 56-214 64-310 26C66 440 22 348 40 262c7-34 25-66 48-94Z"
          />
        </g>

        {/* Distant hills */}
        <g className={styles.layer} style={depth(7)}>
          <path
            className={styles.hills}
            d="M0 336c60-36 138-50 198-40 58 10 114 38 170 36 60-2 104-34 156-30 34 3 58 16 76 30v200H0Z"
          />
        </g>

        {/* Ground, the path, and the trail that leaves it */}
        <g className={styles.layer} style={depth(10)}>
          <path className={styles.ground} d="M-20 420c70-26 170-38 256-34 96 4 170 30 260 26 44-2 88-10 124-18v186H-20Z" />
          <path
            className={styles.path}
            d="M250 560C262 500 208 470 236 430c24-34 114-38 156-78 8-8 12-16 12-22h10c2 12-4 24-16 34-38 34-108 54-108 86 0 34 70 54 82 110Z"
          />
          {STONES.map((stone) => (
            <ellipse key={`${stone.cx}-${stone.cy}`} className={styles.stone} {...stone} />
          ))}
          {TUFTS.map((tuft) => (
            <path
              key={`${tuft.x}-${tuft.y}`}
              className={styles.tuft}
              transform={`translate(${tuft.x} ${tuft.y})`}
              d="M0 0c-2-8-1-15 2-20M4 0c0-9 2-15 6-19M8 0c2-6 5-10 10-12"
            />
          ))}
          <path className={styles.trail} d="M312 528C290 500 258 470 262 452s-32-32-76-48c-36-12-58-32-68-54" />
        </g>
      </g>

      {/* The signpost, a snapped plank and a dropped trowel */}
      <g className={styles.layer} style={depth(14)}>
        <g className={styles.sign}>
          <rect className={styles.post} x="112" y="270" width="10" height="136" rx="3" />
          <g className={styles.boardSway}>
            <g className={styles.boardTilt}>
              <path className={styles.board} d="M50 262h118a8 8 0 0 1 8 8v38a8 8 0 0 1-8 8H50l-16-27Z" />
              <path className={styles.grain} d="M58 276h96M62 290h84M58 304h92" />
              <circle className={styles.nail} cx="117" cy="274" r="2.4" />
              <text className={styles.signText} x="113" y="301" textAnchor="middle">
                404
              </text>
            </g>
          </g>
          <path className={styles.plank} d="M134 402l52 12a4 4 0 0 1 3 4.8l-2 8a4 4 0 0 1-4.8 3l-52-12 4-6-2-4Z" />
        </g>

        <g transform="rotate(-18 432 474)">
          <rect className={styles.handle} x="386" y="468" width="36" height="12" rx="6" />
          <rect className={styles.ferrule} x="420" y="469" width="8" height="10" rx="2" />
          <path className={styles.blade} d="M428 466c14-6 34-4 46 8-12 12-32 14-46 8Z" />
        </g>
      </g>

      {/* Foreground foliage, breaking the island's silhouette */}
      <g className={styles.layer} style={depth(20)}>
        {FRONDS.map((frond) => (
          <g
            key={`${frond.x}-${frond.y}`}
            className={styles.sway}
            style={{ ...timing(frond.duration, frond.delay), color: frond.tone }}
          >
            <use
              href="#gp-frond"
              x={frond.x}
              y={frond.y}
              width={frond.width}
              height={frond.height}
              transform={frond.flip ? `matrix(-1 0 0 1 ${2 * frond.x + frond.width} 0)` : undefined}
            />
          </g>
        ))}
      </g>

      {/* Drifting leaves and pollen */}
      <g className={styles.layer} style={depth(26)}>
        {LEAVES.map((leaf) => (
          <g
            key={`${leaf.x}-${leaf.y}`}
            className={styles.drift}
            style={{ ...timing(leaf.duration, leaf.delay), color: leaf.tone }}
          >
            <use href="#gp-leaf" x={leaf.x} y={leaf.y} width={leaf.size} height={leaf.size} />
          </g>
        ))}
        {MOTES.map((mote) => (
          <circle
            key={`${mote.cx}-${mote.cy}`}
            className={styles.mote}
            cx={mote.cx}
            cy={mote.cy}
            r={mote.r}
            style={timing(mote.duration, mote.delay)}
          />
        ))}
      </g>
    </svg>
  );
}
