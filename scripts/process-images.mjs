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
import { copyFile, mkdir, readdir, stat } from "node:fs/promises";
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

  /* One slot per product, 4:3, in catalogue order. Each is the lead
     photograph of that product's own page at /products/<slug>, so the name
     of the slot is the name of the route. Slots whose source has not
     arrived are listed as pending by the run and by section 4 of
     resources/image-generation.md. */
  { source: "category-lawn-mowers.png", out: "product-lawn-mowers", width: 1200, height: 900 },
  { source: "product-wheel-type-manual-lawn-mower.png", out: "product-wheel-type-manual-lawn-mower", width: 1200, height: 900 },
  { source: "lawn-mower.png", out: "product-rotary-type-electric-lawn-mower", width: 1200, height: 900 },
  { source: "product-roller-type-electric-lawn-mower.png", out: "product-roller-type-electric-lawn-mower", width: 1200, height: 900 },
  { source: "product-roller-type-petrol-lawn-mower.png", out: "product-roller-type-petrol-lawn-mower", width: 1200, height: 900 },
  { source: "product-zero-cut-lawn-mower.png", out: "product-zero-cut-lawn-mower", width: 1200, height: 900 },
  { source: "product-other-lawn-mowers.png", out: "product-other-lawn-mowers", width: 1200, height: 900 },
  { source: "category-brush-cutters.png", out: "product-brush-cutters", width: 1200, height: 900 },
  { source: "product-branch-cutters.png", out: "product-branch-cutters", width: 1200, height: 900 },
  { source: "category-chainsaws.png", out: "product-chain-saws", width: 1200, height: 900 },
  { source: "category-hedge-trimmers.png", out: "product-hedge-trimmers", width: 1200, height: 900 },
  { source: "hedge-shears.png", out: "product-hedge-shears", width: 1200, height: 900 },
  { source: "product-mist-blowers-and-sprayers.png", out: "product-mist-blowers-and-sprayers", width: 1200, height: 900 },
  { source: "category-blowers.png", out: "product-blowers", width: 1200, height: 900 },
  { source: "product-sprinklers.png", out: "product-sprinklers", width: 1200, height: 900 },
  { source: "category-sprayers.png", out: "product-spray-pumps", width: 1200, height: 900 },
  { source: "product-plastic-planters-and-stands.png", out: "product-plastic-planters-and-stands", width: 1200, height: 900 },
  { source: "pruning-tools.png", out: "product-cutting-tools", width: 1200, height: 900 },
  { source: "hand-tools.png", out: "product-hand-tools", width: 1200, height: 900 },
  { source: "-watering-tools.png", out: "product-watering-solutions", width: 1200, height: 900 },
  { source: "product-garden-pipes.png", out: "product-garden-pipes", width: 1200, height: 900 },
  { source: "watering-can.png", out: "product-watering-cans", width: 1200, height: 900 },
  { source: "product-hose-reels.png", out: "product-hose-reels", width: 1200, height: 900 },
  { source: "product-self-coiling-hose.png", out: "product-self-coiling-hose", width: 1200, height: 900 },
  { source: "product-pesticides-and-fertilisers.png", out: "product-pesticides-and-fertilisers", width: 1200, height: 900 },
  { source: "product-fountain-nozzles.png", out: "product-fountain-nozzles", width: 1200, height: 900 },
  { source: "product-garden-solar-lights.png", out: "product-garden-solar-lights", width: 1200, height: 900 },

  // Why choose us
  { source: "why-choose.png", out: "why-choose", width: 1200, height: 1600 },

  // Featured products (1:1)
  { source: "pruning-shears.png", out: "tool-pruning-shears", width: 1200, height: 1200 },
  { source: "hand-trowel.png", out: "tool-hand-trowel", width: 1200, height: 1200 },
  { source: "garden-spade.png", out: "tool-garden-spade", width: 1200, height: 1200 },
  { source: "watering-can.png", out: "tool-watering-can", width: 1200, height: 1200 },
  { source: "khurpi.png", out: "tool-khurpi", width: 1200, height: 1200 },
  { source: "hedge-shears.png", out: "tool-hedge-shears", width: 1200, height: 1200 },
  { source: "lawn-mower.png", out: "tool-lawn-mower", width: 1200, height: 1200 },
  { source: "brush-cutter.png", out: "tool-brush-cutter", width: 1200, height: 1200 },

  // Solutions (16:10)
  { source: "tool-selection.png", out: "service-tool-selection", width: 1600, height: 1000 },
  { source: "garden-setup.png", out: "service-garden-setup", width: 1600, height: 1000 },
  { source: "tool-care.png", out: "service-tool-care", width: 1600, height: 1000 },
  { source: "professional-support.png", out: "service-professional-support", width: 1600, height: 1000 },

  // Products page overview (4:3). Formerly the "choosing tools" resource image,
  // kept and renamed when Resources was replaced by Clients: the frame is a
  // comparison of tools on a bench, which is exactly what the Products page
  // opens with. The other two resource slots were retired with the section.
  { source: "choosing-tools.png", out: "products-overview", width: 1200, height: 900 },

  // Community story (21:9)
  { source: "community-story.png", out: "community-story", width: 2520, height: 1080 },

  // Testimonials (1:1)
  { source: "testimonial-01.png", out: "testimonial-01", width: 400, height: 400 },
  { source: "testimonial-02.png", out: "testimonial-02", width: 400, height: 400 },
  { source: "`testimonial-03.png", out: "testimonial-03", width: 400, height: 400 },

  // Open Graph card
  { source: "og-home..png", out: "og-home", width: 1200, height: 630, format: "jpeg" },
];

