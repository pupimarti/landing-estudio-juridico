import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { absoluteUrl, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...services.map((service) => ({
      url: absoluteUrl(`/servicios/${service.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
