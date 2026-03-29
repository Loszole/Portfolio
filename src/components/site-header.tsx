"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

import { CommandPalette } from "./command-palette";
import { ThemeToggle } from "./theme-toggle";

type SearchItem = {
  name: string;
  href: string;
  type: "Page" | "Project";
};

type SiteHeaderProps = {
  commandItems: SearchItem[];
};

export function SiteHeader({ commandItems }: SiteHeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/70 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm font-semibold tracking-[0.15em] text-zinc-100 uppercase">
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {siteConfig.navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-2 text-sm transition",
                  isActive
                    ? "bg-white/10 text-zinc-100"
                    : "text-zinc-300 hover:bg-white/5 hover:text-zinc-100",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <CommandPalette items={commandItems} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}