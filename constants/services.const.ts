// The five experiences, in the order the site shows them. Everything that does
// not change with the language lives here (photos, prices, times, which
// amenities and which items to bring); the copy, including the itinerary,
// the FAQ and the reviews, is `catalog.<slug>` in messages/.

/** Keys of `catalog` in the messages and the URL segment of each detail page. */
export type ServiceSlug =
  "arcos-animas-quimixto" | "yelapa-majahuitas" | "islas-marietas" | "avistamiento-de-ballenas" | "charter-privado";

/** What a trip includes; labels are `service.amenities.<key>`. */
export type AmenityKey =
  | "breakfast"
  | "coffee"
  | "safety"
  | "snorkel"
  | "openBar"
  | "lunch"
  | "menu"
  | "guide"
  | "certifiedGuide"
  | "kayak"
  | "waterfall"
  | "hydrophone"
  | "music"
  | "wholeBoat";

/** What to bring; labels are `service.bring.<key>`. */
export type BringKey =
  | "sunscreen"
  | "cap"
  | "sunglasses"
  | "windbreaker"
  | "camera"
  | "seasicknessPill"
  | "swimsuit"
  | "towel"
  | "waterShoes"
  | "cash";

export type PortKey = "vallarta" | "nuevoVallarta";

export interface ServicePhoto {
  src: string;
  width: number;
  height: number;
}

export interface Service {
  slug: ServiceSlug;
  photo: ServicePhoto;
  /** Price per person in MXN; `null` when the trip is quoted (the charter). */
  price: number | null;
  /** `null` when the length is up to the group (the charter). */
  durationHours: number | null;
  /** Departure times as the booking card offers them, 24 h "HH:MM". */
  departures: readonly string[];
  /** Largest group per boat; `null` when the whole boat is booked. */
  groupSize: number | null;
  port: PortKey;
  /** Months the trip runs, 1-12; `null` when it runs all year. */
  season: { from: number; to: number } | null;
  amenities: readonly AmenityKey[];
  bring: readonly BringKey[];
  /** Portrait of the featured review of the detail page. */
  reviewPhoto: ServicePhoto;
}

const REVIEW_PHOTOS = {
  couple: { src: "/images/gal-2.jpg", width: 178, height: 356 },
  friends: { src: "/images/gal-3.jpg", width: 178, height: 356 },
  family: { src: "/images/gal-1.jpg", width: 178, height: 356 },
  traveler: { src: "/images/gal-4.jpg", width: 178, height: 356 },
  whale: { src: "/images/review-ballenas.jpg", width: 837, height: 714 },
} as const;

export const SERVICES: readonly Service[] = [
  {
    slug: "avistamiento-de-ballenas",
    photo: { src: "/images/svc-ballenas.jpg", width: 1800, height: 893 },
    price: 799,
    durationHours: 4,
    departures: ["08:00", "15:00"],
    groupSize: 12,
    port: "nuevoVallarta",
    season: { from: 12, to: 3 },
    amenities: ["hydrophone", "safety", "coffee", "certifiedGuide"],
    bring: ["sunscreen", "cap", "sunglasses", "windbreaker", "camera", "seasicknessPill"],
    reviewPhoto: REVIEW_PHOTOS.whale,
  },
];

export const SERVICE_SLUGS = SERVICES.map((service) => service.slug);

export function findService(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

/** Portraits of the travellers quoted on the home; the quotes are `home.proof.reviews`. */
export const HOME_REVIEW_PHOTOS = [
  REVIEW_PHOTOS.couple,
  REVIEW_PHOTOS.friends,
  REVIEW_PHOTOS.family,
  REVIEW_PHOTOS.traveler,
] as const;

/** The three faces next to the "9,754 travellers" line of the hero. */
export const HERO_FACES = [REVIEW_PHOTOS.family, REVIEW_PHOTOS.couple, REVIEW_PHOTOS.traveler] as const;

/** The loose photo of the proof grid. */
export const PROOF_PHOTO = REVIEW_PHOTOS.traveler;