/**
 * The client's logo, taken from their existing site (jivagreens.com). It is
 * only trimmed of transparent margin and re-saved losslessly: a trademark is
 * never recoloured, cropped into or re-drawn here. Where it sits on a dark
 * surface, the Logo component gives it a white plate instead.
 */
const LOGO = { source: "jiva-logo.png", out: "brand/jiva-logo.png" };

async function processLogo() {
  const outputPath = join(OUT_DIR, LOGO.out);
  await mkdir(join(OUT_DIR, "brand"), { recursive: true });
  const info = await sharp(join(SOURCE_DIR, LOGO.source))
    .trim()
    .png({ compressionLevel: 9 })
    .toFile(outputPath);
  console.log(`${LOGO.out.padEnd(30)} ${info.width}x${info.height}  (logo, trimmed, lossless)`);
}

/**
 * Manufacturer marks for the brand wall on the Clients page, taken from the
 * client's existing site. These are other companies' trademarks, so they are
 * copied through byte for byte: no resize, no re-encode, no crop, no trim and
 * no recolour. The wall places them on a white cell and contains them inside
 * it, which is the only handling a third-party mark gets.
 *
 * Anything dropped into `gardening images/clients/` is copied, so adding a
 * brand is a file and a `data/clients.ts` entry.
 */
const BRAND_MARK_DIR = "clients";

async function processBrandMarks() {
  const sourceDir = join(SOURCE_DIR, BRAND_MARK_DIR);
  let files;
  try {
    files = await readdir(sourceDir);
  } catch {
    return 0;
  }

  const marks = files.filter((name) => /.(png|jpe?g|svg|webp)$/i.test(name));
  if (marks.length === 0) return 0;

  await mkdir(join(OUT_DIR, BRAND_MARK_DIR), { recursive: true });
  for (const name of marks) {
    await copyFile(join(sourceDir, name), join(OUT_DIR, BRAND_MARK_DIR, name));
  }
  console.log(`${(BRAND_MARK_DIR + "/").padEnd(30)} ${marks.length} brand marks (copied unaltered)`);
  return marks.length;
}

/**
 * The client's own product photographs, from their existing site.
 *
 * These are catalogue shots rather than the staged garden photography the rest
 * of the site uses, so they get their own treatment: **contained**, never
 * cover-cropped, on a white ground at one fixed ratio. A gallery of the same
 * product from four angles has to read as one set, and half of these are
 * portrait or panoramic, so cropping them to a common ratio would cut the
 * product in half.
 *
 * Nothing is enlarged. The sources top out around 800px, so the canvas is
 * 800 x 600 and a smaller shot sits centred within it rather than being
 * interpolated up to fill it.
 */
const PRODUCT_PHOTO_DIR = "products";
const PRODUCT_PHOTO = { width: 800, height: 600 };

async function processProductPhotos() {
  const sourceRoot = join(SOURCE_DIR, PRODUCT_PHOTO_DIR);
  let slugs;
  try {
    slugs = await readdir(sourceRoot, { withFileTypes: true });
  } catch {
    return 0;
  }

  let count = 0;
  for (const entry of slugs) {
    if (!entry.isDirectory()) continue;

    const from = join(sourceRoot, entry.name);
    const to = join(OUT_DIR, PRODUCT_PHOTO_DIR, entry.name);
    const files = (await readdir(from)).filter((name) => /\.(jpe?g|png|webp)$/i.test(name)).sort();
    if (files.length === 0) continue;

    await mkdir(to, { recursive: true });

    for (let index = 0; index < files.length; index++) {
      const out = join(to, String(index + 1).padStart(2, "0") + ".webp");
      await sharp(join(from, files[index]))
        .resize({
          width: PRODUCT_PHOTO.width,
          height: PRODUCT_PHOTO.height,
          fit: "contain",
          background: "#ffffff",
          withoutEnlargement: true,
        })
        .webp({ quality: 82 })
        .toFile(out);
      count += 1;
    }

    console.log(`${(PRODUCT_PHOTO_DIR + "/" + entry.name).padEnd(46)} ${String(files.length).padStart(3)} photographs`);
  }

  return count;
}

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

  if (available.has(LOGO.source)) await processLogo();
  await processBrandMarks();
  await processProductPhotos();

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
