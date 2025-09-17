# Pending improvements

Backlog of the project's technical debt and improvements. Every entry carries an **area**, a
**priority** (low · medium · high) and a guide on how to approach it.

> Last review: 2025-09-17. What is still open is at the top; what is already resolved is left
> noted with what was done, so it is not reopened.

---

## HIGH priority

### 1. A real booking and contact backend — [Product]

Bookings are a WhatsApp message (`booking-aside.comp.tsx` → `lib/build-whatsapp-url.ts`) and
the contact form opens a `mailto:` (`contact-form.comp.tsx` → `lib/build-mailto-url.ts`). Both
are isolated on purpose. When the crew has a channel to receive requests, add a route handler
(`app/api/...`) or a server action that stores or emails them, keep the WhatsApp link as the
secondary action, and add a honeypot plus a rate limit before exposing it. Availability per date
would need a calendar source; the search of the hero already carries date and people in the
query string.

### 2. Real business data — [Content]

Phone (`+52 322 000 0000`), email, address, social profiles, prices, departure times, group sizes,
the figures of the home (`FIGURES`), every review and the two legal documents are placeholders
taken from the design. They all live in `constants/site.const.ts`, `constants/services.const.ts`
and `messages/*.json` (`catalog.<slug>`, `home.proof.reviews`, `legal.*`). Replace them before
launch and check the English copy with a native reader.

## MEDIUM priority

### 3. Segment prefetch of unprefixed routes can answer 404 — [i18n]

With `localePrefix: "as-needed"` the router sometimes asks a Spanish URL for the wrong segment:
from the home it prefetched `/terminos?_rsc=…` with `Next-Router-Segment-Prefetch:
/$d$locale/__PAGE__` — the segment of the home — and Next answered 404. The same links from any
other page, and every English (prefixed) URL, answer 200. Navigation always worked: the click
fetches again and gets its page.

The footer's legal links carry `prefetch={false}` because of this, which costs nothing (they are
rarely opened) and leaves the console clean. If it shows up on a link that matters, the options
are `localePrefix: "always"` (Spanish would move to `/es`) or dropping the prefetch of that link
too. Worth re-testing on every next-intl and Next release: check the console of the home with the
footer in view.

## LOW priority

### 4. Localized service slugs — [i18n]

The slugs are Spanish in both languages (`/en/services/avistamiento-de-ballenas`). next-intl
supports per-locale segments in `pathnames`, but the slugs would then have to be mapped back to
the catalogue keys in the page and the sitemap. Only worth it if English SEO matters.

### 5. The Spanish Open Graph card is served through a redirect — [SEO]

`app/[locale]/opengraph-image.tsx` is a file convention, so Next writes the URL of the segment:
`https://vallartawknd.mx/es/opengraph-image`. The proxy redirects `/es/…` to the Spanish URL
without a prefix, so a scraper gets a 307 and then the image. Every scraper that matters follows
it. Setting `openGraph.images` by hand in the layout does not help — the file convention wins —
so the only real fix is to stop using the convention and serve the card from a route handler.

---

## Resolved

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
