"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { createPanelDemo } from "@/lib/panel";
import { isRateLimited } from "@/lib/rate-limit";

export type DemoFormState =
  | { status: "idle" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<"name" | "email" | "phone", string>>;
      values?: { name: string; email: string; country: string; countryIso: string; phone: string };
      action?: "plans" | "login" | "support";
    }
  | { status: "success"; whatsapp: string; notified: boolean };

const schema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre.").max(80, "El nombre es demasiado largo."),
  email: z.email("Escribe un correo válido.").trim().toLowerCase().max(120),
  country: z.string().regex(/^\d{1,4}$/, "Selecciona tu país."),
  phone: z
    .string()
    .transform((v) => v.replace(/\D+/g, ""))
    .pipe(z.string().min(6, "Escribe tu número de WhatsApp.").max(13, "El número es demasiado largo.")),
});

export async function requestDemo(_prev: DemoFormState, formData: FormData): Promise<DemoFormState> {
  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    country: String(formData.get("country") ?? ""),
    countryIso: String(formData.get("countryIso") ?? ""),
    phone: String(formData.get("phone") ?? ""),
  };

  // Honeypot: los bots rellenan el campo oculto; respondemos como si nada.
  if (formData.get("company")) {
    return { status: "success", whatsapp: "", notified: true };
  }

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<"name" | "email" | "phone", string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] === "country" ? "phone" : (issue.path[0] as "name" | "email" | "phone");
      fieldErrors[field] ??= issue.message;
    }
    return { status: "error", message: "Revisa los datos marcados.", fieldErrors, values };
  }

  const h = await headers();
  const ip = h.get("cf-connecting-ip") ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(`demo:${ip}`, { limit: 5, windowMs: 15 * 60_000 })) {
    return { status: "error", message: "Demasiados intentos. Espera unos minutos y vuelve a intentarlo.", values };
  }

  const { name, email, country, phone } = parsed.data;
  const whatsapp = `${country}${phone}`;
  const result = await createPanelDemo({ name, email, whatsapp });

  switch (result.code) {
    case "demo_created":
      return { status: "success", whatsapp: `+${whatsapp}`, notified: result.notified ?? false };
    case "demo_active":
      return {
        status: "error",
        message: "Este WhatsApp ya tiene una prueba activa. Revisa tus mensajes: ahí están tus accesos.",
        action: "support",
        values,
      };
    case "demo_expired":
      return {
        status: "error",
        message: "Este WhatsApp ya usó su prueba gratuita. Elige un plan para seguir vendiendo con el CRM.",
        action: "plans",
        values,
      };
    case "already_premium":
      return { status: "error", message: "Este WhatsApp ya tiene una cuenta Premium activa.", action: "login", values };
    case "email_exists":
      return {
        status: "error",
        message: "Revisa los datos marcados.",
        fieldErrors: { email: "Este correo ya está registrado." },
        values,
      };
    case "invalid_whatsapp":
      return { status: "error", message: "Revisa los datos marcados.", fieldErrors: { phone: "Número de WhatsApp inválido." }, values };
    case "invalid_email":
      return { status: "error", message: "Revisa los datos marcados.", fieldErrors: { email: "Correo inválido." }, values };
    default:
      return {
        status: "error",
        message: "No pudimos crear tu prueba en este momento. Inténtalo de nuevo o escríbenos por WhatsApp.",
        action: "support",
        values,
      };
  }
}
