"use client";

import { Command } from "cmdk";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type SearchItem = {
  name: string;
  href: string;
  type: "Page" | "Project";
};

type CommandPaletteProps = {
  items: SearchItem[];
};

export function CommandPalette({ items }: CommandPaletteProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const grouped = useMemo(() => {
    return {
      pages: items.filter((item) => item.type === "Page"),
      projects: items.filter((item) => item.type === "Project"),
    };
  }, [items]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 transition hover:bg-white/10 lg:inline-flex"
      >
        <Search size={16} />
        Search
        <span className="rounded bg-zinc-900 px-2 py-0.5 text-xs text-zinc-400">Ctrl+K</span>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-4 pt-24 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <Command
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/95 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            label="Global command menu"
          >
            <div className="flex items-center border-b border-white/10 px-4">
              <Search size={16} className="text-zinc-400" />
              <Command.Input
                autoFocus
                placeholder="Search pages and projects..."
                className="w-full bg-transparent px-3 py-4 text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
              />
            </div>

            <Command.List className="max-h-[60vh] overflow-y-auto p-2">
              <Command.Empty className="px-3 py-6 text-sm text-zinc-400">
                No results found.
              </Command.Empty>

              <Command.Group heading="Pages" className="text-xs text-zinc-500">
                {grouped.pages.map((item) => (
                  <Command.Item
                    key={item.href}
                    value={`${item.type} ${item.name}`}
                    onSelect={() => {
                      setOpen(false);
                      router.push(item.href);
                    }}
                    className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm text-zinc-200 aria-selected:bg-white/10"
                  >
                    {item.name}
                    <span className="text-xs text-zinc-500">{item.type}</span>
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group heading="Projects" className="text-xs text-zinc-500">
                {grouped.projects.map((item) => (
                  <Command.Item
                    key={item.href}
                    value={`${item.type} ${item.name}`}
                    onSelect={() => {
                      setOpen(false);
                      router.push(item.href);
                    }}
                    className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm text-zinc-200 aria-selected:bg-white/10"
                  >
                    {item.name}
                    <span className="text-xs text-zinc-500">{item.type}</span>
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>
          </Command>
        </div>
      ) : null}
    </>
  );
}