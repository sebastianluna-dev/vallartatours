# Delegable TODOs

Small, mechanical tasks that need no design decision. Bigger items live in `IMPROVEMENTS.md`.

- [ ] Replace the placeholder phone, WhatsApp number, email, address and social URLs in `constants/site.const.ts` (see IMPROVEMENTS #2).
- [ ] Confirm prices, departure times and group sizes per trip in `constants/services.const.ts`.
- [ ] Check the English copy of `messages/en.json` with a native reader; it was translated from the Spanish catalogue.
- [ ] Add `app/[locale]/opengraph-image.tsx` (see IMPROVEMENTS #4).
- [ ] Have a lawyer review `legal.terms` and `legal.privacy` in the messages, and update the «Última actualización» line of both when they change.
- [ ] Replace the placeholder reviews (`catalog.<slug>.reviews`, `home.proof.reviews`) and their portraits in `public/images` with real ones.
- [ ] Make a proper favicon set from `app/icon.svg` (apple-touch-icon, 32 px PNG) once the logo is final.
- [ ] Set `NEXT_PUBLIC_SITE_URL` in the Vercel project once the domain is bought.
- [ ] Replace `SITE_YEAR` in `constants/site.const.ts` when the year changes.
- [ ] Add `alt` text review: every service photo alt (`catalog.<slug>.photoAlt`) describes the stock photo, not the real trip; update when the real photos arrive.
