import type { MetadataRoute } from "next";
import { allProjects } from "@/.contentlayer/generated";

const SITE_URL = "https://bianchifrancesco.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = allProjects
    .filter((p) => p.published)
    .map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const routes = [
    { url: SITE_URL, priority: 1 },
    { url: `${SITE_URL}/projects`, priority: 0.9 },
    { url: `${SITE_URL}/contact`, priority: 0.8 },
  ].map((r) => ({
    ...r,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
  }));

  return [...routes, ...projects];
}
