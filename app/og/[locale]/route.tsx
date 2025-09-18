import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { routing } from "@/i18n/routing";

// The card social networks show, one per language, at /og/es and /og/en.
// It is a route and not an `opengraph-image.tsx` on purpose: the file
// convention writes the URL of its segment (`/es/opengraph-image`), which the
// proxy redirects, and a scraper would have to follow it. The layout points
// `openGraph.images` here and `proxy.ts` leaves /og alone.
export const size = { width: 1200, height: 630 };
export const dynamic = "force-static";

// Satori cannot read the woff2 the site serves, so the image carries its own
// pair of Poppins in TrueType. They are read once, when the module loads.
const [regular, black] = await Promise.all([
  readFile(join(process.cwd(), "assets/fonts/poppins-400.ttf")),
  readFile(join(process.cwd(), "assets/fonts/poppins-800.ttf")),
]);

/** One card per language, both baked at build time. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const NAVY = "#0b2c5e";
const LIME = "#d9f21e";

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "meta" });

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: NAVY,
        color: "#ffffff",
        fontFamily: "Poppins",
      }}
    >
      {/* Two lime rings cropped by the right edge, the wave of the brand. */}
      <div
        style={{
          position: "absolute",
          right: -170,
          bottom: -210,
          width: 560,
          height: 560,
          borderRadius: 560,
          border: `10px solid ${LIME}`,
          opacity: 0.3,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -80,
          bottom: -120,
          width: 380,
          height: 380,
          borderRadius: 380,
          border: `10px solid ${LIME}`,
          opacity: 0.16,
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 26, fontWeight: 400, letterSpacing: 18, color: "#ffffff" }}>VALLARTA</span>
        <span style={{ fontSize: 132, fontWeight: 800, letterSpacing: -6, lineHeight: 1, color: LIME }}>WKND</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <span style={{ fontSize: 40, fontWeight: 400, lineHeight: 1.35, maxWidth: 820 }}>{t("og.tagline")}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 96, height: 6, borderRadius: 6, background: LIME }} />
          <span style={{ fontSize: 26, fontWeight: 400, color: "rgba(255, 255, 255, 0.75)" }}>{t("og.places")}</span>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Poppins", data: regular, weight: 400, style: "normal" },
        { name: "Poppins", data: black, weight: 800, style: "normal" },
      ],
    },
  );
}
