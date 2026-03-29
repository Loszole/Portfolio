import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/lib/site";

const timeline = [
  {
    period: "Feb 2026 - Present",
    title: "Android Development Intern · Cognifyz Technologies",
    description:
      "Developed 5+ Android applications using Java, RecyclerView, multi-activity navigation, and structured form handling with clean coding practices.",
  },
  {
    period: "Jan 2026 - Feb 2026",
    title: "Flutter / Android Development Intern · Prodigy InfoTech",
    description:
      "Built cross-platform apps including a calculator, QR scanner, stopwatch, tic tac toe, and to-do list with responsive UI and solid state management.",
  },
  {
    period: "Dec 2025 - Jan 2026",
    title: "Android Developer Intern · Cantilever",
    description:
      "Built Flutter apps including a recipe manager with Room Database and a news aggregator using REST APIs.",
  },
  {
    period: "Aug 2024 - Nov 2024",
    title: "Full Stack Developer Intern · Ardent Computech Pvt. Ltd.",
    description:
      "Developed the Smart Care e-healthcare platform with the MERN stack, secure REST APIs, and improved UI responsiveness.",
  },
];

const skills = [
  "Dart",
  "Flutter",
  "JavaScript",
  "Java",
  "Python",
  "C",
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "NestJS",
  "Express.js",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "Firebase",
  "Android SDK",
  "PowerShell",
  "Windows Support",
  "Basic Networking",
  "REST APIs",
  "Git",
  "GitHub",
  "Postman",
];

const certifications = [
  "Introduction to Cyber Suraksha - Tata Strive (2024)",
  "Full-Stack Web Development Bootcamp - Udemy",
  "The Complete Python Pro Bootcamp - Udemy",
  "Complete Ethical Hacking Bootcamp - Udemy",
  "Flutter & Dart: The Complete Guide - Udemy",
];

const education = [
  "Bachelor of Computer Applications (BCA), NSHM College of Management & Technology, 2025, CGPA 6.73",
  "Senior Secondary (Class XII) - Science, Ahsan Alam Memorial Inter College, 2022",
  "Node.js",
  "UX Research",
  "SEO",
];

export const metadata: Metadata = {
  title: "About",
  description: "Background, skills, and experience timeline.",
};

export default function AboutPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-5xl text-zinc-50">About</h1>
        <p className="mt-4 text-zinc-300">
          BCA graduate and junior software developer with hands-on experience across Flutter, Android,
          MERN-stack web development, and IT support. I care about building software that feels reliable,
          performs well, and stays practical to maintain.
        </p>

        <p className="mt-3 text-zinc-300">
          My current direction blends product-minded frontend development with secure systems thinking,
          performance tuning, and a growing interest in cybersecurity.
        </p>

        <h2 className="mt-8 text-2xl text-zinc-50">Timeline</h2>
        <ol className="mt-4 space-y-4">
          {timeline.map((item) => (
            <li key={item.period} className="rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs tracking-[0.14em] text-zinc-500 uppercase">{item.period}</p>
              <h3 className="mt-1 text-xl text-zinc-100">{item.title}</h3>
              <p className="mt-1 text-sm text-zinc-300">{item.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <aside className="space-y-6">
        <section className="rounded-2xl border border-white/10 bg-black/20 p-6">
          <h2 className="text-2xl text-zinc-50">Skills</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <li key={skill} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-200">
                {skill}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/20 p-6">
          <h2 className="text-2xl text-zinc-50">Education</h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            {education.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/20 p-6">
          <h2 className="text-2xl text-zinc-50">Certifications</h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            {certifications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/20 p-6">
          <h2 className="text-2xl text-zinc-50">Resume</h2>
          <p className="mt-2 text-sm text-zinc-300">
            Download the current text version of your resume now. Replace it later with a PDF if you want a cleaner recruiter-facing asset.
          </p>
          <Link
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex rounded-full bg-cyan-300 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-cyan-200"
          >
            Download resume
          </Link>
          <div className="mt-4 space-y-1 text-sm text-zinc-400">
            <p>{siteConfig.location}</p>
            <p>{siteConfig.email}</p>
            <p>{siteConfig.phone}</p>
          </div>
        </section>
      </aside>
    </div>
  );
}