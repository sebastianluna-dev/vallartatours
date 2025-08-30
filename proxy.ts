import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Adds the locale segment to every page request: `/` is served as Spanish
// without a prefix and `/en` as English. A first visit without a prefix is
// redirected to the browser's language when it is English.
export default createMiddleware(routing);

export const config = {
  // Every path except Next internals, Vercel's and files with an extension.
  matcher: "/((?!_next|_vercel|.*\\..*).*)",
};
