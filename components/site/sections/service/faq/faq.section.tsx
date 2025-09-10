import { useTranslations } from "next-intl";
import type { ServiceSlug } from "@/constants/services.const";
import { SITE } from "@/constants/site.const";
import { buildWhatsappUrl } from "@/lib/build-whatsapp-url";
import { messageRecords } from "@/lib/message-records";
import "./faq.section.css";

interface FaqProps {
  slug: ServiceSlug;
}

// The questions people ask before booking, on native <details>, next to the
// lime card that sends the rest to WhatsApp. The first question starts open.
export function FaqSection({ slug }: FaqProps) {
  const t = useTranslations("service");
  const tCommon = useTranslations("common");
  const tCatalog = useTranslations(`catalog.${slug}`);
  const questions = messageRecords(tCatalog.raw("faq"), ["question", "answer"]);

  return (
    <section className="section faq">
      <div className="section__inner faq__inner">
        <div className="faq__lead">
          <h2 className="section-title faq__title">{t("faqTitle")}</h2>
          <div className="faq__card">
            <div>
              <h3 className="faq__card-title">{t("faqCard.title")}</h3>
              <p className="faq__card-text">{t("faqCard.body")}</p>
            </div>
            <p className="faq__card-text">{t("faqCard.hours")}</p>
            <a
              className="button button_variant_navy"
              href={buildWhatsappUrl(SITE.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {tCommon("askWhatsapp")}
            </a>
          </div>
        </div>
        <div className="faq__list">
          {questions.map((item, index) => (
            <details key={item.question} className="faq__item" open={index === 0}>
              <summary className="faq__question">
                {item.question}
                <span className="faq__toggle" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="faq__answer">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
