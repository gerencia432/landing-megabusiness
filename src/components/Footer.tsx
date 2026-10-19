import { site } from "@/config/site";
import { ArrowRightIcon, ChatIcon, LogoMark } from "./icons";
import { ButtonLink } from "./ui";

export function FinalCta() {
  return (
    <section className="px-4 pb-20 sm:px-6 sm:pb-28">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-500 to-brand-700 px-6 py-14 text-center sm:px-12 sm:py-20">
        <div aria-hidden="true" className="absolute -top-24 -right-24 size-72 rounded-full bg-white/15 blur-3xl" />
        <h2 className="relative mx-auto max-w-3xl text-3xl font-extrabold tracking-tight text-balance text-ink-950 sm:text-4xl">
          Activa hoy tu sistema y empieza a vender con más orden y velocidad
        </h2>
        <p className="relative mx-auto mt-4 max-w-2xl text-lg text-pretty text-ink-900/80">
          Si tu negocio vende por WhatsApp, necesitas una herramienta que te ayude a responder rápido, hacer seguimiento y
          convertir más.
        </p>
        <div className="relative mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={site.links.demo} className="bg-ink-950 text-white shadow-black/30 hover:bg-ink-800 hover:shadow-black/40">
            Solicitar una prueba
            <ArrowRightIcon className="size-4" />
          </ButtonLink>
          <ButtonLink
            href={site.links.community}
            className="border border-ink-950/20 bg-white/20 text-ink-950 shadow-none hover:bg-white/35 hover:shadow-none"
          >
            Unirme a la comunidad
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto max-w-6xl space-y-6 px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2.5 font-extrabold text-white">
            <LogoMark className="size-7" />
            {site.name}
          </div>
          <a
            href={site.links.contact}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-400 transition hover:text-brand-400"
          >
            Contáctanos por WhatsApp
          </a>
        </div>
        <p className="text-center text-xs leading-relaxed text-slate-500 sm:text-left">
          Este sitio no forma parte de Facebook, Instagram, WhatsApp ni Messenger, ni está respaldado por Meta Platforms,
          Inc. Los resultados dependen del esfuerzo y la aplicación de cada usuario; no garantizamos resultados
          financieros específicos.
        </p>
        <p className="text-center text-xs text-slate-500 sm:text-left">
          © {site.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={site.links.contact}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed right-5 bottom-5 z-50 inline-flex size-14 items-center justify-center rounded-full bg-brand-500 text-white shadow-xl shadow-brand-500/30 transition hover:scale-110 hover:bg-brand-400"
    >
      <ChatIcon className="size-7" />
    </a>
  );
}
