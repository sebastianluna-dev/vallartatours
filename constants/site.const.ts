// Who the site is about. Names, links and numbers are not translated; the copy
// around them lives in messages/.
export const SITE = {
  name: "Vallarta WKND",
  email: "hola@vallartawknd.mx",
  /** Shown to visitors, with spaces. */
  phone: "+52 322 000 0000",
  /** The same number as WhatsApp wants it: country code and digits only. */
  whatsapp: "523220000000",
  address: "Marina Vallarta, Local 14",
  city: "Puerto Vallarta, Jalisco",
  facebook: "https://www.facebook.com/vallartawknd",
  instagram: "https://www.instagram.com/vallartawknd",
  tripadvisor: "https://www.tripadvisor.com.mx/",
  /** Opening hours as the copy states them, 24 h. */
  hours: { from: 7, to: 21 },
} as const;

/** Figures of the home. Their labels are `home.proof.<key>` in messages. */
export const FIGURES = {
  travelers: 9754,
  tours: 595,
  years: 9,
  rating: 4.9,
  reviews: 312,
  returning: 96,
} as const;

/** Share of the total paid when booking, as the "three steps" copy says. */
export const DEPOSIT_RATE = 0.3;

export const SITE_YEAR = 2025;

/**
 * Quality the optimiser encodes every photograph with. The site is one big
 * photograph after another, so they are served at the top of the scale; the
 * allowlist of `next.config.ts` has to carry the same number.
 */
export const PHOTO_QUALITY = 100;
