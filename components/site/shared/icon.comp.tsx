import type { AmenityKey, BringKey } from "@/constants/services.const";

// Every icon of the site as inline SVG on a 24 × 24 grid, drawn with strokes
// so they take the current text colour. `fill` marks the few solid marks.
interface IconShape {
  paths: readonly string[];
  fill?: boolean;
  strokeWidth?: number;
}

const ICONS = {
  bookmark: { paths: ["M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"], strokeWidth: 2.75 },
  arrowRight: { paths: ["M5 12h13", "M13 6l6 6-6 6"], strokeWidth: 2.6 },
  arrowLeft: { paths: ["M19 12H6", "M11 6l-6 6 6 6"], strokeWidth: 2.6 },
  arrowDown: { paths: ["M12 4v15", "M6 13.5l6 6 6-6"], strokeWidth: 2 },
  check: { paths: ["M4 12.5l5 5 11-11"], strokeWidth: 3 },
  cross: { paths: ["M6 6l12 12", "M18 6L6 18"], strokeWidth: 3 },
  menu: { paths: ["M4 7h16", "M4 12h16", "M4 17h16"], strokeWidth: 2.6 },
  calendar: { paths: ["M3 5h18v16H3z", "M8 3v4", "M16 3v4", "M3 11h18"], strokeWidth: 2.4 },
  pin: {
    paths: ["M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z", "M12 12.6a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2z"],
    strokeWidth: 1.8,
  },
  mail: { paths: ["M3 5h18v14H3z", "M4 7l8 6 8-6"], strokeWidth: 1.8 },
  phone: { paths: ["M6.5 2.5h11v19h-11z", "M10.5 18.5h3"], strokeWidth: 1.8 },
  whatsapp: {
    paths: [
      "M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z",
      "M9.2 8.4c.2-.5.5-.5.8-.5h.6c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .6l-.6.8c-.1.2-.1.3 0 .5a6.7 6.7 0 0 0 3.2 2.9c.2.1.3.1.5-.1l.7-.9c.2-.2.4-.2.6-.1l1.9.9c.3.1.4.2.4.4a2.3 2.3 0 0 1-1.5 2c-.6.2-1.2.2-2 0a9.4 9.4 0 0 1-5.8-5.2c-.4-.9-.4-1.6-.2-2.2z",
    ],
    strokeWidth: 1.8,
  },
  facebook: {
    paths: [
      "M13.6 21v-7.3h2.5l.4-2.9h-2.9V8.9c0-.8.2-1.4 1.4-1.4h1.6V4.9c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2H8v2.9h2.4V21h3.2z",
    ],
    fill: true,
  },
  instagram: { paths: ["M3.5 3.5h17v17h-17z", "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M17 7h.01"], strokeWidth: 1.9 },
  tripadvisor: {
    paths: [
      "M7.2 17.4a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4z",
      "M16.8 17.4a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4z",
      "M7.2 14.5a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6z",
      "M16.8 14.5a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6z",
      "M8.7 7.6A10 10 0 0 1 12 7.1c1.2 0 2.3.2 3.3.5",
      "M3.2 9.4 1.6 7.3h4.2M20.8 9.4l1.6-2.1h-4.2",
    ],
    strokeWidth: 1.5,
  },
  // Amenities.
  mug: {
    paths: [
      "M4 8h12v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z",
      "M16 10h2a2 2 0 0 1 0 4h-2",
      "M7 4c0 1 1 1 1 2M11 4c0 1 1 1 1 2",
    ],
    strokeWidth: 2.2,
  },
  helmet: {
    paths: [
      "M2 17h20v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2z",
      "M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5",
      "M4.5 17v-4a6 6 0 0 1 5.5-6",
      "M14 7a6 6 0 0 1 5.5 6v4",
    ],
    strokeWidth: 2.2,
  },
  snorkel: {
    paths: ["M4 9h11a2 2 0 0 1 2 2v1a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V9z", "M17 11h2V5", "M9 15v3a3 3 0 0 0 6 0"],
    strokeWidth: 2.2,
  },
  bar: { paths: ["M8.5 21h7", "M12 12.5V21", "M19 4H5l7 8.5z"], strokeWidth: 2.2 },
  food: {
    paths: [
      "M4 3v6a2.5 2.5 0 0 0 5 0V3",
      "M6.5 11.5V21",
      "M19 3c-2 1.6-2.8 3.7-2.5 6 .2 1.6.9 2.7 2 3.4",
      "M18.5 12.5V21",
    ],
    strokeWidth: 2.2,
  },
  suitcase: { paths: ["M3 8h18v12H3z", "M9 8V5h6v3", "M3 13h18"], strokeWidth: 2.2 },
  kayak: {
    paths: ["M22 18.5H2a4 4 0 0 0 4 3.5h12a4 4 0 0 0 4-3.5z", "M20.5 15 11 3.5 4 15z", "M11 3.5V15"],
    strokeWidth: 2.2,
  },
  waterfall: {
    paths: [
      "M12 3v7",
      "M8 6.5c0 2 1.8 3.5 4 3.5s4-1.5 4-3.5",
      "M3 14c.8.7 1.7 1 3 1s2.2-.3 3-1",
      "M15 14c.8.7 1.7 1 3 1s2.2-.3 3-1",
      "M3 19c.8.7 1.7 1 3 1s2.2-.3 3-1",
      "M15 19c.8.7 1.7 1 3 1s2.2-.3 3-1",
    ],
    strokeWidth: 2.2,
  },
  hydrophone: {
    paths: ["M12 3a4 4 0 0 1 4 4v4a4 4 0 0 1-8 0V7a4 4 0 0 1 4-4z", "M5 11a7 7 0 0 0 14 0", "M12 18v3"],
    strokeWidth: 2.2,
  },
  headphones: {
    paths: ["M4 14v-2a8 8 0 0 1 16 0v2", "M4 14h3v6H5a1 1 0 0 1-1-1z", "M20 14h-3v6h2a1 1 0 0 0 1-1z"],
    strokeWidth: 2.2,
  },
  star: { paths: ["M12 3l2.5 5.5L20 10l-4 3.8.9 5.7L12 16.9 7.1 19.5 8 13.8 4 10l5.5-1.5z"], strokeWidth: 2.2 },
  // What to bring.
  leaf: { paths: ["M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"], strokeWidth: 2.75 },
  cap: { paths: ["M4 14a8 8 0 0 1 16 0", "M2 14h20l-1 3H3z", "M12 6V3"], strokeWidth: 2.4 },
  glasses: {
    paths: [
      "M6 19a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
      "M18 19a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
      "M10 15a2 2 0 0 1 4 0",
      "M2.5 13 6 7h3M21.5 13 18 7h-3",
    ],
    strokeWidth: 2.75,
  },
  wind: {
    paths: ["M12.8 19.6A2 2 0 1 0 14 16H2", "M17.5 8a2.5 2.5 0 1 1 2 4H2", "M9.8 4.4A2 2 0 1 1 11 8H2"],
    strokeWidth: 2.75,
  },
  camera: {
    paths: [
      "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z",
      "M12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    ],
    strokeWidth: 2.75,
  },
  pill: { paths: ["m10.5 20.5 10-10a5 5 0 0 0-7-7l-10 10a5 5 0 0 0 7 7Z", "m8.5 8.5 7 7"], strokeWidth: 2.75 },
  swim: {
    paths: [
      "M3 15c1.5 0 1.5-1.5 3-1.5s1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5",
      "M3 20c1.5 0 1.5-1.5 3-1.5s1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5",
      "M16 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
      "M5 11l5-4 4 3",
    ],
    strokeWidth: 2.4,
  },
  towel: { paths: ["M5 4h14v16H5z", "M9 4v16", "M5 8h14M5 12h14M5 16h14"], strokeWidth: 2.2 },
  shoe: { paths: ["M3 17h18v2H3z", "M3 17l2-8h6l3 4h4a3 3 0 0 1 3 3", "M11 9l1 3"], strokeWidth: 2.4 },
  cash: { paths: ["M2 7h20v10H2z", "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M5 10h.01M19 14h.01"], strokeWidth: 2.2 },
} satisfies Record<string, IconShape>;

export type IconName = keyof typeof ICONS;

/** Which icon draws each amenity of a trip. */
export const AMENITY_ICONS: Record<AmenityKey, IconName> = {
  breakfast: "mug",
  coffee: "mug",
  safety: "helmet",
  snorkel: "snorkel",
  openBar: "bar",
  lunch: "food",
  menu: "food",
  guide: "suitcase",
  certifiedGuide: "suitcase",
  kayak: "kayak",
  waterfall: "waterfall",
  hydrophone: "hydrophone",
  music: "headphones",
  wholeBoat: "star",
};

/** Which icon draws each item to bring. */
export const BRING_ICONS: Record<BringKey, IconName> = {
  sunscreen: "leaf",
  cap: "cap",
  sunglasses: "glasses",
  windbreaker: "wind",
  camera: "camera",
  seasicknessPill: "pill",
  swimsuit: "swim",
  towel: "towel",
  waterShoes: "shoe",
  cash: "cash",
};

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

// Decorative by default: every icon sits next to its label, so it is hidden
// from assistive technology.
export function Icon({ name, size = 20, className }: IconProps) {
  const shape: IconShape = ICONS[name];

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={shape.fill ? "currentColor" : "none"}
      stroke={shape.fill ? "none" : "currentColor"}
      strokeWidth={shape.strokeWidth ?? 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {shape.paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
