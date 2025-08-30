import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware `Link`, `usePathname`, `useRouter` and `getPathname`: they map
// the internal routes to the localized URLs of i18n/routing.ts and keep the
// current locale prefix.
export const { Link, usePathname, useRouter, redirect, getPathname } = createNavigation(routing);
