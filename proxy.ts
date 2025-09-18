import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Adds the locale segment to every page request and rewrites the localized
// URLs (`/en/services`) to the internal routes (`/en/servicios`). `/` is
// served as Spanish without a prefix; a first visit without a prefix is
// redirected to `/en` when the browser prefers English.
export default createMiddleware(routing);

export const config = {
  // Every path except Next internals, Vercel's, the Open Graph cards of
  // `app/og` (they carry the language in the path already) and files with an
  // extension.
  matcher: "/((?!_next|_vercel|og/|.*\\..*).*)",
};
