/**
 * The lawn preloader scene: geometry, palettes and the three motion helpers.
 *
 * Ported from the client's Claude Design composition, `Lawn Preloader.dc.html`
 * and the `LawnPreloader.jsx` it imports. The design ran inside that tool's
 * authoring runtime (`animations-v3.jsx` for the clock and easing,
 * `tweaks-panel.jsx` for the editor sliders, `support.js` for the page loader).
 * None of that runtime is shipped here: the clock is a request-animation-frame
 * loop in `Preloader.tsx`, the easing and tween helpers are the four functions
 * below, and the editor panel is replaced by the `TWEAKS` constants, which hold
 * the values the design was saved with.
 *
 * Everything here is deterministic. The field is built from a seeded generator
 * so the server and the client produce byte-identical geometry, and the whole
 * composition is a pure function of one authored time `t`, exactly as the
 * design intended. Nothing reads the wall clock.
 *
 * The one thing the design did not have to solve is the site's two themes. It
 * is a warm dawn scene on a cream sky, which is right in the light theme and
 * wrong in the dark one, so the environment palette below exists twice. The
 * mower is not themed: a machine is the same machine at dawn or at dusk, and
 * the light on it comes from the wash and the vignette.
 */

/* -------------------------------------------------------------------------- */
/* Stage                                                                      */
/* -------------------------------------------------------------------------- */

export const W = 1600;
export const H = 900;
export const HORIZON = 292;

/** Authored length of the timeline, in seconds. */
export const TOTAL = 5.0;

/**
 * Scene starts, in authored seconds. The design tool derived these from its
 * `OM_SCENES` list as a running sum of the durations before each scene:
 * Dawn 0.5, Growth 1.4, Lush 0.5, Mow 1.9, Settle 0.7.
 */
export const CUES = {
  Dawn: 0,
  Growth: 0.5,
  Lush: 1.9,
  Mow: 2.4,
  Settle: 4.3,
} as const;

/**
 * Wall-clock milliseconds for each stretch of the authored timeline.
 *
 * The design loops for as long as you watch it, so it plays every scene at its
 * authored speed. A preloader has to end, and compressing all five seconds
 * uniformly made the mower cross nearly two screen widths in about a second,
 * which read as a machine being yanked across the frame rather than mowing.
 *
 * So the timeline is warped rather than scaled: per-section re-timing is part
 * of the design tool's own model, and it is what keeps the mow close to the
 * speed it was authored at while the beats on either side stay brisk. The
 * boundaries are the mower's own travel window, not the scene names, because
 * its glide starts before the Mow cue and finishes inside Settle.
 *
 * Raise the middle number to slow the mower further; it is the only one that
 * changes how the machine reads.
 */
export const TIMELINE = [
  /** Dawn, and the grass rising. */
  { until: 2.18, ms: 850 },
  /** The mower's full travel, entrance to exit. */
  { until: 4.72, ms: 2100 },
  /** Clippings settling on a clean lawn. */
  { until: 5.0, ms: 250 },
] as const;

/** Total wall-clock length of the arc. */
export const RUN_MS = TIMELINE.reduce((total, segment) => total + segment.ms, 0);

/** Elapsed milliseconds to authored seconds, through the warp above. */
export function authoredTime(elapsed: number): number {
  let spent = 0;
  let from = 0;
  for (const segment of TIMELINE) {
    if (elapsed <= spent + segment.ms) {
      return from + ((elapsed - spent) / segment.ms) * (segment.until - from);
    }
    spent += segment.ms;
    from = segment.until;
  }
  return TOTAL;
}

/** The values saved in the design's `OM_TWEAKS` block. */
export const TWEAKS = {
  grassHeight: 1,
  sunGlow: 1,
  depthBlur: true,
} as const;

/* -------------------------------------------------------------------------- */
/* Motion                                                                     */
/* -------------------------------------------------------------------------- */

export const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

type Ease = (t: number) => number;

const easeOutCubic: Ease = (t) => --t * t * t + 1;
const easeInOutSine: Ease = (t) => -(Math.cos(Math.PI * t) - 1) / 2;
const easeInOutQuad: Ease = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

