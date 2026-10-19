"use client";

import Link from "next/link";
import { useActionState } from "react";
import { requestDemo, type DemoFormState } from "@/app/prueba-gratis/actions";
import { site } from "@/config/site";
import { CountrySelect } from "./CountrySelect";
import { ArrowRightIcon, ChatIcon, CheckIcon } from "./icons";
import { ButtonLink } from "./ui";


const initialState: DemoFormState = { status: "idle" };

const inputClass =
  "mt-2 block w-full rounded-xl border border-white/10 bg-ink-950/60 px-4 py-3 text-white placeholder:text-slate-500 transition outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30 aria-invalid:border-red-400/70";

export function DemoForm() {
  const [state, formAction, pending] = useActionState(requestDemo, initialState);

  if (state.status === "success") {
    return <DemoSuccess whatsapp={state.whatsapp} notified={state.notified} />;
  }

  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const values = state.status === "error" ? state.values : undefined;

  return (
    <form action={formAction} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="text-sm font-semibold text-slate-200">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          defaultValue={values?.name}
          placeholder="Tu nombre"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={inputClass}
        />
        <FieldError id="name-error" message={errors.name} />
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-semibold text-slate-200">
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={values?.email}
          placeholder="tucorreo@ejemplo.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClass}
        />
        <FieldError id="email-error" message={errors.email} />
      </div>

      <div>
        <div className="grid grid-cols-[7.75rem_1fr] gap-3">
          <div>
            <span id="country-label" className="text-sm font-semibold text-slate-200">
              País
            </span>
            <CountrySelect labelId="country-label" defaultIso={values?.countryIso} />
          </div>
          <div>
            <label htmlFor="phone" className="text-sm font-semibold text-slate-200">
              Número de teléfono
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              required
              defaultValue={values?.phone}
              placeholder="300 123 4567"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
              className={inputClass}
            />
          </div>
        </div>
        {errors.phone ? (
          <FieldError id="phone-error" message={errors.phone} />
        ) : (
          <p id="phone-hint" className="mt-2 text-sm text-slate-500">
            A este número te enviaremos tu usuario y contraseña.
          </p>
        )}
      </div>

      {/* Honeypot anti-bots: invisible para personas */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Empresa</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && !Object.keys(errors).length && (
        <div role="alert" className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-100">
          <p>{state.message}</p>
          {state.action && <ErrorAction action={state.action} />}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-4 text-sm font-bold tracking-wide text-ink-950 uppercase shadow-lg shadow-brand-500/25 transition duration-200 hover:-translate-y-0.5 hover:bg-brand-400 disabled:pointer-events-none disabled:opacity-60"
      >
        {pending ? (
          <>
            <span className="size-4 animate-spin rounded-full border-2 border-ink-950/30 border-t-ink-950" />
            Creando tu prueba…
          </>
        ) : (
          <>
            Activar mi prueba gratis
            <ArrowRightIcon className="size-4" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-slate-500">3 días gratis · Sin tarjeta de crédito · Acceso inmediato</p>
    </form>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-red-300">
      {message}
    </p>
  );
}

function ErrorAction({ action }: { action: "plans" | "login" | "support" }) {
  const link = {
    plans: { href: "/#planes", label: "Ver planes", external: false },
    login: { href: site.links.panel, label: "Iniciar sesión", external: true },
    support: { href: site.links.contact, label: "Escribir a soporte", external: true },
  }[action];

  const className = "mt-2 inline-flex items-center gap-1 font-semibold text-brand-300 underline-offset-4 hover:underline";
  const content = (
    <>
      {link.label}
      <ArrowRightIcon className="size-3.5" />
    </>
  );

  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <Link href={link.href} className={className}>
      {content}
    </Link>
  );
}

function DemoSuccess({ whatsapp, notified }: { whatsapp: string; notified: boolean }) {
  return (
    <div role="status" className="text-center">
      <span className="mx-auto inline-flex size-16 items-center justify-center rounded-full bg-brand-500/15 text-brand-400 ring-1 ring-brand-400/30">
        <CheckIcon className="size-8" />
      </span>
      <h2 className="mt-5 text-2xl font-extrabold text-white">¡Tu prueba está activa!</h2>

      {notified ? (
        <p className="mt-3 text-slate-400">
          Te enviamos tu usuario, contraseña y el enlace de instalación por WhatsApp
          {whatsapp && (
            <>
              {" "}
              al <span className="font-semibold text-slate-200">{whatsapp}</span>
            </>
          )}
          . Revisa tus mensajes en unos segundos.
        </p>
      ) : (
        <p className="mt-3 text-slate-400">
          Tu cuenta fue creada, pero no pudimos confirmar el envío de tus accesos por WhatsApp. Escríbenos y te los
          enviamos de inmediato.
        </p>
      )}

      <div className="mt-7 flex flex-col gap-3">
        <ButtonLink href={site.links.panel}>Ir al panel</ButtonLink>
        <ButtonLink href={site.links.contact} variant="secondary">
          <ChatIcon className="size-4" />
          Hablar con soporte
        </ButtonLink>
      </div>
    </div>
  );
}
