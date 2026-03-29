import type { Metadata } from "next";
import { Cormorant_Garamond, Space_Grotesk } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getAllProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sans = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const themeScript = `(() => {
  try {
    const saved = localStorage.getItem("theme");
    const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved ?? (preferredDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
  } catch {
    document.documentElement.classList.add("dark");
  }
})();`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | Loszole",
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const projects = await getAllProjects();

  const commandItems = [
    { name: "Home", href: "/", type: "Page" as const },
    { name: "Projects", href: "/projects", type: "Page" as const },
    { name: "About", href: "/about", type: "Page" as const },
    { name: "Now", href: "/now", type: "Page" as const },
    { name: "Contact", href: "/contact", type: "Page" as const },
    ...projects.map((project) => ({
      name: project.title,
      href: `/projects/${project.slug}`,
      type: "Project" as const,
    })),
  ];

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} dark h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <div className="relative min-h-screen overflow-x-clip">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(41,123,255,0.16),transparent_40%),radial-gradient(circle_at_85%_20%,rgba(0,208,255,0.12),transparent_36%),linear-gradient(to_bottom,rgba(7,11,20,0.94),rgba(4,8,14,0.98))]" />
          <div className="relative z-10 flex min-h-screen flex-col">
            <SiteHeader commandItems={commandItems} />
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
              {children}
            </main>
            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
