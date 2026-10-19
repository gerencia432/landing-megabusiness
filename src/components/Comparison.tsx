import { comparison, site } from "@/config/site";
import { CheckIcon, XIcon } from "./icons";
import { SectionHeading } from "./ui";

export function Comparison() {
  return (
    <section aria-labelledby="comparison-title" className="border-y border-white/5 bg-ink-900 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Antes vs. después" title={<span id="comparison-title">De perder clientes a cerrar ventas todos los días</span>} />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-red-400/15 bg-red-500/[0.04] p-7 sm:p-8">
            <h3 className="text-lg font-bold text-white">Sin {site.name}</h3>
            <ul className="mt-6 space-y-4">
              {comparison.before.map((item) => (
                <li key={item} className="flex gap-3 text-slate-400">
                  <XIcon className="mt-0.5 size-5 shrink-0 text-red-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-brand-400/30 bg-brand-500/[0.07] p-7 shadow-xl shadow-brand-500/5 sm:p-8">
            <h3 className="text-lg font-bold text-white">Con {site.name}</h3>
            <ul className="mt-6 space-y-4">
              {comparison.after.map((item) => (
                <li key={item} className="flex gap-3 text-slate-200">
                  <CheckIcon className="mt-0.5 size-5 shrink-0 text-brand-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
