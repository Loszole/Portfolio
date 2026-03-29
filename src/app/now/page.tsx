import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now",
  description: "What Loszole is focused on this month.",
};

const nowItems = [
  "Shipping a polished portfolio with MDX case studies and keyboard-first navigation.",
  "Deepening skills in motion design systems for production React apps.",
  "Learning advanced performance profiling in Next.js and browser rendering pipelines.",
  "Exploring product writing and storytelling for stronger case-study narratives.",
];

export default function NowPage() {
  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
      <p className="text-xs tracking-[0.2em] text-zinc-400 uppercase">Updated March 2026</p>
      <h1 className="mt-3 text-5xl text-zinc-50">Now</h1>
      <p className="mt-4 text-zinc-300">A snapshot of what I am building and learning this month.</p>

      <ul className="mt-6 space-y-3 text-zinc-200">
        {nowItems.map((item) => (
          <li key={item} className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}