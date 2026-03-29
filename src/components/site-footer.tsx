import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-zinc-400 sm:px-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p>
          Built with Next.js, TypeScript, Tailwind, and MDX.
        </p>
        <div className="flex items-center gap-4">
          <Link href={siteConfig.github} className="hover:text-zinc-100">
            GitHub
          </Link>
          <Link href={siteConfig.linkedin} className="hover:text-zinc-100">
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}