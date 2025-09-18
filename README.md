# Vallarta WKND

> **Proyecto de muestra.** Vallarta WKND es un negocio ficticio y este sitio no se opera comercialmente: existe como pieza de portafolio y se despliega en producción sólo para poder enseñarlo. Los teléfonos, correos, precios, reseñas y documentos legales son de relleno y así se quedan; no hay backend porque no hay reservas que atender.

Sitio de **Vallarta WKND**, tours en barco por Bahía de Banderas: Arcos – Ánimas – Quimixto, Yelapa – Majahuitas, Islas Marietas, avistamiento de ballenas y charter privado. Seis rutas en Next.js (portada, servicios, detalle de cada servicio, contacto y los dos documentos legales), en español y en inglés; no hay CMS ni base de datos: el contenido vive en el repositorio y el sitio se sirve estático.

## Requisitos

- **Node 20.9+** (requisito de Next 16). CI corre con Node 22.
- Variables de entorno en `.env.local` (copia `.env.example`): sólo `NEXT_PUBLIC_SITE_URL`, la URL pública que usan el sitemap, `robots.txt`, las canónicas y Open Graph. Sin ella se asume el dominio de producción.

## Puesta en marcha

```bash
npm install
cp .env.example .env.local
npm run dev                  # http://localhost:3000 (español) y /en (inglés)
```

## Comandos disponibles

| Comando                                   | Descripción                                             |
| ----------------------------------------- | ------------------------------------------------------- |
| `npm run dev`                             | Servidor de desarrollo.                                 |
| `npm run build`                           | Build de producción (todo estático).                    |
| `npm run start`                           | Sirve el build de producción.                           |
| `npm run lint`                            | ESLint.                                                 |
| `npm run typecheck`                       | `next typegen` + `tsc --noEmit`, lo mismo que corre CI. |
| `npm run test`                            | Vitest, una pasada.                                     |
| `npm run test:watch`                      | Vitest en modo watch.                                   |
| `npm run test:coverage`                   | Vitest con cobertura (v8) sobre `lib` y `constants`.    |
| `npm run format` / `npm run format:check` | Prettier sobre el repo.                                 |

`.github/workflows/ci.yml` corre `lint`, `typecheck`, `test` y `build` en cada push a `main` y en cada pull request.

## Mapa de rutas

| Página               | Español             | Inglés                |
| -------------------- | ------------------- | --------------------- |
| Portada              | `/`                 | `/en`                 |
| Servicios            | `/servicios`        | `/en/services`        |
| Detalle del servicio | `/servicios/<slug>` | `/en/services/<slug>` |
| Contacto             | `/contacto`         | `/en/contact`         |
| Términos             | `/terminos`         | `/en/terms`           |
| Aviso de privacidad  | `/privacidad`       | `/en/privacy`         |

- El español es el idioma por defecto y va sin prefijo. `proxy.ts` (next-intl) añade el segmento de idioma a cada petición, traduce las rutas según `pathnames` de `i18n/routing.ts` y, en la primera visita sin prefijo, redirige a `/en` si el navegador prefiere inglés.
- Los `<slug>` salen de `constants/services.const.ts` y cambian con el idioma: en español son la clave del catálogo (`arcos-animas-quimixto`, `yelapa-majahuitas`, `islas-marietas`, `avistamiento-de-ballenas`, `charter-privado`) y en inglés los de `englishSlug` (`marietas-islands`, `whale-watching`, `private-charter`; los que se llaman como un lugar no cambian). `lib/service-slug.ts` traduce entre los dos y cada página responde sólo al suyo: `/en/services/avistamiento-de-ballenas` es 404. La portada, los paneles de `/servicios`, el carrusel y el sitemap salen de esa misma lista.
- `#reservar` en un detalle es la tarjeta de reserva; el buscador de la portada llega ahí con `?fecha=AAAA-MM-DD&personas=N` y la tarjeta lo prellena.
- Los dos documentos legales comparten sección (`components/site/sections/legal/document/`) y su copy está en `legal.terms` y `legal.privacy`; el pie enlaza a los dos desde `LEGAL_LINKS` de `constants/navigation.const.ts`.
- Cualquier otra URL bajo un idioma conocido muestra la 404 de `app/[locale]/not-found.tsx`.

Además Next genera `/robots.txt`, `/sitemap.xml` (todas las páginas en los dos idiomas con sus alternativas `hreflang`), `/icon.svg` y la tarjeta de Open Graph de cada idioma.

## Contenido e idiomas

Todo lo que lee el visitante está en `messages/es.json` y `messages/en.json`, con las mismas claves (el español es el catálogo de referencia y da el tipo de `t()`; ver `types/next-intl.d.ts`). Espacios de nombres: `meta` (títulos y descripciones), `common`, `nav`, `footer`, `home.*`, `services`, `service` (rótulos compartidos por los detalles, comodidades y qué llevar), `booking` (la tarjeta de reserva, la temporada y los mensajes de WhatsApp), `catalog.<slug>` (todo el copy de cada servicio: nombre, blurb, itinerario, incluye/no incluye, preguntas y reseñas), `contact`, `legal` (los dos documentos, cada uno con sus secciones) y `notFound`. Las listas son arrays JSON y se leen con `t.raw` a través de `lib/message-list.ts` (textos) o `lib/message-records.ts` (registros con campos fijos).

