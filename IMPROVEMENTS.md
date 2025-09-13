# Pending improvements

Backlog of the project's technical debt and improvements. Every entry carries an **area**, a
**priority** (low · medium · high) and a guide on how to approach it.

> Last review: 2026-09-13. What is still open is at the top; what is already resolved is left
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
the figures of the home (`FIGURES`) and every review are placeholders taken from the design.
They all live in `constants/site.const.ts`, `constants/services.const.ts` and
`messages/*.json` (`catalog.<slug>`, `home.proof.reviews`). Replace them before launch and
check the English copy with a native reader.

## MEDIUM priority

### 3. RSC prefetch of unprefixed routes answers 404 — [i18n]

With `localePrefix: "as-needed"`, the router's segment prefetch of a Spanish link
(`/servicios?_rsc=…`) is redirected by Next to a URL the proxy does not rewrite and logs a 404
in the console. Navigation itself works (the click fetches again and gets 200), so it only costs
the prefetch. Track next-intl's issue tracker for Next 16 and, if it does not get fixed, consider
`localePrefix: "always"` (Spanish would move to `/es`) or a `prefetch={false}` on the nav links.

### 4. Open Graph image — [SEO]

The home, the services page and the contact page have no image in their metadata (the detail
pages use the service photo). Add an `app/[locale]/opengraph-image.tsx` with `ImageResponse`
(wordmark on navy with the lime accent) and load Poppins from `public/fonts` inside it; the
layout's `metadataBase` already makes the relative URL absolute.

### 5. Terms and privacy pages — [Legal]

The footer links to «Términos y condiciones» and «Aviso de privacidad» with `href="#"`. They
need two static pages under `app/[locale]/` with their own `pathnames` entries in
`i18n/routing.ts` and their copy in the messages.

### 6. Whale season in the booking card — [Product]

`services.const.ts` records the whale season (December to March) but the booking card accepts
any date. Read `service.season` and either limit the date input to the season or show a notice
when the chosen date falls outside it (`lib/` helper with tests).

## LOW priority

### 7. Localized service slugs — [i18n]

The slugs are Spanish in both languages (`/en/services/avistamiento-de-ballenas`). next-intl
supports per-locale segments in `pathnames`, but the slugs would then have to be mapped back to
the catalogue keys in the page and the sitemap. Only worth it if English SEO matters.

### 8. Reveal on scroll — [UX]

The sections appear all at once. A small `IntersectionObserver` hook and a shared `Reveal`
wrapper, as in the sibling projects, would let the panels and the review cards fade in one by
one. Keep it off under `prefers-reduced-motion`.

### 9. Carousel photos are all loaded up front — [Performance]

The service carousel stacks the five background photos and crossfades them with opacity, so the
five 1800 px images are requested on the home. Loading only the active and the next one (and
swapping on change) would save a few hundred kilobytes on the first visit.
