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
  // Hotspots calibrated to the ORIGINAL hero image (1672x941) where each
  // building is at a fixed position. Invisible-hotspot mode (no overlay PNGs)
  // shows hover glow + label inside these click areas.
  // ─────────────────────────────────────────────────────────────────────
  {
    key: "cine",
    name: "Cinema",
    en: "Films",
    mark: "◐",
    hotspot: { left: "4%", bottom: "13%", width: "13%", height: "25%" },
  },
  {
    key: "hall",
    name: "City Hall",
    en: "Civic & Policy",
    mark: "▲",
    hotspot: { left: "20%", bottom: "12%", width: "8%", height: "26%" },
  },
  {
    key: "lib",
    name: "Library",
    en: "Books",
    mark: "❖",
    hotspot: { left: "29%", bottom: "12%", width: "19%", height: "22%" },
  },
  {
    key: "ai",
    name: "AI Factory",
    en: "Tools & Workflows",
    mark: "✦",
    hotspot: { left: "50%", bottom: "13%", width: "11%", height: "21%" },
  },
  {
    key: "space",
    name: "Spaceport",
    en: "Travel & Frontiers",
    mark: "✧",
    hotspot: { left: "43%", bottom: "40%", width: "14%", height: "59%" },
  },
  {
    key: "pod",
    name: "Broadcast Tower",
    en: "Podcasts",
    mark: "◉",
    hotspot: { left: "80%", bottom: "13%", width: "18%", height: "42%" },
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
