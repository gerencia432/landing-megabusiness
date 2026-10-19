import "server-only";

/**
 * Cliente de la API privada del panel (api/n8n/create-demo.php).
 * La llamada viaja por la red interna de Docker: nunca sale a internet
 * y el token jamás llega al navegador.
 */

const PANEL_API_URL = process.env.PANEL_API_URL ?? "http://socios-crm-web:8080/api/n8n/create-demo.php";
const PANEL_API_TOKEN = process.env.PANEL_API_TOKEN ?? "";

export type PanelDemoCode =
  | "demo_created"
  | "demo_active"
  | "demo_expired"
  | "already_premium"
  | "email_exists"
  | "invalid_whatsapp"
  | "invalid_email"
  | "unavailable";

export type PanelDemoResult = {
  code: PanelDemoCode;
  /** Solo en demo_created: si la automatización confirmó el envío por WhatsApp. */
  notified?: boolean;
};

const knownCodes = new Set<string>([
  "demo_created",
  "demo_active",
  "demo_expired",
  "already_premium",
  "email_exists",
  "invalid_whatsapp",
  "invalid_email",
]);

export async function createPanelDemo(input: { name: string; email: string; whatsapp: string }): Promise<PanelDemoResult> {
  if (!PANEL_API_TOKEN) {
    console.error("[demo] PANEL_API_TOKEN no está configurado");
    return { code: "unavailable" };
  }

  try {
    const res = await fetch(PANEL_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-SaaS-Token": PANEL_API_TOKEN },
      body: JSON.stringify({ type: "user", ...input }),
      cache: "no-store",
      // El panel espera hasta 7 s la confirmación de n8n antes de responder
      signal: AbortSignal.timeout(20_000),
    });

    const data: { code?: string; access_notification_sent?: boolean } = await res.json().catch(() => ({}));

    if (data.code && knownCodes.has(data.code)) {
      return { code: data.code as PanelDemoCode, notified: data.access_notification_sent };
    }

    console.error(`[demo] respuesta inesperada del panel: HTTP ${res.status} code=${data.code ?? "-"}`);
    return { code: "unavailable" };
  } catch (error) {
    console.error("[demo] no se pudo contactar el panel:", error instanceof Error ? error.message : error);
    return { code: "unavailable" };
  }
}
