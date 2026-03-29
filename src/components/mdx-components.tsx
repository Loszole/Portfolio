import Link from "next/link";

export const mdxComponents = {
  a: ({ href = "", children, ...props }: React.ComponentProps<"a">) => {
    const isInternal = href.startsWith("/");

    if (isInternal) {
      return (
        <Link href={href} className="text-cyan-200 underline decoration-cyan-400/50 underline-offset-4" {...props}>
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-200 underline decoration-cyan-400/50 underline-offset-4"
        {...props}
      >
        {children}
      </a>
    );
  },
  pre: ({ children, ...props }: React.ComponentProps<"pre">) => (
    <pre
      className="overflow-x-auto rounded-xl border border-white/10 bg-black/50 p-4 text-sm leading-6 text-zinc-100"
      {...props}
    >
      {children}
    </pre>
  ),
};