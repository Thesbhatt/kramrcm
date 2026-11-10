import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // AVIF first (smallest), WebP fallback. Photos live in src/assets/photos (static imports).
    formats: ["image/avif", "image/webp"],
    // Allowlist of encoder qualities (Next 16 requires it). 80 (was 70): client saw photos as soft/dull on a retina laptop; AVIF at 80 stays ~60-120 KB per photo.
    qualities: [80],
    // Trimmed breakpoints: fewer variants to generate and cache. Covers phones (640-1080), laptops (1200) and large/retina desktops (1920).
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 256, 384],
    // Static imports are content-hashed, so a year of immutable caching is safe.
    minimumCacheTTL: 31_536_000,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
