"use client";

import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/project-card";
import type { ProjectMeta } from "@/lib/projects";
import { cn } from "@/lib/utils";

type ProjectsFilterProps = {
  projects: ProjectMeta[];
  tags: string[];
};

export function ProjectsFilter({ projects, tags }: ProjectsFilterProps) {
  const [activeTag, setActiveTag] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeTag === "All") {
      return projects;
    }

    return projects.filter((project) => project.tags.includes(activeTag));
  }, [activeTag, projects]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {["All", ...tags].map((tag) => {
          const isActive = tag === activeTag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
                isActive
                  ? "border-cyan-300/50 bg-cyan-400/20 text-cyan-100"
                  : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10",
              )}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <ul className="grid gap-5 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}