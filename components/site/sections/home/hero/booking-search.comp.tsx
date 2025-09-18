"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { findService, SERVICES, type ServiceSlug } from "@/constants/services.const";
import { getPathname } from "@/i18n/navigation";
import { serviceSlug } from "@/lib/service-slug";
import "./booking-search.comp.css";

const DEFAULT_SLUG: ServiceSlug = "islas-marietas";
const MAX_PEOPLE = 16;

// The white bar of the hero: experience, date and people. It does not check
// anything itself; it sends the visitor to the trip's page with the choice
// in the query string, where the booking card picks it up. The URL is built
// with `getPathname` because next-intl's router takes no `#reservar` hash.
export function BookingSearch() {
  const t = useTranslations("home.hero.search");
  const tCatalog = useTranslations("catalog");
  const router = useRouter();
  const locale = useLocale();
  const [slug, setSlug] = useState<ServiceSlug>(DEFAULT_SLUG);
  const [date, setDate] = useState("");
  const [people, setPeople] = useState(4);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const service = findService(slug);
    if (!service) return;
    const query: Record<string, string> = { personas: String(people) };
    if (date) query.fecha = date;
    const href = getPathname({
      locale,
      // The select holds the catalogue key; the URL wants the segment of the
      // language being read.
      href: { pathname: "/servicios/[slug]", params: { slug: serviceSlug(service, locale) }, query },
    });
    router.push(`${href}#reservar`);
  };

  return (
    <form className="booking-search" aria-label={t("label")} onSubmit={submit}>
      <label className="booking-search__field booking-search__field_grow">
        <span className="booking-search__label">{t("experience")}</span>
        <select
          className="booking-search__control"
          value={slug}
          onChange={(event) => setSlug(event.target.value as ServiceSlug)}
        >
          {SERVICES.map((service) => (
            <option key={service.slug} value={service.slug}>
              {tCatalog(`${service.slug}.name`)}
            </option>
          ))}
        </select>
      </label>
      <label className="booking-search__field">
        <span className="booking-search__label">{t("date")}</span>
        <input
          className="booking-search__control"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </label>
      <label className="booking-search__field booking-search__field_narrow">
        <span className="booking-search__label">{t("people")}</span>
        <input
          className="booking-search__control"
          type="number"
          inputMode="numeric"
          min={1}
          max={MAX_PEOPLE}
          value={people}
          onChange={(event) => setPeople(Math.min(MAX_PEOPLE, Math.max(1, Number(event.target.value) || 1)))}
        />
      </label>
      <button type="submit" className="button button_variant_navy booking-search__submit">
        {t("submit")}
      </button>
    </form>
  );
}
