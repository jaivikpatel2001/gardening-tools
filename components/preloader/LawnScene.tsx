"use client";

import { useMemo } from "react";

import {
  CLIPS,
  CUES,
  FIELD,
  H,
  HORIZON,
  MOTES,
  MOTION,
  MOW_END,
  MOW_START,
  TOTAL,
  TWEAKS,
  W,
  clamp,
  mix,
  turfFor,
  type LawnPalette,
} from "@/components/preloader/lawn-scene";

/**
 * The lawn composition, rendered as a pure function of authored time `t`.
 *
 * A direct port of the client's `LawnPreloader.jsx` from Claude Design. The
 * shapes, the numbers and the choreography are the designer's; what changed is
 * that colour now comes from a palette object so the scene can be a dawn in the
 * light theme and a dusk in the dark one, and that the editor panel is gone.
 *
 * Nothing here reads the clock or holds state. `Preloader.tsx` owns the single
 * animation frame loop and passes `t` down, which is what keeps the whole
 * sequence reproducible and lets it be stepped through frame by frame.
 */

interface LawnSceneProps {
  /** Authored seconds, 0 to `TOTAL`. */
  t: number;
  palette: LawnPalette;
  /**
   * Depth of field. The three band blurs are the most expensive thing in the
   * frame, so a small or low-powered device turns them down rather than
   * dropping to a lower frame rate.
   */
  depthBlur?: boolean;
}

function Wheel({ cx, cy, r, roll }: { cx: number; cy: number; r: number; roll: number }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <circle r={r} fill="#101B13" />
      <circle r={r * 0.93} fill="none" stroke="#2A3A2E" strokeWidth={r * 0.1} />
      <g transform={`rotate(${roll})`}>
        {[0, 36, 72, 108, 144].map((a) => (
          <rect
            key={a}
            x={-r * 0.99}
            y={-r * 0.045}
            width={r * 1.98}
            height={r * 0.09}
            rx={r * 0.045}
            fill="#050D08"
            opacity="0.8"
            transform={`rotate(${a})`}
          />
        ))}
        <circle r={r * 0.45} fill="url(#lawnSteel)" />
        <g opacity="0.55">
          {[0, 72, 144, 216, 288].map((a) => (
            <rect
              key={a}
              x={-r * 0.05}
              y={-r * 0.42}
              width={r * 0.1}
              height={r * 0.3}
              rx={r * 0.05}
              fill="#5C6559"
              transform={`rotate(${a})`}
            />
          ))}
        </g>
        <circle r={r * 0.15} fill="#14231A" />
      </g>
    </g>
  );
}

/**
 * The mower. Deliberately not themed: it is the same machine whatever time of
 * day it is, and the light falling on it comes from the wash and the vignette
 * laid over the whole frame.
 */
