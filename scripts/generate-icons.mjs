/**
 * Generates every favicon and app icon from the brand mark in config/brand.ts.
 *
 * Run with `npm run icons` after changing the mark or the brand colours.
 *
 * Output:
 *   app/icon.svg                     modern browsers; scales to any size
 *   app/favicon.ico                  16, 32 and 48px, for legacy browsers and bookmarks
 *   app/apple-icon.png               180px, full bleed (iOS applies its own mask)
 *   public/icons/icon-192.png        web app manifest
 *   public/icons/icon-512.png        web app manifest
 *   public/icons/icon-maskable-512.png   Android adaptive icon, mark inside the safe zone
 *
 * Next.js turns the three app/ files into <link> tags automatically; the
 * manifest (app/manifest.ts) references the public/icons files. None of these
 * outputs is ever hand-edited.
 *
 * Node loads config/brand.ts directly through its built-in TypeScript type
 * stripping, so the mark geometry has exactly one source.
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

import { BRAND_COLORS, BRAND_MARK } from "../config/brand.ts";

const CANVAS = 512;

/** Centre of the mark's visual bounds on its 24-unit grid (it sits low and slightly right). */
const MARK_CENTER = { x: 12.3, y: 13.3 };
/** Height of the mark's visual bounds, including stroke, in grid units. */
const MARK_HEIGHT = 16;

/**
 * @param {object} options
 * @param {number} options.corner  Corner radius as a fraction of the icon. 0 is square.
 * @param {number} options.inset   Padding around the mark as a fraction of the icon.
 * @param {number} options.stroke  Stem stroke width in grid units. Heavier at small sizes.
 */
function iconSvg({ corner, inset, stroke }) {
  const scale = (CANVAS * (1 - inset * 2)) / MARK_HEIGHT;
  const leaves = BRAND_MARK.leaves.map((d) => `<path d="${d}" fill="${BRAND_COLORS.onPrimary}"/>`).join("");

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CANVAS} ${CANVAS}" width="${CANVAS}" height="${CANVAS}">`,
    `<rect width="${CANVAS}" height="${CANVAS}" rx="${CANVAS * corner}" fill="${BRAND_COLORS.primary}"/>`,
    `<g transform="translate(${CANVAS / 2} ${CANVAS / 2}) scale(${scale.toFixed(3)}) translate(${-MARK_CENTER.x} ${-MARK_CENTER.y})"`,
    ` stroke="${BRAND_COLORS.onPrimary}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">`,
    `<path d="${BRAND_MARK.stem}" fill="none"/>${leaves}`,
    `</g></svg>`,
  ].join("");
}

async function renderPng(svg, size) {
  return sharp(Buffer.from(svg)).resize(size, size).png({ compressionLevel: 9 }).toBuffer();
}

/**
 * Packs PNG frames into a single .ico. Every browser in use today accepts PNG
 * payloads inside ICO, which keeps the frames lossless and small.
 */
function buildIco(frames) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(frames.length, 4);

  let offset = header.length + 16 * frames.length;
  const entries = frames.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...frames.map((frame) => frame.data)]);
}

async function run() {
  await mkdir("public/icons", { recursive: true });

  const rounded = { corner: 0.22, inset: 0.16 };

  // Scalable tab icon.
  await writeFile("app/icon.svg", iconSvg({ ...rounded, stroke: 2.2 }));

  // Legacy favicon: heavier strokes as the pixel count drops.
  const faviconFrames = await Promise.all(
    [
      { size: 16, stroke: 2.8 },
      { size: 32, stroke: 2.4 },
      { size: 48, stroke: 2.2 },
    ].map(async ({ size, stroke }) => ({ size, data: await renderPng(iconSvg({ ...rounded, stroke }), size) })),
  );
  await writeFile("app/favicon.ico", buildIco(faviconFrames));

  // iOS masks its own corners, so the source is a full-bleed square.
  await writeFile("app/apple-icon.png", await renderPng(iconSvg({ corner: 0, inset: 0.2, stroke: 1.9 }), 180));

  // Manifest icons.
  const anyIcon = iconSvg({ corner: 0.22, inset: 0.18, stroke: 1.9 });
  await writeFile("public/icons/icon-192.png", await renderPng(anyIcon, 192));
  await writeFile("public/icons/icon-512.png", await renderPng(anyIcon, 512));

  // Maskable: full bleed, with the mark well inside the central safe zone.
  await writeFile(
    "public/icons/icon-maskable-512.png",
    await renderPng(iconSvg({ corner: 0, inset: 0.3, stroke: 1.9 }), 512),
  );

  console.log("Generated app/icon.svg, app/favicon.ico, app/apple-icon.png and public/icons/*");
}

run();
