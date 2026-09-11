import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP as the fallback. All imagery is local, so no
    // `remotePatterns` entry is required.
    formats: ["image/avif", "image/webp"],
    // Next 16 defaults this to [75] and coerces anything else to the nearest
    // allowed value, so the qualities actually used have to be declared.
    qualities: [70, 80, 90],
  },
  // lucide-react exports several hundred icons; this keeps the bundle to the
  // handful that are actually imported.
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