/** Single-segment tween. Holds `from` before `start` and `to` after `end`. */
function animate(from: number, to: number, start: number, end: number, ease: Ease) {
  return (t: number) => {
    if (t <= start) return from;
    if (t >= end) return to;
    return from + (to - from) * ease((t - start) / (end - start));
  };
}

/** The only easing in the piece, as the design authored it. */
export const MOTION = {
  rise: (from: number, to: number, start: number, end: number) =>
    animate(from, to, start, end, easeOutCubic),
  glide: (from: number, to: number, start: number, end: number) =>
    animate(from, to, start, end, easeInOutSine),
  pulse: (from: number, to: number, start: number, end: number) =>
    animate(from, to, start, end, easeInOutQuad),
};

/* -------------------------------------------------------------------------- */
/* Colour                                                                     */
/* -------------------------------------------------------------------------- */

const hx = (c: string): [number, number, number] => [
  parseInt(c.slice(1, 3), 16),
  parseInt(c.slice(3, 5), 16),
  parseInt(c.slice(5, 7), 16),
];

const toHex = (a: number[]) =>
  "#" + a.map((v) => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, "0")).join("");

export function mix(a: string, b: string, t: number): string {
  const A = hx(a);
  const B = hx(b);
  return toHex([0, 1, 2].map((i) => A[i] + (B[i] - A[i]) * t));
}

export interface LawnPalette {
  /** Four sky gradient stops, horizon last. */
  sky: readonly [string, string, string, string];
  /** Five turf gradient stops, far to near. */
  turf: readonly [string, string, string, string, string];
  /** Atmospheric haze mixed into the far band. */
  haze: string;
  /** Mixed into the near band to push it into shadow. */
  shade: string;
  /** Deepened further in the blade gradients. */
  shadeDeep: string;
  /** The darkest stop of every blade gradient. */
  root: string;
  /** Blade base colours, one per bucket. */
  base: readonly [string, string, string, string];
  /** Blade tip colours, one per bucket. */
  tip: readonly [string, string, string, string];
  /** Flying clipping colours, one per bucket. */
  clip: readonly [string, string, string, string];
  /** The light source: core, mid and outer stop of its glow. */
  light: readonly [string, string, string];
  /** The disc of the sun or moon. */
  disc: string;
  /** Drifting motes. */
  mote: string;
  /** The band of haze sitting on the horizon line. */
  horizonHaze: string;
  /** Ground shadow pooled at the bottom of the frame. */
  groundShade: string;
  /** Directional wash across the whole frame: near, mid, far. */
  wash: readonly [string, string, string];
  /** Flat warm or cool tint over everything. */
  tint: string;
  /** Vignette, inner then outer. */
  vignette: readonly [string, string];
  /** The mower's cast shadow. */
  mowerShadow: string;
}

/**
 * Light theme: the dawn scene exactly as the design saved it.
 */
export const DAWN: LawnPalette = {
  sky: ["#E3D9B4", "#EFE7C8", "#F4EEDA", "#EFEEDD"],
  turf: ["#C4D2AB", "#7CA062", "#3E7636", "#225C26", "#11461C"],
  haze: "#E4EBD6",
  shade: "#0B2C14",
  shadeDeep: "#08210F",
  root: "#08210F",
  base: ["#14471C", "#1A5623", "#22662A", "#2E7430"],
  tip: ["#3F7F35", "#54913C", "#69A445", "#86BA54"],
  clip: ["#7FB259", "#93C267", "#A7D07A", "#C0DF95"],
  light: ["#FFF3CE", "#F6D98C", "#D8A92E"],
  disc: "#FFF6DC",
  mote: "#FFF4D2",
  horizonHaze: "#EDE4C6",
  groundShade: "#0E3F1C",
  wash: ["#FFD684", "#FFCE72", "#123B1C"],
  tint: "#F7C96B",
  vignette: ["#123B1C", "#0B2C14"],
  mowerShadow: "#07200E",
};

/**
 * Dark theme: the same lawn after sundown.
 *
 * Not an inversion of the dawn palette. The sky darkens toward the top rather
 * than the horizon, the light source becomes a cool moon instead of a warm sun,
 * the wash goes blue, and the grass keeps its relationship (roots dark, tips
 * light) while the whole range shifts down so it still separates against a
 * near-black canvas.
 */
