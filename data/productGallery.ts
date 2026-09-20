import type { ImageAsset } from "@/types/content";

/**
 * Product photographs from the client's own site, by product slug.
 *
 * **Generated.** `npm run images` writes the files into
 * `public/images/products/<slug>/`, and this map is produced from what landed
 * there. Do not hand-edit the paths; re-generate instead.
 *
 * These are the client's catalogue shots, not the staged garden photography the
 * rest of the site uses, so they are contained on a white ground at one ratio
 * rather than cover-cropped. Where a product is a range, the photographs are
 * the different products inside it; where it is a single machine, they are
 * angles of that machine.
 *
 * Kept out of `data/productCategories.ts` on purpose: that file is written by
 * hand and this one is not, and mixing the two would make it impossible to
 * regenerate either safely.
 *
 * **Alt text is provisional.** Each line names the product and the position in
 * the set, which is true but thin. It needs a pass by someone who has looked at
 * the photographs, and that is recorded as pending in `done.md`.
 */
export const productGallery: Record<string, readonly ImageAsset[]> = {
  "blowers": [
    { src: "/images/products/blowers/01.webp", alt: "Blowers supplied by Jiva Greens, catalogue photograph 1" },
  ],
  "branch-cutters": [
    { src: "/images/products/branch-cutters/01.webp", alt: "Branch Cutters supplied by Jiva Greens, catalogue photograph 1" },
    { src: "/images/products/branch-cutters/02.webp", alt: "Branch Cutters supplied by Jiva Greens, catalogue photograph 2" },
    { src: "/images/products/branch-cutters/03.webp", alt: "Branch Cutters supplied by Jiva Greens, catalogue photograph 3" },
    { src: "/images/products/branch-cutters/04.webp", alt: "Branch Cutters supplied by Jiva Greens, catalogue photograph 4" },
    { src: "/images/products/branch-cutters/05.webp", alt: "Branch Cutters supplied by Jiva Greens, catalogue photograph 5" },
    { src: "/images/products/branch-cutters/06.webp", alt: "Branch Cutters supplied by Jiva Greens, catalogue photograph 6" },
  ],
  "brush-cutters": [
    { src: "/images/products/brush-cutters/01.webp", alt: "Brush Cutters supplied by Jiva Greens, catalogue photograph 1" },
    { src: "/images/products/brush-cutters/02.webp", alt: "Brush Cutters supplied by Jiva Greens, catalogue photograph 2" },
    { src: "/images/products/brush-cutters/03.webp", alt: "Brush Cutters supplied by Jiva Greens, catalogue photograph 3" },
    { src: "/images/products/brush-cutters/04.webp", alt: "Brush Cutters supplied by Jiva Greens, catalogue photograph 4" },
    { src: "/images/products/brush-cutters/05.webp", alt: "Brush Cutters supplied by Jiva Greens, catalogue photograph 5" },
    { src: "/images/products/brush-cutters/06.webp", alt: "Brush Cutters supplied by Jiva Greens, catalogue photograph 6" },
    { src: "/images/products/brush-cutters/07.webp", alt: "Brush Cutters supplied by Jiva Greens, catalogue photograph 7" },
    { src: "/images/products/brush-cutters/08.webp", alt: "Brush Cutters supplied by Jiva Greens, catalogue photograph 8" },
  ],
  "chain-saws": [
    { src: "/images/products/chain-saws/01.webp", alt: "Chain Saws supplied by Jiva Greens, catalogue photograph 1" },
    { src: "/images/products/chain-saws/02.webp", alt: "Chain Saws supplied by Jiva Greens, catalogue photograph 2" },
    { src: "/images/products/chain-saws/03.webp", alt: "Chain Saws supplied by Jiva Greens, catalogue photograph 3" },
    { src: "/images/products/chain-saws/04.webp", alt: "Chain Saws supplied by Jiva Greens, catalogue photograph 4" },
    { src: "/images/products/chain-saws/05.webp", alt: "Chain Saws supplied by Jiva Greens, catalogue photograph 5" },
    { src: "/images/products/chain-saws/06.webp", alt: "Chain Saws supplied by Jiva Greens, catalogue photograph 6" },
    { src: "/images/products/chain-saws/07.webp", alt: "Chain Saws supplied by Jiva Greens, catalogue photograph 7" },
    { src: "/images/products/chain-saws/08.webp", alt: "Chain Saws supplied by Jiva Greens, catalogue photograph 8" },
  ],
  "cutting-tools": [
    { src: "/images/products/cutting-tools/01.webp", alt: "Cutting Tools supplied by Jiva Greens, catalogue photograph 1" },
    { src: "/images/products/cutting-tools/02.webp", alt: "Cutting Tools supplied by Jiva Greens, catalogue photograph 2" },
    { src: "/images/products/cutting-tools/03.webp", alt: "Cutting Tools supplied by Jiva Greens, catalogue photograph 3" },
    { src: "/images/products/cutting-tools/04.webp", alt: "Cutting Tools supplied by Jiva Greens, catalogue photograph 4" },
    { src: "/images/products/cutting-tools/05.webp", alt: "Cutting Tools supplied by Jiva Greens, catalogue photograph 5" },
    { src: "/images/products/cutting-tools/06.webp", alt: "Cutting Tools supplied by Jiva Greens, catalogue photograph 6" },
    { src: "/images/products/cutting-tools/07.webp", alt: "Cutting Tools supplied by Jiva Greens, catalogue photograph 7" },
    { src: "/images/products/cutting-tools/08.webp", alt: "Cutting Tools supplied by Jiva Greens, catalogue photograph 8" },
  ],
  "fountain-nozzles": [
    { src: "/images/products/fountain-nozzles/01.webp", alt: "Fountain Nozzles supplied by Jiva Greens, catalogue photograph 1" },
    { src: "/images/products/fountain-nozzles/02.webp", alt: "Fountain Nozzles supplied by Jiva Greens, catalogue photograph 2" },
    { src: "/images/products/fountain-nozzles/03.webp", alt: "Fountain Nozzles supplied by Jiva Greens, catalogue photograph 3" },
    { src: "/images/products/fountain-nozzles/04.webp", alt: "Fountain Nozzles supplied by Jiva Greens, catalogue photograph 4" },
    { src: "/images/products/fountain-nozzles/05.webp", alt: "Fountain Nozzles supplied by Jiva Greens, catalogue photograph 5" },
    { src: "/images/products/fountain-nozzles/06.webp", alt: "Fountain Nozzles supplied by Jiva Greens, catalogue photograph 6" },
    { src: "/images/products/fountain-nozzles/07.webp", alt: "Fountain Nozzles supplied by Jiva Greens, catalogue photograph 7" },
    { src: "/images/products/fountain-nozzles/08.webp", alt: "Fountain Nozzles supplied by Jiva Greens, catalogue photograph 8" },
  ],
  "garden-solar-lights": [
    { src: "/images/products/garden-solar-lights/01.webp", alt: "Garden Solar Lights supplied by Jiva Greens, catalogue photograph 1" },
    { src: "/images/products/garden-solar-lights/02.webp", alt: "Garden Solar Lights supplied by Jiva Greens, catalogue photograph 2" },
    { src: "/images/products/garden-solar-lights/03.webp", alt: "Garden Solar Lights supplied by Jiva Greens, catalogue photograph 3" },
    { src: "/images/products/garden-solar-lights/04.webp", alt: "Garden Solar Lights supplied by Jiva Greens, catalogue photograph 4" },
    { src: "/images/products/garden-solar-lights/05.webp", alt: "Garden Solar Lights supplied by Jiva Greens, catalogue photograph 5" },
    { src: "/images/products/garden-solar-lights/06.webp", alt: "Garden Solar Lights supplied by Jiva Greens, catalogue photograph 6" },
    { src: "/images/products/garden-solar-lights/07.webp", alt: "Garden Solar Lights supplied by Jiva Greens, catalogue photograph 7" },
  ],
  "hand-tools": [
    { src: "/images/products/hand-tools/01.webp", alt: "Hand Tools supplied by Jiva Greens, catalogue photograph 1" },
    { src: "/images/products/hand-tools/02.webp", alt: "Hand Tools supplied by Jiva Greens, catalogue photograph 2" },
    { src: "/images/products/hand-tools/03.webp", alt: "Hand Tools supplied by Jiva Greens, catalogue photograph 3" },
    { src: "/images/products/hand-tools/04.webp", alt: "Hand Tools supplied by Jiva Greens, catalogue photograph 4" },
    { src: "/images/products/hand-tools/05.webp", alt: "Hand Tools supplied by Jiva Greens, catalogue photograph 5" },
    { src: "/images/products/hand-tools/06.webp", alt: "Hand Tools supplied by Jiva Greens, catalogue photograph 6" },
    { src: "/images/products/hand-tools/07.webp", alt: "Hand Tools supplied by Jiva Greens, catalogue photograph 7" },
    { src: "/images/products/hand-tools/08.webp", alt: "Hand Tools supplied by Jiva Greens, catalogue photograph 8" },
  ],
  "hedge-shears": [
    { src: "/images/products/hedge-shears/01.webp", alt: "Hedge Shears supplied by Jiva Greens, catalogue photograph 1" },
    { src: "/images/products/hedge-shears/02.webp", alt: "Hedge Shears supplied by Jiva Greens, catalogue photograph 2" },
    { src: "/images/products/hedge-shears/03.webp", alt: "Hedge Shears supplied by Jiva Greens, catalogue photograph 3" },
    { src: "/images/products/hedge-shears/04.webp", alt: "Hedge Shears supplied by Jiva Greens, catalogue photograph 4" },
    { src: "/images/products/hedge-shears/05.webp", alt: "Hedge Shears supplied by Jiva Greens, catalogue photograph 5" },
    { src: "/images/products/hedge-shears/06.webp", alt: "Hedge Shears supplied by Jiva Greens, catalogue photograph 6" },
    { src: "/images/products/hedge-shears/07.webp", alt: "Hedge Shears supplied by Jiva Greens, catalogue photograph 7" },
    { src: "/images/products/hedge-shears/08.webp", alt: "Hedge Shears supplied by Jiva Greens, catalogue photograph 8" },
  ],
  "hedge-trimmers": [
    { src: "/images/products/hedge-trimmers/01.webp", alt: "Hedge Trimmers supplied by Jiva Greens, catalogue photograph 1" },
    { src: "/images/products/hedge-trimmers/02.webp", alt: "Hedge Trimmers supplied by Jiva Greens, catalogue photograph 2" },
    { src: "/images/products/hedge-trimmers/03.webp", alt: "Hedge Trimmers supplied by Jiva Greens, catalogue photograph 3" },
    { src: "/images/products/hedge-trimmers/04.webp", alt: "Hedge Trimmers supplied by Jiva Greens, catalogue photograph 4" },
    { src: "/images/products/hedge-trimmers/05.webp", alt: "Hedge Trimmers supplied by Jiva Greens, catalogue photograph 5" },
    { src: "/images/products/hedge-trimmers/06.webp", alt: "Hedge Trimmers supplied by Jiva Greens, catalogue photograph 6" },
    { src: "/images/products/hedge-trimmers/07.webp", alt: "Hedge Trimmers supplied by Jiva Greens, catalogue photograph 7" },
    { src: "/images/products/hedge-trimmers/08.webp", alt: "Hedge Trimmers supplied by Jiva Greens, catalogue photograph 8" },
  ],
  "mist-blowers-and-sprayers": [
    { src: "/images/products/mist-blowers-and-sprayers/01.webp", alt: "Mist Blowers & Sprayers supplied by Jiva Greens, catalogue photograph 1" },
    { src: "/images/products/mist-blowers-and-sprayers/02.webp", alt: "Mist Blowers & Sprayers supplied by Jiva Greens, catalogue photograph 2" },
  ],
  "plastic-planters-and-stands": [
    { src: "/images/products/plastic-planters-and-stands/01.webp", alt: "Plastic Planters & Stands supplied by Jiva Greens, catalogue photograph 1" },
    { src: "/images/products/plastic-planters-and-stands/02.webp", alt: "Plastic Planters & Stands supplied by Jiva Greens, catalogue photograph 2" },
    { src: "/images/products/plastic-planters-and-stands/03.webp", alt: "Plastic Planters & Stands supplied by Jiva Greens, catalogue photograph 3" },
    { src: "/images/products/plastic-planters-and-stands/04.webp", alt: "Plastic Planters & Stands supplied by Jiva Greens, catalogue photograph 4" },
    { src: "/images/products/plastic-planters-and-stands/05.webp", alt: "Plastic Planters & Stands supplied by Jiva Greens, catalogue photograph 5" },
    { src: "/images/products/plastic-planters-and-stands/06.webp", alt: "Plastic Planters & Stands supplied by Jiva Greens, catalogue photograph 6" },
    { src: "/images/products/plastic-planters-and-stands/07.webp", alt: "Plastic Planters & Stands supplied by Jiva Greens, catalogue photograph 7" },
  ],
  "roller-type-electric-lawn-mower": [
    { src: "/images/products/roller-type-electric-lawn-mower/01.webp", alt: "Roller Type Electric Lawn Mower, catalogue photograph 1" },
    { src: "/images/products/roller-type-electric-lawn-mower/02.webp", alt: "Roller Type Electric Lawn Mower, catalogue photograph 2" },
    { src: "/images/products/roller-type-electric-lawn-mower/03.webp", alt: "Roller Type Electric Lawn Mower, catalogue photograph 3" },
  ],
  "rotary-type-electric-lawn-mower": [
    { src: "/images/products/rotary-type-electric-lawn-mower/01.webp", alt: "Rotary Type Electric Lawn Mower, catalogue photograph 1" },
    { src: "/images/products/rotary-type-electric-lawn-mower/02.webp", alt: "Rotary Type Electric Lawn Mower, catalogue photograph 2" },
    { src: "/images/products/rotary-type-electric-lawn-mower/03.webp", alt: "Rotary Type Electric Lawn Mower, catalogue photograph 3" },
    { src: "/images/products/rotary-type-electric-lawn-mower/04.webp", alt: "Rotary Type Electric Lawn Mower, catalogue photograph 4" },
    { src: "/images/products/rotary-type-electric-lawn-mower/05.webp", alt: "Rotary Type Electric Lawn Mower, catalogue photograph 5" },
    { src: "/images/products/rotary-type-electric-lawn-mower/06.webp", alt: "Rotary Type Electric Lawn Mower, catalogue photograph 6" },
    { src: "/images/products/rotary-type-electric-lawn-mower/07.webp", alt: "Rotary Type Electric Lawn Mower, catalogue photograph 7" },
  ],
  "spray-pumps": [
    { src: "/images/products/spray-pumps/01.webp", alt: "Spray Pumps supplied by Jiva Greens, catalogue photograph 1" },
    { src: "/images/products/spray-pumps/02.webp", alt: "Spray Pumps supplied by Jiva Greens, catalogue photograph 2" },
    { src: "/images/products/spray-pumps/03.webp", alt: "Spray Pumps supplied by Jiva Greens, catalogue photograph 3" },
    { src: "/images/products/spray-pumps/04.webp", alt: "Spray Pumps supplied by Jiva Greens, catalogue photograph 4" },
    { src: "/images/products/spray-pumps/05.webp", alt: "Spray Pumps supplied by Jiva Greens, catalogue photograph 5" },
    { src: "/images/products/spray-pumps/06.webp", alt: "Spray Pumps supplied by Jiva Greens, catalogue photograph 6" },
    { src: "/images/products/spray-pumps/07.webp", alt: "Spray Pumps supplied by Jiva Greens, catalogue photograph 7" },
    { src: "/images/products/spray-pumps/08.webp", alt: "Spray Pumps supplied by Jiva Greens, catalogue photograph 8" },
  ],
  "sprinklers": [
    { src: "/images/products/sprinklers/01.webp", alt: "Sprinklers supplied by Jiva Greens, catalogue photograph 1" },
    { src: "/images/products/sprinklers/02.webp", alt: "Sprinklers supplied by Jiva Greens, catalogue photograph 2" },
    { src: "/images/products/sprinklers/03.webp", alt: "Sprinklers supplied by Jiva Greens, catalogue photograph 3" },
    { src: "/images/products/sprinklers/04.webp", alt: "Sprinklers supplied by Jiva Greens, catalogue photograph 4" },
    { src: "/images/products/sprinklers/05.webp", alt: "Sprinklers supplied by Jiva Greens, catalogue photograph 5" },
    { src: "/images/products/sprinklers/06.webp", alt: "Sprinklers supplied by Jiva Greens, catalogue photograph 6" },
    { src: "/images/products/sprinklers/07.webp", alt: "Sprinklers supplied by Jiva Greens, catalogue photograph 7" },
    { src: "/images/products/sprinklers/08.webp", alt: "Sprinklers supplied by Jiva Greens, catalogue photograph 8" },
  ],
  "watering-cans": [
    { src: "/images/products/watering-cans/01.webp", alt: "Watering Cans, catalogue photograph 1" },
  ],
  "wheel-type-manual-lawn-mower": [
    { src: "/images/products/wheel-type-manual-lawn-mower/01.webp", alt: "Wheel Type Manual Lawn Mower, catalogue photograph 1" },
    { src: "/images/products/wheel-type-manual-lawn-mower/02.webp", alt: "Wheel Type Manual Lawn Mower, catalogue photograph 2" },
    { src: "/images/products/wheel-type-manual-lawn-mower/03.webp", alt: "Wheel Type Manual Lawn Mower, catalogue photograph 3" },
  ],
};
