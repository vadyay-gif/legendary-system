import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // keep your other options here
  trailingSlash: true, // ensures /fullapp → /fullapp/ (no custom redirect needed)
};

export default nextConfig;
