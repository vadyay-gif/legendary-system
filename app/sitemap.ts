import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://getaiready.app/",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://getaiready.app/privacy",
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: "https://getaiready.app/terms",
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
