import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch for freelance work and collaboration.",
};

export default function ContactPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-5xl text-zinc-50">Contact</h1>
        <p className="mt-3 max-w-xl text-zinc-300">
          Tell me what you are building, your timeline, and what success looks like.
        </p>

        <div className="mt-6">
          <ContactForm />
        </div>
      </section>

      <aside className="space-y-5">
        <section className="rounded-2xl border border-white/10 bg-black/20 p-6">
          <h2 className="text-2xl text-zinc-50">Direct Contact</h2>
          <div className="mt-3 space-y-2 text-sm text-zinc-300">
            <p>{siteConfig.location}</p>
            <p>{siteConfig.email}</p>
            <p>{siteConfig.phone}</p>
            <Link href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="block text-cyan-200 hover:text-cyan-100">
              GitHub
            </Link>
            <Link href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="block text-cyan-200 hover:text-cyan-100">
              LinkedIn
            </Link>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/20 p-6">
          <h2 className="text-2xl text-zinc-50">Current Mode</h2>
          <p className="mt-2 text-sm text-zinc-300">
            The form currently stores submissions in browser localStorage for fast MVP testing.
          </p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/20 p-6">
          <h2 className="text-2xl text-zinc-50">Production Options</h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            <li>- Formspree: quickest no-backend integration with spam controls.</li>
            <li>- Resend: custom Next.js route/server action with your own email workflow.</li>
          </ul>
        </section>
      </aside>
    </div>
  );
}