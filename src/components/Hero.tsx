import { heroTags, site } from "@/config/site";
import { ArrowRightIcon, ChatIcon, CheckIcon } from "./icons";
import { ButtonLink } from "./ui";

const columns = [
  { name: "Nuevos", tone: "bg-sky-400", leads: ["Laura M.", "Pedro G."] },
  { name: "Interesados", tone: "bg-amber-400", leads: ["Tienda Sol", "Carlos R."] },
  { name: "Cerrados", tone: "bg-brand-400", leads: ["Ana P."] },
];

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-[36rem] max-w-5xl rounded-full bg-brand-500/20 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-2 lg:pt-24 lg:pb-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-300">
            <span className="size-1.5 rounded-full bg-brand-400" />
            CRM para WhatsApp Web
          </p>
          <h1 className="mt-6 text-4xl leading-[1.05] font-extrabold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
            El problema <span className="text-brand-400">no es WhatsApp</span>… es cómo lo estás usando
          </h1>
          <p className="mt-6 max-w-xl text-lg text-pretty text-slate-400">
            {site.name} es el CRM práctico para organizar tus chats, responder más rápido y hacer seguimiento a cada
            cliente para vender más por WhatsApp.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {heroTags.map((tag) => (
              <li
                key={tag}
                className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-sm text-slate-300 ring-1 ring-white/10"
              >
                <CheckIcon className="size-4 text-brand-400" />
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={site.links.demo}>
              Solicitar una prueba
              <ArrowRightIcon className="size-4" />
            </ButtonLink>
            <ButtonLink href="#planes" variant="secondary">
              Ver planes
            </ButtonLink>
          </div>
        </div>

        <HeroMockup />
      </div>
    </section>
  );
}

/** Vista ilustrativa del tablero CRM, hecha con HTML para no depender de imágenes. */
function HeroMockup() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-lg">
      <div className="rounded-3xl border border-white/10 bg-ink-900/90 p-4 shadow-2xl shadow-black/50 sm:p-5">
        <div className="flex items-center gap-1.5 pb-4">
          <span className="size-2.5 rounded-full bg-red-400/80" />
          <span className="size-2.5 rounded-full bg-amber-400/80" />
          <span className="size-2.5 rounded-full bg-brand-400/80" />
          <span className="ml-3 text-xs text-slate-500">Tablero de ventas</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {columns.map((col) => (
            <div key={col.name} className="rounded-2xl bg-white/[0.03] p-2.5">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                <span className={`size-2 rounded-full ${col.tone}`} />
                {col.name}
              </p>
              <div className="mt-2.5 space-y-2">
                {col.leads.map((lead) => (
                  <div key={lead} className="rounded-xl bg-ink-800 p-2.5 ring-1 ring-white/5">
                    <p className="truncate text-xs font-semibold text-slate-200">{lead}</p>
                    <div className="mt-1.5 h-1.5 w-3/4 rounded-full bg-white/10" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -bottom-6 -left-3 flex max-w-[15rem] animate-float items-start gap-2.5 rounded-2xl border border-white/10 bg-ink-800 p-3 shadow-xl sm:-left-8">
        <ChatIcon className="size-8 shrink-0 text-brand-400" />
        <div>
          <p className="text-xs font-semibold text-white">Respuesta automática</p>
          <p className="mt-0.5 text-[11px] text-slate-400">¡Hola! Aquí tienes nuestro catálogo 👋</p>
        </div>
      </div>
      <div className="absolute -top-5 -right-2 rounded-2xl bg-brand-500 px-3.5 py-2 text-xs font-bold text-ink-950 shadow-lg shadow-brand-500/30 sm:-right-6">
        +1 venta cerrada
      </div>
    </div>
  );
}
