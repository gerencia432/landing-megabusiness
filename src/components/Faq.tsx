import { faqs } from "@/config/site";
import { ChevronDownIcon } from "./icons";
import { SectionHeading } from "./ui";

/** Acordeón con <details>/<summary>: accesible y sin JavaScript en el cliente. */
export function Faq() {
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading eyebrow="Preguntas frecuentes" title="Resolvemos tus dudas antes de empezar" />

        <div className="mt-12 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              name="faq"
              className="group rounded-2xl border border-white/10 bg-white/[0.02] transition open:border-brand-400/30 open:bg-white/[0.04]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-white [&::-webkit-details-marker]:hidden">
                {faq.q}
                <ChevronDownIcon className="size-5 shrink-0 text-brand-400 transition group-open:rotate-180" />
              </summary>
              <p className="px-5 pb-5 text-slate-400">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Datos estructurados para que Google pueda mostrar las preguntas en los resultados. */
export function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