function Mower({
  x,
  y,
  s,
  roll,
  shadow,
}: {
  x: number;
  y: number;
  s: number;
  roll: number;
  shadow: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="-14" cy="6" rx="262" ry="28" fill={shadow} opacity="0.55" filter="url(#lawnSoftBlur)" />

      {/* handle assembly, behind the machine */}
      <path d="M-200,-150 L-424,-402" stroke="#8E968A" strokeWidth="15" strokeLinecap="round" fill="none" />
      <path d="M-200,-150 L-424,-402" stroke="#EBEEE6" strokeWidth="4.5" strokeLinecap="round" fill="none" opacity="0.7" />
      <path d="M-150,-146 L-372,-396" stroke="#767E72" strokeWidth="12" strokeLinecap="round" fill="none" />
      <path d="M-150,-146 L-372,-396" stroke="#D3D8CD" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M-424,-402 L-372,-396" stroke="#8E968A" strokeWidth="11" strokeLinecap="round" fill="none" />
      <path d="M-436,-410 L-356,-400" stroke="#141E17" strokeWidth="26" strokeLinecap="round" fill="none" />
      <path d="M-436,-416 L-360,-407" stroke="#3F7F35" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.85" />
      <path d="M-392,-392 L-356,-362" stroke="#9AA396" strokeWidth="7" strokeLinecap="round" fill="none" />

      {/* grass catcher */}
      <path d="M-196,-52 C-292,-62 -342,-112 -336,-178 C-334,-204 -316,-216 -290,-212 L-196,-196 Z" fill="url(#lawnBag)" />
      <path
        d="M-290,-208 C-314,-212 -330,-202 -332,-178 C-336,-124 -300,-80 -226,-62 L-238,-88 C-286,-110 -308,-146 -302,-186 Z"
        fill="#A8C98D"
        opacity="0.10"
      />
      <path d="M-196,-196 L-292,-210" stroke="#B9C0B4" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.85" />

      {/* deck */}
      <path
        d="M-208,-34 L-208,-118 C-208,-140 -194,-152 -170,-152 L140,-152 C184,-152 214,-128 224,-90 L230,-56 C233,-38 222,-30 204,-30 L-208,-30 Z"
        fill="url(#lawnDeck)"
      />
      <path d="M-200,-146 L140,-146 C178,-146 204,-126 214,-96 L-200,-96 Z" fill="url(#lawnGloss)" opacity="0.45" />
      <path d="M-208,-62 L226,-62 L230,-56 C233,-38 222,-30 204,-30 L-208,-30 Z" fill="#0A2712" opacity="0.72" />
      <rect x="-208" y="-96" width="430" height="10" rx="5" fill="url(#lawnSteel)" />
      <rect x="-206" y="-78" width="404" height="4" rx="2" fill="#3F7F35" opacity="0.7" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={-40 + i * 46} y="-140" width="9" height="34" rx="4.5" fill="#07220F" opacity="0.45" transform="skewX(-12)" />
      ))}
      <path d="M216,-100 C238,-88 246,-62 240,-38 L206,-38 C216,-60 214,-84 202,-98 Z" fill="url(#lawnSteel)" opacity="0.9" />

      {/* motor */}
      <path d="M-86,-152 L-86,-232 C-86,-246 -76,-254 -60,-254 L56,-254 C74,-254 86,-244 86,-228 L86,-152 Z" fill="url(#lawnMotor)" />
      <path d="M-86,-152 L-86,-196 L86,-196 L86,-152 Z" fill="#1A5322" />
      <path d="M-86,-190 L86,-190 L86,-196 L-86,-196 Z" fill="#3F7F35" opacity="0.6" />
      <rect x="-90" y="-248" width="180" height="10" rx="5" fill="url(#lawnSteel)" opacity="0.92" />
      <rect x="-58" y="-218" width="116" height="5" rx="2.5" fill="#06180C" opacity="0.5" />
      <rect x="-58" y="-204" width="116" height="5" rx="2.5" fill="#06180C" opacity="0.5" />
      <rect x="-58" y="-234" width="116" height="5" rx="2.5" fill="#06180C" opacity="0.5" />
      <circle cx="-112" cy="-196" r="24" fill="url(#lawnSteel)" />
      <circle cx="-112" cy="-196" r="10" fill="#14231A" />
      <path d="M86,-236 L134,-236 C148,-236 156,-226 156,-214 L156,-176 C156,-164 148,-156 134,-156 L86,-156 Z" fill="#1A2A1E" />
      <rect x="92" y="-226" width="58" height="7" rx="3.5" fill="url(#lawnSteel)" opacity="0.7" />

      <Wheel cx={-154} cy={-38} r={66} roll={roll} />
      <Wheel cx={156} cy={-46} r={54} roll={roll * 1.22} />
    </g>
  );
}

