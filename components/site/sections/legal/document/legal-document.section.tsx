import { useTranslations } from "next-intl";
import { SITE } from "@/constants/site.const";
import { Link } from "@/i18n/navigation";
import { messageRecords } from "@/lib/message-records";
import "./legal-document.section.css";

/** Which of the two documents of the `legal` namespace to render. */
export type LegalDoc = "terms" | "privacy";

interface LegalDocumentProps {
  doc: LegalDoc;
}

/** Anchor of a section, so the index on the left can jump to it. */
function sectionId(index: number): string {
  return `seccion-${index + 1}`;
}

// Both legal pages: the title with the date it was last touched, an index
// that follows the scroll on the desktop and the numbered sections. The copy
// lives in `legal.<doc>` and the crew's data in constants/site.const.ts.
export function LegalDocumentSection({ doc }: LegalDocumentProps) {
  const t = useTranslations("legal");
  const tDoc = useTranslations(`legal.${doc}`);
  const sections = messageRecords(tDoc.raw("sections"), ["heading", "body"]);

  return (
    <section className="section legal">
      <div className="section__inner legal__inner">
        <header className="legal__header">
          <p className="eyebrow legal__eyebrow">{t("eyebrow")}</p>
          <h1 className="section-title legal__title">{tDoc("title")}</h1>
          <p className="legal__lead">{tDoc("lead")}</p>
          <p className="legal__updated">{tDoc("updated")}</p>
        </header>

        <div className="legal__body">
          <nav className="legal__index" aria-labelledby="legal-index-title">
            <h2 className="eyebrow legal__index-title" id="legal-index-title">
              {t("index")}
            </h2>
            <ol className="legal__index-list">
              {sections.map((section, index) => (
                <li key={section.heading}>
                  <a className="legal__index-link" href={`#${sectionId(index)}`}>
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="legal__sections">
            {sections.map((section, index) => (
              <article className="legal__section" key={section.heading} id={sectionId(index)}>
                <h2 className="legal__heading">
                  <span className="legal__number" aria-hidden="true">
                    {index + 1}
                  </span>
                  {section.heading}
                </h2>
                <p className="legal__text">{section.body}</p>
              </article>
            ))}

            <aside className="legal__card">
              <h2 className="legal__card-title">{t("contactTitle")}</h2>
              <p className="legal__text">{t("contactBody")}</p>
              <ul className="legal__card-data">
                <li>
                  <a className="legal__card-link" href={`mailto:${SITE.email}`}>
                    {SITE.email}
                  </a>
                </li>
                <li>
                  <a className="legal__card-link" href={`tel:${SITE.phone.replace(/\s/g, "")}`}>
                    {SITE.phone}
                  </a>
                </li>
              </ul>
              <Link className="button button_variant_navy button_size_small" href="/contacto">
                {t("contactLink")}
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
