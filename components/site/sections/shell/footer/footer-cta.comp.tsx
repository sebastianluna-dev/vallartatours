"use client";

import { useTranslations } from "next-intl";
import { SITE } from "@/constants/site.const";
import { usePathname } from "@/i18n/navigation";
import { buildWhatsappUrl } from "@/lib/build-whatsapp-url";

// The WhatsApp card over the footer of the phone. Only the home shows it:
// every other page ends with a call of its own (the booking card of a trip,
// the form of the contact page), and two in a row read as noise. Its rules
// live with the rest of the footer, whose element it is.
export function FooterCta() {
  const pathname = usePathname();
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");

  if (pathname !== "/") return null;

  return (
    <div className="footer__cta">
      <h2 className="footer__cta-title">{t("ctaTitle")}</h2>
      <a
        className="button footer__cta-button"
        href={buildWhatsappUrl(SITE.whatsapp)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {tCommon("whatsapp")}
      </a>
    </div>
  );
}
