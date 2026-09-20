import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP as the fallback. All imagery is local, so no
    // `remotePatterns` entry is required.
    formats: ["image/avif", "image/webp"],
    // Next 16 defaults this to [75] and coerces anything else to the nearest
    // allowed value, so the qualities actually used have to be declared.
    qualities: [70, 80, 90],
    // Every image is a build-time file in `public/images`, so an optimised
    // variant only goes stale when the artwork itself is replaced. The default
    // is four hours, which re-optimises the same unchanged photographs several
    // times a day for nothing. A week is the compromise while the photography
    // is still arriving product by product: long enough to matter, short enough
    // that a replaced photograph works its way out without intervention. Raise
    // it to 2678400 (31 days) once the imagery is final. There is no cache
    // invalidation API, so a forced refresh means deleting `.next/cache/images`.
    minimumCacheTTL: 604800,
  },
  // lucide-react exports several hundred icons; this keeps the bundle to the
  // handful that are actually imported.
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
