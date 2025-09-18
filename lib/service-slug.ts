import { SERVICES, type Service } from "@/constants/services.const";
import { routing, type Locale } from "@/i18n/routing";

// The URL segment of a trip changes with the language: `/servicios/
// avistamiento-de-ballenas` is `/en/services/whale-watching`. The catalogue
// key never changes, so everything inside the app keeps using `service.slug`
// and only the URLs go through here.

/** The segment the given language shows for a trip. */
export function serviceSlug(service: Service, locale: Locale): string {
  return locale === routing.defaultLocale ? service.slug : service.englishSlug;
}

/** Every segment of a language, in the order the site lists the trips. */
export function serviceSlugs(locale: Locale): string[] {
  return SERVICES.map((service) => serviceSlug(service, locale));
}

/**
 * The trip a URL segment names, or `undefined` when that language does not
 * use it: the English page only answers to the English segment, so the same
 * trip never has two live URLs in one language.
 */
export function findServiceBySlug(slug: string, locale: Locale): Service | undefined {
  return SERVICES.find((service) => serviceSlug(service, locale) === slug);
}
