import type { Locale } from "@/i18n/routing";
import { localeTag } from "./locale-tag";

// Pesos without decimals: "$916" and "$1,598" in both languages. The narrow
// symbol keeps the English version from printing "MX$".
export function formatPrice(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(localeTag(locale), {
    style: "currency",
    currency: "MXN",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Plain figures with the thousands separator: "9,754". */
export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(localeTag(locale)).format(value);
}