Lo que no cambia con el idioma está en `constants/`:

- `site.const.ts`: nombre, correo, teléfono (y el mismo número para WhatsApp), dirección, redes, horario, cifras de la portada (`FIGURES`), el porcentaje del anticipo y el año.
- `services.const.ts`: los cinco servicios en orden, con foto, precio por persona (o `null` si se cotiza), duración, horas de salida, tamaño de grupo, muelle, temporada, comodidades y qué llevar; más las fotos de las reseñas.
- `navigation.const.ts`: las tres páginas del menú (`NAV_ITEMS`) y los dos documentos legales del pie (`LEGAL_LINKS`).

Las imágenes están en `public/images` (JPEG de las fotos de los servicios a 1800 px, los heros, los retratos de las reseñas y el arte del pie en SVG), los iconos en `app/` (`icon.svg` para navegadores modernos, `favicon.ico` de 32 px y `apple-icon.png` de 180 px, rasterizados del mismo dibujo) y la fuente en `public/fonts` (Poppins 400–800, subconjuntos latinos de Google Fonts servidos en local desde `app/[locale]/fonts.ts`). `assets/fonts` guarda la misma Poppins en TrueType: no se sirve al visitante, la lee el generador de la tarjeta de Open Graph, que no entiende woff2.

## Reservas y contacto

No hay backend todavía. «Reservar» (tarjeta de un detalle) arma un mensaje de WhatsApp con el servicio, la fecha, la hora y las personas elegidas (`lib/build-whatsapp-url.ts`) y lo abre en `wa.me`; el total y el anticipo del 30% se calculan en `lib/booking-total.ts`. El formulario de contacto abre el correo del visitante con el mensaje escrito (`lib/build-mailto-url.ts`). Los dos puntos están aislados para cambiarlos por un endpoint cuando exista (ver `IMPROVEMENTS.md`).

## Arquitectura en breve

- **`app/[locale]/`**: layout (fuente, metadatos base, proveedor de next-intl, cabecera y pie), `page.tsx` (compone las secciones de `config/site.config.ts`), `servicios/page.tsx`, `servicios/[slug]/page.tsx` (una por servicio e idioma con `generateStaticParams`), `contacto/page.tsx`, `terminos/page.tsx` y `privacidad/page.tsx` (los dos con la misma sección), `opengraph-image.tsx` (la tarjeta para redes, una por idioma, generada en el build), la 404 y `globals.css` (tokens y clases compartidas). `robots.ts`, `sitemap.ts` e `icon.svg` quedan en `app/`.
- **`proxy.ts`** e **`i18n/`**: rutas por idioma y traducidas (`routing.ts`), carga de mensajes por petición (`request.ts`) y `Link`/`usePathname`/`getPathname` conscientes del idioma (`navigation.ts`).
- **`components/site/sections/`**: `shell/` (cabecera con navegación activa, menú del teléfono y botón de reservar; pie) y una carpeta por página: `home/` (hero con buscador, carrusel, tres pasos, cifras y reseñas), `services/` (hero y paneles), `service/` (hero con la tarjeta de reserva, itinerario, incluido, reseñas, preguntas) `contact/` (hero, formulario y canales) y `legal/` (el documento con su índice pegajoso). Cada `.section.tsx` o `.comp.tsx` importa su propio `.css`.
- **`components/site/shared/`**: iconos, logo, hero de página, carrusel de servicios (escritorio y teléfono con un solo DOM), selector de idioma, redes, el ornamento de olas y `Reveal`, que aparece un elemento la primera vez que llega a la pantalla renderizando su misma etiqueta.
- **`hooks/`**: `use-carousel.hook.ts` (índice circular, flechas, swipe y qué fotos del escenario vale la pena cargar) y `use-reveal.hook.ts` (un `IntersectionObserver` que dispara una sola vez).
- **`lib/`**: funciones puras con test al lado (`*.test.ts`).
- **`constants/`** y **`messages/`**: el contenido (ver arriba).

Los componentes de cliente son los que tienen estado o leen la URL: el menú del teléfono, la navegación (marca la página activa), el selector de idioma (conserva la página al cambiar), el carrusel, el buscador del hero, la tarjeta de reserva y el formulario de contacto. Todo lo demás son Server Components.

## Despliegue en Vercel

Basta con conectar el repositorio: no hay variables obligatorias. Define `NEXT_PUBLIC_SITE_URL` con el dominio del despliegue para que el sitemap, las canónicas y la tarjeta social lo usen.

Las convenciones de código están en `AGENTS.md`; la deuda conocida, en `IMPROVEMENTS.md`; las tareas mecánicas, en `todos.md`.
