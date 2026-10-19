import Link from "next/link";
import { nav, site } from "@/config/site";
import { LogoMark } from "./icons";
import { ButtonLink } from "./ui";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/75 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-extrabold text-white">
          <LogoMark className="size-8" />
          <span>
            Mega<span className="text-brand-400">Business</span>
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm font-medium text-slate-300">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-brand-400">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.links.panel}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-sm font-medium text-slate-300 transition hover:text-white sm:inline"
          >
            Iniciar sesión
          </a>
          <ButtonLink href={site.links.demo} className="px-4 py-2 text-xs">
            Prueba gratis
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
