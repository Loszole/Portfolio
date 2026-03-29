import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import { cache } from "react";

export type ProjectMeta = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  date: string;
  stack: string[];
  tags: string[];
  highlights: string[];
  github?: string;
  live?: string;
  featured?: boolean;
  githubStars?: number;
  githubLanguage?: string;
  updatedAt?: string;
  image?: string;
  imageAlt?: string;
};

export type ProjectDocument = {
  meta: ProjectMeta;
  content: string;
};

const projectsDirectory = path.join(process.cwd(), "content", "projects");

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => String(item).trim())
    .filter(Boolean);
}

function normalizeProjectMeta(data: Record<string, unknown>, slug: string): ProjectMeta {
  const githubStars = typeof data.githubStars === "number" ? data.githubStars : Number(data.githubStars);

  return {
    slug,
    title: String(data.title ?? slug),
    summary: String(data.summary ?? "No summary provided."),
    role: String(data.role ?? "Developer"),
    date: String(data.date ?? "2026-01-01"),
    stack: normalizeStringArray(data.stack),
    tags: normalizeStringArray(data.tags),
    highlights: normalizeStringArray(data.highlights),
    github: data.github ? String(data.github) : undefined,
    live: data.live ? String(data.live) : undefined,
    featured: Boolean(data.featured),
    githubStars: Number.isNaN(githubStars) ? undefined : githubStars,
    githubLanguage: data.githubLanguage ? String(data.githubLanguage) : undefined,
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
    image: data.image ? String(data.image) : undefined,
    imageAlt: data.imageAlt ? String(data.imageAlt) : undefined,
  };
}

export const getAllProjects = cache(async (): Promise<ProjectMeta[]> => {
  const entries = await fs.readdir(projectsDirectory, { withFileTypes: true });

  const projects = await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
      .map(async (entry) => {
        const slug = entry.name.replace(/\.mdx$/, "");
        const filePath = path.join(projectsDirectory, entry.name);
        const source = await fs.readFile(filePath, "utf8");
        const { data } = matter(source);
        return normalizeProjectMeta(data, slug);
      }),
  );

  return projects.sort((a, b) => (a.date < b.date ? 1 : -1));
});

export const getProjectBySlug = cache(async (slug: string): Promise<ProjectDocument | null> => {
  try {
    const filePath = path.join(projectsDirectory, `${slug}.mdx`);
    const source = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(source);

    return {
      meta: normalizeProjectMeta(data, slug),
      content,
    };
  } catch {
    return null;
  }
});

export async function getProjectTags(): Promise<string[]> {
  const projects = await getAllProjects();
  const tags = new Set<string>();

  projects.forEach((project) => {
    project.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}

export async function getFeaturedProjects(limit = 3): Promise<ProjectMeta[]> {
  const projects = await getAllProjects();
  const featured = projects.filter((project) => project.featured);

  return featured.slice(0, limit);
}