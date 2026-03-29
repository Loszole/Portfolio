import type { MetadataRoute } from "next";

import { getAllProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/projects", "/about", "/contact", "/now"];
  const projects = await getAllProjects();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...projects.map((project) => ({
      url: `${siteConfig.url}/projects/${project.slug}`,
      lastModified: new Date(project.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}