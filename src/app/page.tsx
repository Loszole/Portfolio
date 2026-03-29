import Link from "next/link";

import { FadeIn } from "@/components/fade-in";
import { ProjectCard } from "@/components/project-card";
import { getFeaturedProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

const skills = [
  "Flutter",
  "MERN Stack",
  "React",
  "Next.js",
  "Node.js",
  "NestJS",
  "Tailwind CSS",
  "REST APIs",
  "Android",
  "PowerShell",
];

export default async function Home() {
  const featured = await getFeaturedProjects(3);

  return (
    <div className="space-y-18 pb-8">
      <FadeIn className="rounded-3xl border border-white/10 bg-white/5 px-6 py-12 sm:px-10">
        <p className="text-sm tracking-[0.24em] text-cyan-100 uppercase">Junior IT Support & Software Developer</p>
        <h1 className="mt-4 text-5xl leading-tight font-semibold text-zinc-50 sm:text-6xl">
          {siteConfig.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-zinc-200 sm:text-xl">{siteConfig.tagline}</p>
        <p className="mt-4 max-w-2xl text-sm text-zinc-400 sm:text-base">
          Based in {siteConfig.location}. Building scalable web platforms, cross-platform mobile apps,
          and developer-friendly products with a strong focus on reliability and speed.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="rounded-full bg-cyan-300 px-5 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-200"
          >
            View projects
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm text-zinc-100 transition hover:bg-white/10"
          >
            Contact me
          </Link>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <section aria-labelledby="featured-projects">
          <div className="mb-5 flex items-end justify-between gap-3">
            <h2 id="featured-projects" className="text-3xl text-zinc-50">
              Featured Projects
            </h2>
            <Link href="/projects" className="text-sm text-cyan-200 hover:text-cyan-100">
              See all
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.2}>
        <section aria-labelledby="skills" className="rounded-2xl border border-white/10 bg-black/20 p-6">
          <h2 id="skills" className="text-3xl text-zinc-50">
            Core Skills
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <li key={skill} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-200">
                {skill}
              </li>
            ))}
          </ul>
        </section>
      </FadeIn>
    </div>
  );
}
