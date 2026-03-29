import Image from "next/image";
import Link from "next/link";

import { formatMonthYear } from "@/lib/date";
import type { ProjectMeta } from "@/lib/projects";

type ProjectCardProps = {
  project: ProjectMeta;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const updatedLabel = project.updatedAt ? formatMonthYear(project.updatedAt) : formatMonthYear(project.date);

  return (
    <article className="h-full rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-300/40 hover:bg-white/10">
      {project.image ? (
        <div className="mb-4 overflow-hidden rounded-xl border border-white/10 bg-[radial-gradient(circle_at_top,rgba(78,197,255,0.16),transparent_50%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]">
          <Image
            src={project.image}
            alt={project.imageAlt ?? `${project.title} project thumbnail`}
            width={640}
            height={360}
            className="h-48 w-full object-contain p-5"
          />
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2 text-xs tracking-[0.12em] text-zinc-400 uppercase">
        <span>{project.role}</span>
        {project.githubLanguage ? <span>{project.githubLanguage}</span> : null}
        <span>Updated {updatedLabel}</span>
        {typeof project.githubStars === "number" ? <span>{project.githubStars} star{project.githubStars === 1 ? "" : "s"}</span> : null}
      </div>

      <h3 className="mt-3 text-2xl text-zinc-50">{project.title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-300">{project.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.slice(0, 4).map((item) => (
          <span
            key={`${project.slug}-${item}`}
            className="rounded-full border border-white/10 bg-black/30 px-2 py-1 text-xs text-zinc-300"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-4">
        <Link href={`/projects/${project.slug}`} className="inline-flex text-sm text-cyan-200 hover:text-cyan-100">
          Read case study
        </Link>
        {project.github ? (
          <Link
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex text-sm text-zinc-400 hover:text-zinc-100"
          >
            View repo
          </Link>
        ) : null}
      </div>
    </article>
  );
}
