import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Any URL under a known locale that matches no page or no service.
export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="not-found">
      <p className="not-found__code">404</p>
      <h1 className="section-title">{t("title")}</h1>
      <p className="not-found__text">{t("text")}</p>
      <Link className="button" href="/">
        {t("back")}
      </Link>
    </div>
  );
}