export const DUSK: LawnPalette = {
  sky: ["#06110B", "#0A1A11", "#112619", "#17331F"],
  turf: ["#3B5C41", "#2A4A30", "#1D3A25", "#142C1B", "#0A1B10"],
  haze: "#2E4738",
  shade: "#04100A",
  shadeDeep: "#030C06",
  root: "#030C06",
  base: ["#0C2612", "#113018", "#163A1C", "#1C4622"],
  tip: ["#2E6A2F", "#3C7E38", "#4C9243", "#63A954"],
  clip: ["#6FA050", "#82B05F", "#96C070", "#A9CE83"],
  light: ["#E8F2F6", "#A9C6D6", "#3E5C6B"],
  disc: "#EEF5F8",
  mote: "#DCEAF2",
  horizonHaze: "#8FA9A0",
  groundShade: "#03100A",
  wash: ["#9FC4DC", "#7FA8C9", "#05130B"],
  tint: "#7FA8C9",
  vignette: ["#05130B", "#020806"],
  mowerShadow: "#020A05",
};

/* -------------------------------------------------------------------------- */
/* Deterministic field                                                        */
/* -------------------------------------------------------------------------- */

/** Linear congruential generator. Seeded, so server and client agree exactly. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const GOLD = 0.6180339887;

export interface Band {
  d0: number;
  d1: number;
  n: number;
  /** Gaussian blur radius, which is what gives the scene its depth of field. */
  blur: number;
  haze: number;
  shade: number;
}

export const BANDS: readonly Band[] = [
  { d0: 0.0, d1: 0.4, n: 430, blur: 3.0, haze: 0.34, shade: 0.0 },
  { d0: 0.4, d1: 0.8, n: 360, blur: 0.4, haze: 0.05, shade: 0.0 },
  { d0: 0.8, d1: 1.0, n: 130, blur: 8.0, haze: 0.0, shade: 0.34 },
];

export interface Blade {
  d: number;
  baseY: number;
  sc: number;
  x: number;
  hTall: number;
  w: number;
  lean: number;
  k: number;
  amp: number;
  phase: number;
  delay: number;
  bucket: number;
}

export interface BuiltBand extends Band {
  bi: number;
  blades: Blade[];
  /** Gradient anchors: the lowest base and the highest tip in the band. */
  gy1: number;
  gy2: number;
}

function buildField(): BuiltBand[] {
  const r = rng(20260920);
  return BANDS.map((band, bi) => {
    const blades: Blade[] = [];
    for (let i = 0; i < band.n; i++) {
      const d = band.d0 + ((i + r() * 0.9) / band.n) * (band.d1 - band.d0);
      const persp = Math.pow(d, 1.75);
      const baseY = HORIZON + 14 + persp * (1030 - HORIZON);
      const sc = 0.16 + Math.pow(d, 1.5) * 1.75;
      const jx = ((i * GOLD + r() * 0.35) % 1) - 0.5;
      blades.push({
        d,
        baseY,
        sc,
        x: W * 0.5 + jx * W * (1.12 + d * 0.95),
        hTall: (150 + r() * 140) * sc,
        w: (3.0 + r() * 2.3) * sc,
        lean: (r() - 0.5) * 0.85,
        k: 2 + Math.floor(r() * 4),
        amp: (9 + r() * 17) * sc,
        phase: r() * Math.PI * 2,
        delay: r() * 0.5 + (1 - d) * 0.14,
        bucket: Math.floor(r() * 4),
      });
    }
    blades.sort((a, b) => a.baseY - b.baseY);
    return {
      ...band,
      bi,
      blades,
      gy1: Math.max(...blades.map((b) => b.baseY)),
      gy2: Math.min(...blades.map((b) => b.baseY - b.hTall)),
    };
  });
}

export const FIELD = buildField();

/* -------------------------------------------------------------------------- */
/* Static turf mat                                                            */
/* -------------------------------------------------------------------------- */

