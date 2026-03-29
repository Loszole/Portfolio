export const siteConfig = {
  name: "Mohammed Zaid Alam",
  title: "Mohammed Zaid Alam | Developer Portfolio",
  description:
    "Junior IT Support and Software Developer building fast web platforms, mobile apps, and secure performance-driven software.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.vercel.app",
  tagline:
    "Junior IT Support and Software Developer focused on Flutter, MERN, modern frontend systems, and secure performance-driven products.",
  github: "https://github.com/loszole",
  linkedin: "https://www.linkedin.com/in/loszole/",
  resumeUrl: "/mohammed-zaid-alam-resume.txt",
  email: "alamzaiduae@gmail.com",
  phone: "+971 544379862",
  location: "Ajman, UAE",
  navItems: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Now", href: "/now" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type NavItem = (typeof siteConfig.navItems)[number];