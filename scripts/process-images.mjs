/**
 * Source-asset pipeline: `gardening images/` to `public/images/`.
 *
 * Run with `npm run images`. Idempotent and incremental: re-run whenever new
 * source artwork lands. Slots whose source file is not there yet are listed and
 * skipped, so images can be delivered a few at a time.
 *
 * What it does per slot:
 *   1. Enforces the aspect ratio from resources/image-generation.md by
 *      cover-cropping, using sharp's attention strategy so the salient part of
 *      the frame survives the crop.
 *   2. Never upscales. The target size is clamped to what the source can
 *      actually provide at the required ratio, so no slot ships interpolated
 *      pixels.
 *   3. Encodes to WebP, except the Open Graph card, which stays JPEG because
 *      several social crawlers and messaging previews still handle WebP
 *      unreliably.
 *
 * next/image re-encodes these to AVIF or WebP per request at the size each
 * breakpoint asks for, so these files are masters, not what the browser gets.
 *
 * A newly processed tool category image is not shown on the site until its
 * `image` (with alt text describing the actual photograph) is added to that
 * category in data/toolCategories.ts.
 */
import sharp from "sharp";
import { mkdir, readdir, stat } from "node:fs/promises";
import { join } from "node:path";

const SOURCE_DIR = "gardening images";
const OUT_DIR = "public/images";

/** @typedef {{ source: string, out: string, width: number, height: number, format?: "webp" | "jpeg", position?: string }} Slot */

/**
 * Slot table. The first batch of `source` names are the raw filenames as they
 * were delivered (several arrived with stray characters or a double extension),
 * which is why the mapping is explicit rather than inferred. Slots added later
 * use clean names that match their output.
 */
/** @type {Slot[]} */
const SLOTS = [
  // Hero
  { source: "hero-main.png", out: "hero-main", width: 2400, height: 1600, position: "left" },
  { source: "hero-detail.png", out: "hero-detail", width: 1000, height: 1250 },

  // About
  { source: "about-preview.png", out: "about-preview", width: 1200, height: 1600 },

  // Tool categories (4:3): photographed
  { source: "hand-tools.png", out: "category-hand-tools", width: 1200, height: 900 },
  { source: "digging-tools.png", out: "category-digging-tools", width: 1200, height: 900 },
  { source: "pruning-tools.png", out: "category-pruning-tools", width: 1200, height: 900 },
  { source: "-watering-tools.png", out: "category-watering-tools", width: 1200, height: 900 },
  { source: "garden-accessories.png", out: "category-garden-accessories", width: 1200, height: 900 },

  // Tool categories (4:3): awaiting photography
  { source: "category-garden-utility.png", out: "category-garden-utility", width: 1200, height: 900 },
  { source: "category-lawn-mowers.png", out: "category-lawn-mowers", width: 1200, height: 900 },
  { source: "category-brush-cutters.png", out: "category-brush-cutters", width: 1200, height: 900 },
  { source: "category-hedge-trimmers.png", out: "category-hedge-trimmers", width: 1200, height: 900 },
  { source: "category-chainsaws.png", out: "category-chainsaws", width: 1200, height: 900 },
  { source: "category-tillers.png", out: "category-tillers", width: 1200, height: 900 },
  { source: "category-sprayers.png", out: "category-sprayers", width: 1200, height: 900 },
  { source: "category-blowers.png", out: "category-blowers", width: 1200, height: 900 },
  { source: "category-irrigation.png", out: "category-irrigation", width: 1200, height: 900 },

  // Why choose us
  { source: "why-choose.png", out: "why-choose", width: 1200, height: 1600 },

  // Featured tools (1:1)
  { source: "pruning-shears.png", out: "tool-pruning-shears", width: 1200, height: 1200 },
  { source: "hand-trowel.png", out: "tool-hand-trowel", width: 1200, height: 1200 },
  { source: "garden-spade.png", out: "tool-garden-spade", width: 1200, height: 1200 },
  { source: "watering-can.png", out: "tool-watering-can", width: 1200, height: 1200 },

  // Services (16:10)
  { source: "tool-selection.png", out: "service-tool-selection", width: 1600, height: 1000 },
  { source: "garden-setup.png", out: "service-garden-setup", width: 1600, height: 1000 },
  { source: "tool-care.png", out: "service-tool-care", width: 1600, height: 1000 },
  { source: "professional-support.png", out: "service-professional-support", width: 1600, height: 1000 },

  // Resources (4:3)
  { source: "choosing-tools.png", out: "resource-choosing-tools", width: 1200, height: 900 },
  { source: "ssential-tools.png", out: "resource-essential-tools", width: 1200, height: 900 },
  { source: "clean-maintain.png", out: "resource-clean-maintain", width: 1200, height: 900 },

  // Community story (21:9)
  { source: "community-story.png", out: "community-story", width: 2520, height: 1080 },

  // Testimonials (1:1)
  { source: "testimonial-01.png", out: "testimonial-01", width: 400, height: 400 },
  { source: "testimonial-02.png", out: "testimonial-02", width: 400, height: 400 },
  { source: "`testimonial-03.png", out: "testimonial-03", width: 400, height: 400 },

  // Open Graph card
  { source: "og-home..png", out: "og-home", width: 1200, height: 630, format: "jpeg" },
];

