import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ...your existing config (if you had other options, keep them here)

  async redirects() {
    return [
      { source: "/fullapp", destination: "/fullapp/", permanent: true }
    ];
  },
};

export default nextConfig;
