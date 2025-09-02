import { Link } from "@/i18n/navigation";
import "./logo.comp.css";

// "VALLARTA" spaced out over a heavy "WKND". The wordmark is text, not an
// image, so it scales with the header and reads in the dark.
export function Logo() {
  return (
    <Link className="logo" href="/" aria-label="Vallarta WKND">
      <span className="logo__top" aria-hidden="true">
        Vallarta
      </span>
      <span className="logo__mark" aria-hidden="true">
        WKND
      </span>
    </Link>
  );
}