function outputName(slot) {
  return `${slot.out}.${slot.format === "jpeg" ? "jpg" : "webp"}`;
}

/**
 * Largest size at the required ratio that the source can fill without being
 * enlarged. sharp's `withoutEnlargement` is not enough on its own: with
 * `fit: cover` it silently abandons the requested ratio when the target is
 * larger than the source, which would let mismatched crops through.
 */
function fitWithinSource(target, source) {
  const ratio = target.width / target.height;
  const maxWidth = Math.min(target.width, source.width, source.height * ratio);
  return {
    width: Math.round(maxWidth),
    height: Math.round(maxWidth / ratio),
  };
}

async function processSlot(slot) {
  const inputPath = join(SOURCE_DIR, slot.source);
  const outputPath = join(OUT_DIR, outputName(slot));

  const image = sharp(inputPath);
  const meta = await image.metadata();
  const size = fitWithinSource(slot, { width: meta.width ?? 0, height: meta.height ?? 0 });

  const pipeline = image.resize({
    width: size.width,
    height: size.height,
    fit: "cover",
    // `left` keeps the hero's subject in frame: the layout bleeds that image off
    // the right edge of the viewport, so a centre crop would push the subject
    // under the fold of the plate.
    position: slot.position ?? sharp.strategy.attention,
  });

  if (slot.format === "jpeg") {
    await pipeline.jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: "4:4:4" }).toFile(outputPath);
  } else {
    await pipeline.webp({ quality: 82, effort: 6 }).toFile(outputPath);
  }

  const [inStat, outStat] = await Promise.all([stat(inputPath), stat(outputPath)]);
  const capped = size.width < slot.width ? ` (capped from ${slot.width}px, source is only ${meta.width}px)` : "";

  return {
    sourceBytes: inStat.size,
    outputBytes: outStat.size,
    line:
      `${slot.out.padEnd(30)} ${String(size.width).padStart(4)}x${String(size.height).padEnd(4)} ` +
      `${String(Math.round(outStat.size / 1024)).padStart(5)} KB  (was ${Math.round(inStat.size / 1024)} KB)${capped}`,
  };
}

async function run() {
  await mkdir(OUT_DIR, { recursive: true });

  const available = new Set(await readdir(SOURCE_DIR));
  const ready = SLOTS.filter((slot) => available.has(slot.source));
  const pending = SLOTS.filter((slot) => !available.has(slot.source));

  let sourceBytes = 0;
  let outputBytes = 0;

  for (const slot of ready) {
    const result = await processSlot(slot);
    sourceBytes += result.sourceBytes;
    outputBytes += result.outputBytes;
    console.log(result.line);
  }

  if (ready.length > 0) {
    console.log(
      `\n${ready.length} images: ${(sourceBytes / 1024 / 1024).toFixed(1)} MB to ` +
        `${(outputBytes / 1024 / 1024).toFixed(1)} MB ` +
        `(${Math.round((1 - outputBytes / sourceBytes) * 100)}% smaller)`,
    );
  }

  if (pending.length > 0) {
    console.log(`\n${pending.length} slot(s) waiting for source artwork in "${SOURCE_DIR}/":`);
    for (const slot of pending) {
      console.log(`  - ${slot.source.padEnd(32)} -> ${OUT_DIR}/${outputName(slot)}`);
    }
  }
}

run();
