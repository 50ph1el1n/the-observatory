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
  {
    key: "cine",
    name: "Cinema",
    en: "Films",
    mark: "◐",
    hotspot: { left: "4%", bottom: "2%", width: "16%", height: "32%" },
  },
  {
    key: "hall",
    name: "City Hall",
    en: "Civic & Policy",
    mark: "▲",
    hotspot: { left: "21%", bottom: "2%", width: "14%", height: "33%" },
  },
  {
    key: "lib",
    name: "Library",
    en: "Books",
    mark: "❖",
    hotspot: { left: "35%", bottom: "2%", width: "21%", height: "30%" },
  },
  {
    key: "ai",
    name: "AI Factory",
    en: "Tools & Workflows",
    mark: "✦",
    hotspot: { left: "55%", bottom: "2%", width: "19%", height: "33%" },
  },
  {
    key: "space",
    name: "Spaceport",
    en: "Travel & Frontiers",
    mark: "✧",
    hotspot: { left: "41%", bottom: "38%", width: "18%", height: "52%" },
  },
  {
    key: "pod",
    name: "Broadcast Tower",
    en: "Podcasts",
    mark: "◉",
    hotspot: { left: "76%", bottom: "2%", width: "21%", height: "42%" },
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
