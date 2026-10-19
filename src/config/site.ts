/**
 * Contenido y configuración central de la landing.
 * Edita este archivo para cambiar textos, precios, enlaces o el número de WhatsApp
 * sin tocar los componentes.
 */

/** Número de WhatsApp de ventas en formato internacional, solo dígitos (ej: 573001234567). */
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573000000000";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const site = {
  name: "MegaBusiness CRM",
  shortName: "MegaBusiness",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://megabusiness.tech",
  title: "MegaBusiness CRM | CRM para WhatsApp",
  description:
    "Organiza tus chats, responde más rápido y haz seguimiento a cada cliente. El CRM práctico para vender más por WhatsApp Web.",
  locale: "es_CO",
  links: {
    demo: "/prueba-gratis",
    panel: "https://panel.megabusiness.tech/login.php",
    contact: whatsappLink("Hola, quiero información sobre MegaBusiness CRM."),
    community: process.env.NEXT_PUBLIC_COMMUNITY_URL ?? whatsappLink("Hola, quiero unirme a la comunidad de MegaBusiness."),
  },
} as const;

export const nav = [
  { label: "Funciones", href: "/#funciones" },
  { label: "Planes", href: "/#planes" },
  { label: "Preguntas", href: "/#faq" },
] as const;

export const heroTags = ["Chatbot", "CRM visual", "Envíos masivos", "Marca blanca"] as const;

export const comparison = {
  before: [
    "Respondes tarde y el cliente se enfría",
    "No sabes qué tan caliente está cada lead",
    "Chats desordenados y mezclados",
    "Nadie hace seguimiento",
    "Ventas perdidas por mensajes olvidados",
    "Etiquetas manuales, o ninguna",
  ],
  after: [
    "Conversaciones automatizadas",
    "Etiquetas y CRM siempre organizados",
    "Envíos masivos en minutos",
    "Seguimiento y remarketing programados",
    "Todo centralizado en WhatsApp Web",
    "Más control a medida que escalas",
  ],
} as const;

export type FeatureIcon = "bot" | "megaphone" | "tag" | "kanban" | "flow" | "calendar";

export const features: { icon: FeatureIcon; title: string; description: string }[] = [
  {
    icon: "bot",
    title: "Chatbot",
    description: "Responde automáticamente, filtra a los curiosos y califica a tus leads mientras atiendes otros chats.",
  },
  {
    icon: "megaphone",
    title: "Mensajes masivos",
    description: "Envía campañas a tus contactos, listas o segmentos sin copiar y pegar uno por uno.",
  },
  {
    icon: "tag",
    title: "Etiquetas automáticas",
    description: "Clasifica cada conversación según su nivel de interés o la etapa de compra en la que está.",
  },
  {
    icon: "kanban",
    title: "CRM visual",
    description: "Mueve a tus prospectos por etapas en un tablero claro y ve de un vistazo a quién atender primero.",
  },
  {
    icon: "flow",
    title: "Flujos automáticos",
    description: "Crea secuencias de respuesta, nutrición y seguimiento que trabajan por ti.",
  },
  {
    icon: "calendar",
    title: "Seguimiento real",
    description: "Programa recordatorios y vuelve a contactar a cada cliente en el momento correcto.",
  },
];

export type Plan = {
  id: string;
  name: string;
  price: number;
  period: string;
  featured?: boolean;
  perks: { label: string; included: boolean }[];
};

export const plans: Plan[] = [
  {
    id: "mensual",
    name: "Mensual",
    price: 9,
    period: "1 mes",
    perks: [
      { label: "1 licencia", included: true },
      { label: "1 computador", included: true },
      { label: "Soporte por WhatsApp", included: true },
      { label: "Actualizaciones", included: false },
    ],
  },
  {
    id: "semestral",
    name: "Semestral",
    price: 49,
    period: "6 meses",
    featured: true,
    perks: [
      { label: "3 licencias", included: true },
      { label: "3 computadores", included: true },
      { label: "Soporte por WhatsApp", included: true },
      { label: "Actualizaciones", included: true },
    ],
  },
  {
    id: "anual",
    name: "Anual",
    price: 99,
    period: "1 año",
    perks: [
      { label: "4 licencias", included: true },
      { label: "4 computadores", included: true },
      { label: "Soporte por WhatsApp", included: true },
      { label: "Actualizaciones", included: true },
    ],
  },
  {
    id: "vitalicio",
    name: "Vitalicio",
    price: 199,
    period: "pago único",
    perks: [
      { label: "10 licencias", included: true },
      { label: "10 computadores", included: true },
      { label: "Soporte por WhatsApp", included: true },
      { label: "Actualizaciones", included: true },
    ],
  },
];

export const faqs = [
  {
    q: "¿Usa inteligencia artificial?",
    a: "No. El chatbot funciona con respuestas, reglas y flujos que tú configuras, así tienes control total de lo que se dice a tus clientes.",
  },
  {
    q: "¿Funciona 24/7?",
    a: "Es una extensión para el navegador, así que trabaja mientras tu computador esté encendido y WhatsApp Web esté abierto.",
  },
  {
    q: "¿Necesito tener el computador encendido?",
    a: "Sí. Las automatizaciones solo se ejecutan cuando el computador está encendido.",
  },
  {
    q: "¿Funciona con WhatsApp Web?",
    a: "Sí, está diseñado específicamente para trabajar sobre WhatsApp Web.",
  },
  {
    q: "¿Sirve si no tengo una agencia?",
    a: "Claro. Es para emprendedores, tiendas online, negocios de servicios, infoproductores, equipos de ventas y cualquier negocio que cierre ventas por WhatsApp.",
  },
  {
    q: "¿Tienen plan de reventa o marca blanca?",
    a: "Sí. Puedes revender el CRM con tu propia marca. Escríbenos para conocer las condiciones.",
  },
  {
    q: "¿Puedo probarlo antes de comprar?",
    a: "Sí. Activa tu prueba gratuita de 3 días desde el botón «Prueba gratis»: tus accesos llegan automáticamente a tu WhatsApp.",
  },
] as const;
