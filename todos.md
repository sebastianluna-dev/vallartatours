# Delegable TODOs

Small, mechanical tasks that need no design decision. Bigger items live in `IMPROVEMENTS.md`.

This is a sample project (see the note at the top of `README.md`), so anything that amounts to
"ask the client for the real data" is not a task: the placeholders are the final copy. What is
left is what would make the piece read better.

- [ ] Read the English copy of `messages/en.json` end to end; it was translated from the Spanish
      catalogue and nobody has checked it since.
- [ ] Set `NEXT_PUBLIC_SITE_URL` in the deployment so the sitemap, the canonicals and the social
      card carry the real host instead of `https://vallartawknd.mx`.
- [ ] Regenerate the icons if the mark ever changes: `app/icon.svg` is the source, and
      `app/favicon.ico` (32 px, RGBA inside the ICO — Turbopack refuses an RGB one) and
      `app/apple-icon.png` (180 px, no rounded corners, iOS adds its own mask) are rasterised
      from it.
- [ ] Replace `SITE_YEAR` in `constants/site.const.ts` when the year changes.
- [ ] The photo alts (`catalog.<slug>.photoAlt`) describe the stock photographs; if the photos are
      ever swapped, the alts go with them.
