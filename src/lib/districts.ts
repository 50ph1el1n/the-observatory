/**
 * 8 districts of The Observatory.
 * Hotspot coordinates are in % of the hero container (background-position: bottom).
 * Only buildings visible in the hero illustration have hotspots.
 */

export type DistrictKey =
  | "ai"
  | "pod"
  | "hall"
  | "lib"
  | "cine"
  | "fin"
  | "space"
  | "garden";

export type Hotspot = {
  left: string;
  bottom: string;
  width: string;
  height: string;
};

export type District = {
  key: DistrictKey;
  name: string;
  en: string;
  mark: string;
  /** If undefined, no hotspot in the hero (only in city map) */
  hotspot?: Hotspot;
};

export const districts: District[] = [
  // ─── Layout rule ──────────────────────────────────────────────────────
  // Library is the centre (50%). Space tower sits directly above the library.
  // Five ground buildings are spaced evenly: centres at 12 / 31 / 50 / 69 / 88
  // (19% between adjacent centres). Cinema flush left, Pod flush right.
  // ─────────────────────────────────────────────────────────────────────
  {
    key: "cine",
    name: "Cinema",
    en: "Films",
    mark: "◐",
    hotspot: { left: "4%", bottom: "2%", width: "16%", height: "32%" }, // centre 12
  },
  {
    key: "hall",
    name: "City Hall",
    en: "Civic & Policy",
    mark: "▲",
    hotspot: { left: "24%", bottom: "2%", width: "14%", height: "33%" }, // centre 31
  },
  {
    key: "lib",
    name: "Library",
    en: "Books",
    mark: "❖",
    hotspot: { left: "40%", bottom: "2%", width: "20%", height: "30%" }, // centre 50
  },
  {
    key: "ai",
    name: "AI Factory",
    en: "Tools & Workflows",
    mark: "✦",
    hotspot: { left: "60%", bottom: "2%", width: "18%", height: "33%" }, // centre 69
  },
  {
    key: "space",
    name: "Spaceport",
    en: "Travel & Frontiers",
    mark: "✧",
    hotspot: { left: "42%", bottom: "38%", width: "16%", height: "52%" }, // centre 50 — aligned with lib
  },
  {
    key: "pod",
    name: "Broadcast Tower",
    en: "Podcasts",
    mark: "◉",
    hotspot: { left: "79.5%", bottom: "2%", width: "17%", height: "42%" }, // centre 88
  },
  // garden + fin have no hotspot in hero — only in city map
  {
    key: "fin",
    name: "Finance District",
    en: "Money & Markets",
    mark: "◆",
  },
  {
    key: "garden",
    name: "Reflection Park",
    en: "Self & Notes",
    mark: "❀",
  },
];

export function getDistrictByKey(key: string): District | undefined {
  return districts.find((d) => d.key === key);
}

export function getHotspotDistricts(): District[] {
  return districts.filter((d) => d.hotspot);
}
