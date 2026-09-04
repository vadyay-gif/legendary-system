import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AI Ready: Better AI Results",
    short_name: "AI Ready",
    description: "Practical AI skills for better AI results.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#050b19",
    icons: [
      {
        src: "/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
