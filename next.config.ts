import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Netlify hosting. Server-only features (Server Actions,
  // headers(), redirects()) are unavailable — forms go through Netlify Forms
  // and security headers live in netlify.toml.
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
