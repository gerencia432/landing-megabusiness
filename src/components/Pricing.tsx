import { plans, site, whatsappLink, type Plan } from "@/config/site";
import { CheckIcon, XIcon } from "./icons";
import { ButtonLink, SectionHeading } from "./ui";

export function Pricing() {
  return (
    <section id="planes" className="border-y border-white/5 bg-ink-900 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Planes" title="Elige el plan ideal para crecer con WhatsApp">
          Todos los planes incluyen acceso al CRM y soporte. Precios en dólares (USD).
        </SectionHeading>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const href = whatsappLink(`Hola, quiero comprar el plan ${plan.name} de ${site.name} (USD ${plan.price}).`);

  return (
    <li
      className={`relative flex flex-col rounded-3xl p-7 ${
        plan.featured
          ? "bg-gradient-to-b from-brand-500/20 to-ink-800 ring-2 ring-brand-400 lg:-my-3 lg:py-10"
          : "bg-ink-800/70 ring-1 ring-white/10"
      }`}
    >
      {plan.featured && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold tracking-wide whitespace-nowrap text-ink-950 uppercase">
          Más vendido
        </span>
      )}
      <h3 className="text-sm font-semibold tracking-widest text-slate-400 uppercase">{plan.name}</h3>
      <p className="mt-4 flex items-baseline gap-1.5">
        <span className="text-5xl font-extrabold tracking-tight text-white">${plan.price}</span>
        <span className="text-sm font-medium text-slate-400">USD</span>
      </p>
      <p className="mt-1 text-sm text-slate-500">{plan.period}</p>

      <ul className="mt-7 flex-1 space-y-3 text-sm">
        {plan.perks.map((perk) => (
          <li key={perk.label} className={`flex gap-2.5 ${perk.included ? "text-slate-200" : "text-slate-500 line-through"}`}>
            {perk.included ? (
              <CheckIcon className="size-5 shrink-0 text-brand-400" />
            ) : (
              <XIcon className="size-5 shrink-0 text-slate-600" />
            )}
            <span>
              {perk.label}
              {!perk.included && <span className="sr-only"> (no incluido)</span>}
            </span>
          </li>
        ))}
      </ul>

      <ButtonLink href={href} variant={plan.featured ? "primary" : "secondary"} className="mt-8 w-full">
        Comprar
      </ButtonLink>
    </li>
  );
}