export function LawnScene({ t, palette, depthBlur = TWEAKS.depthBlur }: LawnSceneProps) {
  const lush = TWEAKS.grassHeight;
  const glow = TWEAKS.sunGlow;

  // The turf mat is thousands of blades of static texture. Its geometry is
  // cached at module scope; only the fills depend on the palette, so this
  // recomputes on a theme change and never on a frame.
  const turf = useMemo(() => turfFor(palette), [palette]);

  // Camera. Periodic, so the design's loop seam stays exact even though this
  // port plays the timeline once.
  const cyc = 0.5 - 0.5 * Math.cos((2 * Math.PI * t) / TOTAL);
  const camS = 1.035 + 0.045 * cyc;
  const camY = 18 * cyc;

  const mowFrom = CUES.Mow - 0.22;
  const mowTo = CUES.Settle + 0.42;
  const mx = MOTION.glide(MOW_START, MOW_END, mowFrom, mowTo)(t);
  const mowing = t > mowFrom - 0.01 && t < mowTo + 0.2;
  const bob = mowing ? Math.sin(t * 26) * 2.2 : 0;
  const roll = (mx - MOW_START) * 0.62;

  /** Where the blade has reached at this depth. Blades behind it are cut. */
  const cutX = (d: number) => mx + (d - 0.64) * 170 + 128;

  const bandPaths = FIELD.map((band) => {
    const buckets: string[][] = [[], [], [], []];
    for (const b of band.blades) {
      const g0 = MOTION.rise(0, 1, CUES.Growth + b.delay, CUES.Growth + b.delay + 0.66)(t);
      const cut = clamp((cutX(b.d) - b.x) / 44, 0, 1);
      const g = g0 * (1 - cut);
      const h = b.hTall * (0.06 + 0.94 * g) * lush;
      const sway = Math.sin(((2 * Math.PI * b.k) / TOTAL) * t + b.phase) * b.amp * (0.28 + 0.72 * g);
      const ahead = b.x - cutX(b.d);
      // Grass just in front of the deck leans away before it is cut.
      const push = ahead > 0 && ahead < 150 ? (1 - ahead / 150) * 30 * b.sc * g : 0;
      const bend = b.lean * h * 0.34 + sway + push;
      const tipX = b.x + bend;
      const tipY = b.baseY - h;
      const cx = b.x + bend * 0.36;
      const cy = b.baseY - h * 0.56;
      const w = b.w;
      buckets[b.bucket].push(
        `M${(b.x - w).toFixed(1)},${b.baseY.toFixed(1)}Q${(cx - w * 0.5).toFixed(1)},${cy.toFixed(1)} ${tipX.toFixed(1)},${tipY.toFixed(1)}Q${(cx + w * 0.5).toFixed(1)},${cy.toFixed(1)} ${(b.x + w).toFixed(1)},${b.baseY.toFixed(1)}Z`,
      );
    }
    return buckets.map((d) => d.join(""));
  });

  const clipEls = [];
  if (mowing) {
    const span = mowTo - mowFrom;
    for (let i = 0; i < CLIPS.length; i++) {
      const c = CLIPS[i];
      // Each clipping is thrown when the deck passes its own x, which is found
      // by inverting the mower's eased glide rather than by a timer.
      const e = (c.sx - MOW_START) / (MOW_END - MOW_START);
      const tSp = mowFrom + (Math.acos(clamp(1 - 2 * e, -1, 1)) / Math.PI) * span;
      const age = t - tSp;
      if (age < 0 || age > c.life) continue;
      const up = c.u0 * age - 0.5 * 1400 * age * age;
      const px = c.sx - 70 + c.vx * age;
      const py = 748 + c.yoff - Math.max(up, 0);
      const op = Math.pow(clamp(1 - age / c.life, 0, 1), 0.75);
      clipEls.push(
        <rect
          key={i}
          x={-c.size}
          y={-c.size * 0.26}
          width={c.size * 2}
          height={c.size * 0.52}
          rx={c.size * 0.26}
          fill={palette.clip[c.bucket]}
          opacity={op}
          transform={`translate(${px.toFixed(1)} ${py.toFixed(1)}) rotate(${(c.rot + c.spin * age).toFixed(1)})`}
        />,
      );
    }
  }

  const flare =
    MOTION.pulse(0, 1, CUES.Lush - 0.25, CUES.Lush + 0.3)(t) *
    (1 - MOTION.pulse(0, 1, CUES.Mow + 0.1, CUES.Mow + 0.6)(t));

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      // The overlay is full screen at any aspect ratio, so the scene is cropped
      // rather than letterboxed, the same way a photographic plate is.
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <filter id="lawnSoftBlur" x="-30%" y="-60%" width="160%" height="260%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        {FIELD.map((b) => (
          <filter key={`f${b.bi}`} id={`lawnBandBlur${b.bi}`} x="-12%" y="-25%" width="124%" height="150%">
            <feGaussianBlur stdDeviation={depthBlur ? b.blur : 0.2} />
          </filter>
        ))}
        {FIELD.map((band) =>
          palette.base.map((_, k) => {
            let base = palette.base[k];
            let tip = palette.tip[k];
            if (band.haze) {
              base = mix(base, palette.haze, band.haze);
              tip = mix(tip, palette.haze, band.haze * 0.92);
            }
            if (band.shade) {
              base = mix(base, palette.shadeDeep, band.shade);
              tip = mix(tip, palette.groundShade, band.shade * 0.8);
            }
            return (
              <linearGradient
                key={`g${band.bi}${k}`}
                id={`lawnG${band.bi}${k}`}
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1={band.gy1}
                x2="0"
                y2={band.gy2}
              >
                <stop offset="0" stopColor={mix(base, palette.root, 0.35)} />
                <stop offset="0.45" stopColor={base} />
                <stop offset="1" stopColor={tip} />
              </linearGradient>
            );
          }),
        )}
        <linearGradient id="lawnSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={palette.sky[0]} />
          <stop offset="0.38" stopColor={palette.sky[1]} />
          <stop offset="0.78" stopColor={palette.sky[2]} />
          <stop offset="1" stopColor={palette.sky[3]} />
        </linearGradient>
        <linearGradient id="lawnTurf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={palette.turf[0]} />
          <stop offset="0.10" stopColor={palette.turf[1]} />
          <stop offset="0.30" stopColor={palette.turf[2]} />
          <stop offset="0.62" stopColor={palette.turf[3]} />
          <stop offset="1" stopColor={palette.turf[4]} />
        </linearGradient>
        <radialGradient id="lawnGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={palette.light[0]} stopOpacity="0.95" />
          <stop offset="0.35" stopColor={palette.light[1]} stopOpacity="0.45" />
          <stop offset="1" stopColor={palette.light[2]} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lawnDeck" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2F7A38" />
          <stop offset="0.42" stopColor="#164E20" />
          <stop offset="1" stopColor="#07220F" />
        </linearGradient>
        <linearGradient id="lawnMotor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#45564A" />
          <stop offset="0.5" stopColor="#223327" />
          <stop offset="1" stopColor="#131F17" />
        </linearGradient>
        <linearGradient id="lawnBag" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#17491F" />
          <stop offset="1" stopColor="#081F0E" />
        </linearGradient>
        <linearGradient id="lawnSteel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F2F4EE" />
          <stop offset="0.4" stopColor="#C2C8BC" />
          <stop offset="0.62" stopColor="#8E968A" />
          <stop offset="1" stopColor="#D6DACF" />
        </linearGradient>
        <linearGradient id="lawnGloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CFE6BE" stopOpacity="0.7" />
          <stop offset="1" stopColor="#CFE6BE" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lawnWash" x1="0" y1="0" x2="1" y2="0.35">
          <stop offset="0" stopColor={palette.wash[0]} stopOpacity="0.30" />
          <stop offset="0.45" stopColor={palette.wash[1]} stopOpacity="0.10" />
          <stop offset="1" stopColor={palette.wash[2]} stopOpacity="0.14" />
        </linearGradient>
        <radialGradient id="lawnVignette" cx="0.5" cy="0.48" r="0.72">
          <stop offset="0.5" stopColor={palette.vignette[0]} stopOpacity="0" />
          <stop offset="1" stopColor={palette.vignette[1]} stopOpacity="0.46" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width={W} height={H} fill="url(#lawnSky)" />
      <g opacity={glow}>
        <ellipse cx="368" cy="232" rx="520" ry="330" fill="url(#lawnGlow)" />
        <ellipse cx="368" cy="238" rx="86" ry="74" fill={palette.disc} opacity="0.85" filter="url(#lawnSoftBlur)" />
      </g>

      <g transform={`translate(${W / 2} ${H * 0.72}) scale(${camS}) translate(${-W / 2} ${-H * 0.72 - camY})`}>
        <rect x="-160" y={HORIZON} width={W + 320} height={H} fill="url(#lawnTurf)" />
        <rect x="-160" y={HORIZON - 14} width={W + 320} height="34" fill={palette.horizonHaze} opacity="0.30" filter="url(#lawnSoftBlur)" />
        <ellipse cx={W * 0.5} cy={H + 130} rx={W * 0.9} ry="330" fill={palette.groundShade} opacity="0.28" filter="url(#lawnSoftBlur)" />

        {/* far and mid grass: animated blades over the dense static mat */}
        {[0, 1].map((bi) => (
          <g key={bi} filter={`url(#lawnBandBlur${bi})`}>
            {turf[bi].map((mat, k) => (
              <path key={`t${k}`} d={mat.d} fill={mat.fill} />
            ))}
            {bandPaths[bi].map((d, k) => d && <path key={k} d={d} fill={`url(#lawnG${bi}${k})`} />)}
          </g>
        ))}

        {mowing ? <Mower x={mx} y={768 + bob} s={0.74} roll={roll} shadow={palette.mowerShadow} /> : null}
        <g>{clipEls}</g>

        {/* near foreground, thrown out of focus */}
        <g filter="url(#lawnBandBlur2)" opacity="0.96">
          {turf[2].map((mat, k) => (
            <path key={`t${k}`} d={mat.d} fill={mat.fill} />
          ))}
          {bandPaths[2].map((d, k) => d && <path key={k} d={d} fill={`url(#lawnG2${k})`} />)}
        </g>

        <g opacity={0.75 * glow}>
          {MOTES.map((m, i) => {
            const a = ((2 * Math.PI * m.k) / TOTAL) * t + m.phase;
            return (
              <circle
                key={i}
                cx={m.x + Math.cos(a) * m.rx}
                cy={m.y + Math.sin(a * 1.3) * m.ry}
                r={m.s}
                fill={palette.mote}
                opacity={m.o}
              />
            );
          })}
        </g>
      </g>

      {/* directional wash, flare and vignette */}
      <rect x="0" y="0" width={W} height={H} fill="url(#lawnWash)" style={{ mixBlendMode: "soft-light" }} />
      <rect
        x="0"
        y="0"
        width={W}
        height={H}
        fill={palette.tint}
        opacity={0.06 + 0.07 * flare}
        style={{ mixBlendMode: "soft-light" }}
      />
      <ellipse cx="368" cy="300" rx="900" ry="520" fill="url(#lawnGlow)" opacity={0.26 * flare * glow} />
      <rect x="0" y="0" width={W} height={H} fill="url(#lawnVignette)" />
    </svg>
  );
}
