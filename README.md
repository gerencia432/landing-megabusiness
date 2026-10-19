# Landing MegaBusiness CRM

Landing de ventas construida con **Next.js 16 (App Router)**, **React 19**, **TypeScript** y **Tailwind CSS 4**.
Toda la página se genera como HTML estático (sin JavaScript en el cliente para la interfaz).

## Requisitos

- Node.js 20.9 o superior (probado con Node 24)

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # completa el número de WhatsApp
npm run dev                  # http://localhost:3000
```

## Scripts

| Comando         | Uso                                   |
| --------------- | ------------------------------------- |
| `npm run dev`   | Servidor de desarrollo                |
| `npm run build` | Build de producción                   |
| `npm start`     | Sirve el build de producción          |
| `npm run lint`  | ESLint                                |

## Editar contenido

Todos los textos, precios, preguntas frecuentes y enlaces están en **`src/config/site.ts`**.
No hace falta tocar los componentes para cambiar el contenido.

## Estructura

```
src/
├── app/
│   ├── layout.tsx      # HTML base, fuente, metadatos SEO / Open Graph
│   ├── page.tsx        # Composición de secciones
│   ├── globals.css     # Tema de Tailwind (colores de marca)
│   ├── icon.svg        # Favicon
│   ├── robots.ts       # /robots.txt
│   └── sitemap.ts      # /sitemap.xml
├── components/         # Una sección por archivo (Hero, Pricing, Faq, …)
└── config/site.ts      # Contenido y configuración
```

## Variables de entorno

Ver `.env.example`. Las variables `NEXT_PUBLIC_*` se insertan al compilar: después de cambiarlas, vuelve a ejecutar `npm run build`.
