import type { Metadata } from "next";

import { ProjectsFilter } from "@/components/projects-filter";
import { getAllProjects, getProjectTags } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies and shipped work by Loszole.",
};

export default async function ProjectsPage() {
  const [projects, tags] = await Promise.all([getAllProjects(), getProjectTags()]);

  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm tracking-[0.2em] text-zinc-400 uppercase">Work</p>
        <h1 className="mt-2 text-5xl text-zinc-50">Projects</h1>
        <p className="mt-3 max-w-2xl text-zinc-300">
          Real products, experiments, and design-engineering case studies.
        </p>
      </div>

      <ProjectsFilter projects={projects} tags={tags} />
    </section>
  );
}