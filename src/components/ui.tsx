import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ButtonLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  variant?: "primary" | "secondary";
  external?: boolean;
};

const variants = {
  primary:
    "bg-brand-500 text-ink-950 shadow-lg shadow-brand-500/25 hover:bg-brand-400 hover:shadow-brand-400/40",
  secondary: "border border-white/15 bg-white/5 text-white hover:border-brand-400/60 hover:bg-white/10",
};

export function ButtonLink({ variant = "primary", external, className = "", ...props }: ButtonLinkProps) {
  // Por defecto, solo los enlaces absolutos (otro dominio) abren en pestaña nueva
  external ??= /^https?:/.test(props.href);
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold tracking-wide uppercase transition duration-200 hover:-translate-y-0.5 ${variants[variant]} ${className}`;

  // Rutas internas de la app: <Link> (navegación en cliente y prefetch)
  if (props.href.startsWith("/")) return <Link className={classes} {...props} />;

  return <a {...(external && { target: "_blank", rel: "noopener noreferrer" })} className={classes} {...props} />;
}

export function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold tracking-widest text-brand-400 uppercase">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance text-white sm:text-4xl">{title}</h2>
      {children && <p className="mt-4 text-lg text-pretty text-slate-400">{children}</p>}
    </div>
  );
}
