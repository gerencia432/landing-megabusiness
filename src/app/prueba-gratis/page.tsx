import type { Metadata } from "next";
import { DemoForm } from "@/components/DemoForm";
import { Footer, WhatsAppFloat } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Prueba gratis de 3 días",
  description: "Activa gratis tu CRM para WhatsApp por 3 días. Recibe tus accesos al instante por WhatsApp.",
  alternates: { canonical: "/prueba-gratis" },
};

const steps = [
  "Completa tus datos en menos de 1 minuto.",
  "Recibe tu usuario y contraseña por WhatsApp.",
  "Instala la extensión y empieza a vender más.",
];

const includes = ["Chatbot y respuestas automáticas", "CRM visual por etapas", "Mensajes masivos y etiquetas", "Soporte por WhatsApp"];

export default function DemoPage() {
  return (
    <>
      <Header />
      <main className="relative flex-1 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-[36rem] max-w-5xl rounded-full bg-brand-500/15 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_28rem] lg:items-start lg:py-24">
          <div className="lg:pt-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-300">
              <span className="size-1.5 rounded-full bg-brand-400" />
              3 días gratis · sin tarjeta
            </p>
            <h1 className="mt-6 text-4xl leading-[1.05] font-extrabold tracking-tight text-balance text-white sm:text-5xl">
              Activa tu CRM para WhatsApp y <span className="text-brand-400">empieza a vender más hoy</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-pretty text-slate-400">
              Prueba todas las funciones durante 3 días. Tus accesos llegan automáticamente a tu WhatsApp.
            </p>

            <ol className="mt-10 space-y-4">
              {steps.map((step, i) => (
                <li key={step} className="flex items-center gap-4">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-extrabold text-ink-950">
                    {i + 1}
                  </span>
                  <span className="text-slate-200">{step}</span>
                </li>
              ))}
            </ol>

            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {includes.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-slate-300">
                  <CheckIcon className="size-5 shrink-0 text-brand-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rounded-3xl border border-white/10 bg-ink-900/90 p-6 shadow-2xl shadow-black/40 sm:p-8">
            <h2 className="text-xl font-extrabold text-white">Crea tu cuenta de prueba</h2>
            <p className="mt-1 mb-7 text-sm text-slate-400">Solo necesitamos 3 datos.</p>
            <DemoForm />
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
