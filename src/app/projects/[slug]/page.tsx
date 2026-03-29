import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { mdxComponents } from "@/components/mdx-components";
import { formatLongDate, formatMonthYear } from "@/lib/date";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getAllProjects();

  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.meta.title,
    description: project.meta.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { content } = await compileMDX({
    source: project.content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "append",
              properties: {
                className: ["anchor"],
              },
            },
          ],
        ],
      },
    },
    components: mdxComponents,
  });

  return (
    <article className="mx-auto max-w-4xl space-y-8">
      <header className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        {project.meta.image ? (
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top,rgba(78,197,255,0.18),transparent_50%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]">
            <Image
              src={project.meta.image}
              alt={project.meta.imageAlt ?? `${project.meta.title} project image`}
              width={1200}
              height={720}
              className="h-72 w-full object-contain p-8"
            />
          </div>
        ) : null}

        <div className="space-y-4">
          <p className="text-sm tracking-[0.18em] text-zinc-400 uppercase">{formatLongDate(project.meta.date)}</p>
          <h1 className="text-5xl leading-tight text-zinc-50">{project.meta.title}</h1>
          <p className="max-w-3xl text-zinc-300">{project.meta.summary}</p>
        </div>

        <dl className="grid gap-4 pt-2 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-xs tracking-[0.12em] text-zinc-500 uppercase">Role</dt>
            <dd className="mt-1 text-zinc-100">{project.meta.role}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-[0.12em] text-zinc-500 uppercase">Primary language</dt>
            <dd className="mt-1 text-zinc-100">{project.meta.githubLanguage ?? project.meta.stack[0]}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-[0.12em] text-zinc-500 uppercase">Repo stars</dt>
            <dd className="mt-1 text-zinc-100">{project.meta.githubStars ?? 0}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-[0.12em] text-zinc-500 uppercase">Last updated</dt>
            <dd className="mt-1 text-zinc-100">
              {project.meta.updatedAt ? formatMonthYear(project.meta.updatedAt) : formatMonthYear(project.meta.date)}
            </dd>
          </div>
        </dl>

        <div>
          <p className="text-xs tracking-[0.12em] text-zinc-500 uppercase">Stack</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.meta.stack.map((item) => (
              <span
                key={`${project.meta.slug}-${item}`}
                className="rounded-full border border-white/10 bg-black/30 px-2 py-1 text-xs text-zinc-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {project.meta.github ? (
            <Link
              href={project.meta.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-zinc-100 hover:bg-black/60"
            >
              GitHub
            </Link>
          ) : null}
          {project.meta.live ? (
            <Link
              href={project.meta.live}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-cyan-200"
            >
              Live Demo
            </Link>
          ) : null}
        </div>
      </header>

      {project.meta.highlights.length > 0 ? (
        <section className="rounded-2xl border border-white/10 bg-black/20 p-6">
          <h2 className="text-2xl text-zinc-50">Highlights</h2>
          <ul className="mt-3 space-y-2 text-zinc-300">
            {project.meta.highlights.map((highlight) => (
              <li key={highlight}>- {highlight}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="prose prose-invert max-w-none">{content}</section>
    </article>
  );
}