# Pending improvements

Backlog of the project's technical debt and improvements. Every entry carries an **area**, a
**priority** (low · medium · high) and a guide on how to approach it.

> Last review: 2025-09-18. What is still open is at the top; what is already resolved is left
> noted with what was done, so it is not reopened.

> This is a sample project: the site is deployed but never operated commercially (see
> `README.md`). Anything that only makes sense for a business taking real bookings is under
> "Out of scope" at the end, with what it would take, in case that ever changes.

---

## MEDIUM priority

### 1. Segment prefetch of unprefixed routes can answer 404 — [i18n]

With `localePrefix: "as-needed"` the router sometimes asks a Spanish URL for the wrong segment:
it prefetches `/terminos?_rsc=…` (or `/servicios?_rsc=…`) with `Next-Router-Segment-Prefetch:
/$d$locale/__PAGE__` — the segment of the home — and Next answers 404. Which link it hits moves
with the page and the viewport: on the desktop home it was the two legal links of the footer, on
the phone home it was `/servicios`. Every English (prefixed) URL answers 200, and navigation
always worked: the click fetches again and gets its page.

The cause is under Next, not next-intl: its `Link` only turns prefetch off when the link carries
another `locale`. The segment cache and the proxy's rewrite of the unprefixed Spanish URLs
disagree about the route tree. `experimental.clientSegmentCache` is gone in Next 16, so there is
no flag to fall back to whole-route prefetching.

The footer's legal links carry `prefetch={false}`, which costs nothing (they are rarely opened).
The nav links keep their prefetch: the pages are static and small, so the fix would cost more
than the 404 in the console. If it ever has to go away completely the options are
`prefetch={false}` on every internal link or `localePrefix: "always"` — Spanish would then move
to `/es`, which the design does not want. Worth re-testing on every Next and next-intl release:
open the home on the desktop with the footer in view, and again at 390 px.

---

## Out of scope while the site is a sample

### A real booking and contact backend — [Product]

Bookings are a WhatsApp message (`booking-aside.comp.tsx` → `lib/build-whatsapp-url.ts`) and the
contact form opens a `mailto:` (`contact-form.comp.tsx` → `lib/build-mailto-url.ts`). Both are
isolated on purpose: a route handler or a server action that stores or emails the request would
replace those two calls and nothing else, plus a honeypot and a rate limit before exposing it.
Availability per date would need a calendar source; the hero already carries date and people in
the query string.

### Real business data — [Content]

Phone (`+52 322 000 0000`), email, address, social profiles, prices, departure times, group
sizes, the figures of the home (`FIGURES`), every review and the two legal documents come from
the design and stay as they are. They live in `constants/site.const.ts`,
`constants/services.const.ts` and `messages/*.json` (`catalog.<slug>`, `home.proof.reviews`,
`legal.*`), so they are one search away if the site ever becomes real.

---

## Resolved

### Localized service slugs — [i18n] · 2025-09-18

Each trip carries the segment of both languages (`englishSlug` in `constants/services.const.ts`)
and `lib/service-slug.ts` translates between them: `/servicios/avistamiento-de-ballenas` is
`/en/services/whale-watching`, and the trips named after a place keep their name. A page answers
only to the segment of the language it is read in — the other one is a 404, so no trip has two
live URLs in one language — and the links, the canonicals, the `hreflang`, the sitemap, the hero
search and the language switch all go through the same helper.

### The Spanish Open Graph card was served through a redirect — [SEO] · 2025-09-18

The card moved from the `opengraph-image.tsx` file convention to a route, `app/og/[locale]`,
which `proxy.ts` leaves alone; the layout and every page without a photo of its own point
`openGraph.images` (and `twitter`) at `/og/es` or `/og/en` through `ogCard()` in
`lib/page-metadata.ts`. A scraper now gets the image with no hop. Next does not inherit
`openGraph` from the layout when a page writes its own, which is why each page names the card.

### Favicon set — [Brand] · 2025-09-18

`app/favicon.ico` (32 px) and `app/apple-icon.png` (180 px) next to the `icon.svg` that was
already there, all three the same navy tile with the lime W.

### Reveal on scroll — [UX] · 2025-09-17

`hooks/use-reveal.hook.ts` (one IntersectionObserver, fires once) and
`components/site/shared/reveal.comp.tsx`, which renders the tag it is given so grids and
direct-child selectors do not notice it. The panels of `/servicios`, the three steps and the
reviews of the home and the quotes of a trip fade in, staggered with `order`. Under
`prefers-reduced-motion` the stylesheet leaves everything in place, and a `<noscript>` rule in
the layout keeps the cards visible without JavaScript.

### Carousel photos are all loaded up front — [Performance] · 2025-09-16

The stage now renders only the photos `lib/carousel-photos.ts` asks for: the active one and the
next before the first move, plus both neighbours of every slide that is opened. The home asks
for two of the five large photos instead of five, and a photo already loaded stays in the DOM so
going back crossfades without a new request.

### Whale season in the booking card — [Product] · 2025-09-16

`lib/season.ts` (wrapping ranges: December to March) and `lib/format-month.ts` feed the line
under the date of `booking-aside.comp.tsx`: a quiet "Esta salida opera de diciembre a marzo."
that turns into a warning when the date that was picked falls outside the season. Trips without
a season say nothing.

### Open Graph image — [SEO] · 2025-09-16

`app/[locale]/opengraph-image.tsx` draws the card with `ImageResponse`, one per language, baked
at build time. Poppins for it lives in `assets/fonts/*.ttf` (Satori cannot read the woff2 the
site serves). The pages inherit it; the detail pages keep their own photo. See #5 for the
redirect on the Spanish URL.

### Terms and privacy pages — [Legal] · 2025-09-15

`/terminos` (`/en/terms`) and `/privacidad` (`/en/privacy`) render from one section,
`components/site/sections/legal/document/`, with the copy in `legal.terms` and `legal.privacy`
and the crew's data read from `constants/site.const.ts`. The footer links to both from
`LEGAL_LINKS` and the sitemap lists them. The copy still needs a lawyer's review (`todos.md`).
