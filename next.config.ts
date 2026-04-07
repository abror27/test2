import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR?.trim() || ".next",
  output: "standalone",
  outputFileTracingIncludes: {
    "/*": ["./storage/**/*"],
  },
};

export default nextConfig;
