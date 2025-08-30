import localFont from "next/font/local";

// Poppins in the five weights the design uses, latin and latin-ext subsets,
// served from public/fonts so the build does not depend on Google.
const WEIGHTS = ["400", "500", "600", "700", "800"] as const;

export const poppins = localFont({
  src: WEIGHTS.flatMap((weight) => [
    { path: `../../public/fonts/poppins-${weight}-latin.woff2`, weight, style: "normal" },
    { path: `../../public/fonts/poppins-${weight}-latin-ext.woff2`, weight, style: "normal" },
  ]),
  variable: "--font-poppins",
  display: "swap",
});
