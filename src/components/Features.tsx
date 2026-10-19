import { features } from "@/config/site";
import { FeatureGlyph } from "./icons";
import { SectionHeading } from "./ui";

export function Features() {
  return (
    <section id="funciones" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Funciones" title="Todo lo que necesitas para vender más por WhatsApp">
          Herramientas pensadas para responder rápido, no perder ningún lead y convertir más conversaciones en ventas.
        </SectionHeading>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="group rounded-3xl border border-white/10 bg-white/[0.02] p-7 transition duration-300 hover:-translate-y-1 hover:border-brand-400/40 hover:bg-white/[0.04]"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-400 ring-1 ring-brand-400/20 transition group-hover:bg-brand-500 group-hover:text-ink-950">
                <FeatureGlyph name={feature.icon} className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-white">{feature.title}</h3>
              <p className="mt-2 text-slate-400">{feature.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
