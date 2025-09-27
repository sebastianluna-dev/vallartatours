import { useTranslations } from "next-intl";
import Image from "next/image";
import { SocialLinks } from "@/components/site/shared/social-links.comp";
import { LEGAL_LINKS, NAV_ITEMS } from "@/constants/navigation.const";
import { SITE, SITE_YEAR } from "@/constants/site.const";
import { Link } from "@/i18n/navigation";
import { FooterCta } from "./footer-cta.comp";
import "./footer.section.css";

// Three columns (who we are and the networks, navigation, contact), the
// giant "WKND" over the wave artwork and the legal line. On the phone the
// home adds the WhatsApp card over them.
export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="section footer">
      <div className="section__inner footer__inner">
        <FooterCta />

        <div className="footer__columns">
          <div className="footer__about">
            <p className="footer__description">{t("description")}</p>
            <SocialLinks />
          </div>
          <div className="footer__column">
            <h2 className="eyebrow footer__heading">{t("navigation")}</h2>
            <ul className="footer__links">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link className="footer__link" href={item.href}>
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__column">
            <h2 className="eyebrow footer__heading">{t("contact")}</h2>
            <ul className="footer__contact">
              <li>{SITE.address}</li>
              <li>
                <a className="footer__link" href={`tel:${SITE.phone.replace(/\s/g, "")}`}>
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a className="footer__link" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <ul className="footer__legal">
          {LEGAL_LINKS.map((item) => (
            <li key={item.key}>
              <Link className="footer__link" href={item.href} prefetch={false}>
                {t(item.key)}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer__art">
        <div className="section__inner">
          <span className="footer__mark" aria-hidden="true">
            WKND
          </span>
        </div>
        <Image
          className="footer__waves"
          src="/images/footer-art.svg"
          alt=""
          width={1440}
          height={404}
          aria-hidden="true"
        />
      </div>

      <div className="section__inner footer__bottom">
        <span>{t("copyright", { year: SITE_YEAR })}</span>
        <ul className="footer__legal footer__legal_place_bottom">
          {LEGAL_LINKS.map((item) => (
            <li key={item.key}>
              <Link className="footer__link" href={item.href} prefetch={false}>
                {t(item.key)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