function bandColor(band: Band, palette: LawnPalette, k: number, t: number): string {
  let c = mix(palette.base[k], palette.tip[k], t);
  if (band.haze) c = mix(c, palette.haze, band.haze * 0.9);
  if (band.shade) c = mix(c, palette.shade, band.shade);
  return c;
}

/**
 * The dense short-grass mat under the animated blades.
 *
 * Built once per band into four joined path strings, so nearly six thousand
 * blades of texture cost twelve path elements and nothing per frame. Only the
 * geometry is cached; the fills are resolved per palette, which is what lets
 * the same mat serve both themes.
 */
const TURF_GEOMETRY: string[][] = (() => {
  const r = rng(99127);
  const counts = [2600, 2400, 900];
  return BANDS.map((band, bi) => {
    const parts: string[][] = [[], [], [], []];
    const n = counts[bi];
    for (let i = 0; i < n; i++) {
      const d = band.d0 + ((i + r() * 0.9) / n) * (band.d1 - band.d0);
      const persp = Math.pow(d, 1.75);
      const baseY = HORIZON + 14 + persp * (1030 - HORIZON);
      const sc = 0.16 + Math.pow(d, 1.5) * 1.75;
      const jx = ((i * GOLD * 3 + r() * 0.45) % 1) - 0.5;
      const x = W * 0.5 + jx * W * (1.14 + d * 0.95);
      const h = (16 + r() * 27) * sc;
      const w = (1.9 + r() * 1.7) * sc;
      const bend = (r() - 0.5) * h * 1.15;
      const cx = x + bend * 0.4;
      const cy = baseY - h * 0.55;
      parts[Math.floor(r() * 4)].push(
        "M" +
          (x - w).toFixed(1) +
          "," +
          baseY.toFixed(1) +
          "Q" +
          (cx - w * 0.5).toFixed(1) +
          "," +
          cy.toFixed(1) +
          " " +
          (x + bend).toFixed(1) +
          "," +
          (baseY - h).toFixed(1) +
          "Q" +
          (cx + w * 0.5).toFixed(1) +
          "," +
          cy.toFixed(1) +
          " " +
          (x + w).toFixed(1) +
          "," +
          baseY.toFixed(1) +
          "Z",
      );
    }
    return parts.map((p) => p.join(""));
  });
})();

export function turfFor(palette: LawnPalette) {
  return TURF_GEOMETRY.map((paths, bi) =>
    paths.map((d, k) => ({ d, fill: bandColor(BANDS[bi], palette, k, 0.16 + k * 0.13) })),
  );
}

/* -------------------------------------------------------------------------- */
/* Clippings and motes                                                        */
/* -------------------------------------------------------------------------- */

export const MOW_START = -580;
export const MOW_END = 2200;

export interface Clip {
  sx: number;
  u0: number;
  vx: number;
  life: number;
  size: number;
  yoff: number;
  rot: number;
  spin: number;
  bucket: number;
}

export const CLIPS: Clip[] = (() => {
  const r = rng(7731);
  const out: Clip[] = [];
  for (let i = 0; i < 260; i++) {
    out.push({
      sx: MOW_START + 260 + r() * (MOW_END - MOW_START - 420),
      u0: 150 + r() * 260,
      vx: -(60 + r() * 200),
      life: 0.26 + r() * 0.3,
      size: 5 + r() * 9,
      yoff: (r() - 0.5) * 54,
      rot: r() * 360,
      spin: (r() - 0.5) * 900,
      bucket: Math.floor(r() * 4),
    });
  }
  return out;
})();

export interface Mote {
  x: number;
  y: number;
  rx: number;
  ry: number;
  k: number;
  phase: number;
  s: number;
  o: number;
}

export const MOTES: Mote[] = (() => {
  const r = rng(4242);
  const out: Mote[] = [];
  for (let i = 0; i < 22; i++) {
    out.push({
      x: r() * W,
      y: 120 + r() * 620,
      rx: 40 + r() * 120,
      ry: 26 + r() * 70,
      k: 1 + Math.floor(r() * 3),
      phase: r() * Math.PI * 2,
      s: 1.4 + r() * 2.6,
      o: 0.12 + r() * 0.22,
    });
  }
  return out;
})();
