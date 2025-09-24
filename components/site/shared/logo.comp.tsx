import { Link } from "@/i18n/navigation";
import "./logo.comp.css";

interface LogoProps {
  /** The phone menu closes itself when the wordmark takes the visitor home. */
  onNavigate?: () => void;
}

// "VALLARTA" spaced out over a heavy "WKND". The wordmark is text, not an
// image, so it scales with the header and reads in the dark.
export function Logo({ onNavigate }: LogoProps) {
  return (
    <Link className="logo" href="/" aria-label="Vallarta WKND" onClick={onNavigate}>
      <span className="logo__top" aria-hidden="true">
        Vallarta
      </span>
      <span className="logo__mark" aria-hidden="true">
        WKND
      </span>
    </Link>
  );
}
