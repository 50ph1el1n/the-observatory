"use client";

import { useEffect, useRef } from "react";

/* ────────────────────────────────────────────────────────────────
   EarthCityScroll
   Scroll-driven cinematic between dust hero and worlds nav:
   Phase 01 — approach Earth (sphere with light/shade/atmosphere)
   Phase 02 — descend to the city (three parallax skyline layers
   rising out of atmospheric haze)
   ──────────────────────────────────────────────────────────────── */

const STAR_LAYERS = [
  { layer: "far",  count: 140, sizeMin: 0.5, sizeMax: 1.3, opaMin: 0.20, opaMax: 0.45, dur: [3, 5]   },
  { layer: "mid",  count: 70,  sizeMin: 1.0, sizeMax: 2.0, opaMin: 0.35, opaMax: 0.65, dur: [2.5, 4.5] },
  { layer: "near", count: 26,  sizeMin: 1.7, sizeMax: 3.0, opaMin: 0.55, opaMax: 0.90, dur: [2, 4]   },
] as const;

/* ─── Earth sphere ─────────────────────────────── */

function EarthSphere({
  continentsRef,
}: {
  continentsRef: React.RefObject<SVGGElement | null>;
}) {
  return (
    <svg
      viewBox="0 0 240 240"
      xmlns="http://www.w3.org/2000/svg"
      className="block h-auto w-[260px] md:w-[340px]"
    >
      <defs>
        {/* Lit sphere body — bright top-right → dark bottom-left */}
        <radialGradient id="earthBody" cx="36%" cy="30%" r="78%">
          <stop offset="0%"   stopColor="#cdd2d8" />
          <stop offset="22%"  stopColor="#9ea3aa" />
          <stop offset="46%"  stopColor="#6c707a" />
          <stop offset="70%"  stopColor="#383c44" />
          <stop offset="88%"  stopColor="#1a1d22" />
          <stop offset="100%" stopColor="#0a0c10" />
        </radialGradient>

        {/* Soft atmospheric halo around the limb */}
        <radialGradient id="atmosphere" cx="50%" cy="50%" r="50%">
          <stop offset="64%"  stopColor="#a4b1c3" stopOpacity="0" />
          <stop offset="78%"  stopColor="#a4b1c3" stopOpacity="0.20" />
          <stop offset="88%"  stopColor="#c4cfdc" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#c4cfdc" stopOpacity="0" />
        </radialGradient>

        {/* Night-side shadow overlay */}
        <radialGradient id="nightSide" cx="78%" cy="80%" r="68%">
          <stop offset="0%"   stopColor="#06070a" stopOpacity="0.68" />
          <stop offset="55%"  stopColor="#06070a" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#06070a" stopOpacity="0" />
        </radialGradient>

        {/* Rim light: bright on lit edge, dim on dark edge */}
        <linearGradient id="earthRim" x1="22%" y1="22%" x2="78%" y2="78%">
          <stop offset="0%"   stopColor="#eaeef4" stopOpacity="0.6" />
          <stop offset="35%"  stopColor="#eaeef4" stopOpacity="0.10" />
          <stop offset="72%"  stopColor="#1a1c20" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#0a0c10" stopOpacity="0.55" />
        </linearGradient>

        <clipPath id="earthSphereClip">
          <circle cx="120" cy="120" r="84" />
        </clipPath>
      </defs>

      {/* Outer atmospheric halo */}
      <circle cx="120" cy="120" r="100" fill="url(#atmosphere)" />

      {/* Lit sphere */}
      <circle cx="120" cy="120" r="84" fill="url(#earthBody)" />

      {/* Continents — slowly rotated around sphere center */}
      <g ref={continentsRef} clipPath="url(#earthSphereClip)">
        {/* Africa */}
        <path
          d="M 88 90 Q 96 86, 108 86 Q 124 84, 140 88 L 152 92 Q 158 100, 158 110 Q 154 120, 148 128 Q 142 138, 134 146 Q 124 154, 114 152 Q 102 146, 96 134 Q 90 122, 88 110 Q 86 100, 88 90 Z"
          fill="#171a20"
          opacity="0.86"
        />
        {/* Europe */}
        <path
          d="M 96 78 L 112 74 Q 124 76, 138 78 L 144 82 L 132 86 L 122 88 L 110 86 L 100 86 Z"
          fill="#171a20"
          opacity="0.78"
        />
        {/* Arabian peninsula */}
        <path
          d="M 156 100 L 168 102 L 174 112 L 168 120 L 158 116 Z"
          fill="#171a20"
          opacity="0.75"
        />
        {/* Madagascar */}
        <path
          d="M 144 136 L 152 144 L 148 154 L 140 148 Z"
          fill="#171a20"
          opacity="0.7"
        />
        {/* Greenland fragment */}
        <path
          d="M 76 62 L 86 60 L 92 68 L 84 72 L 76 70 Z"
          fill="#171a20"
          opacity="0.55"
        />
        {/* Asia limb hint */}
        <path
          d="M 172 80 L 190 76 L 200 86 L 192 92 L 178 90 Z"
          fill="#171a20"
          opacity="0.55"
        />
      </g>

      {/* Cloud wisps */}
      <g clipPath="url(#earthSphereClip)">
        <ellipse cx="66"  cy="98"  rx="20" ry="3"   fill="#e6eaf0" opacity="0.13" transform="rotate(-12 66 98)" />
        <ellipse cx="156" cy="78"  rx="16" ry="2.5" fill="#e6eaf0" opacity="0.11" transform="rotate(8 156 78)" />
        <ellipse cx="120" cy="158" rx="22" ry="3.5" fill="#e6eaf0" opacity="0.12" transform="rotate(-6 120 158)" />
        <ellipse cx="82"  cy="160" rx="14" ry="2.5" fill="#e6eaf0" opacity="0.10" transform="rotate(5 82 160)" />
        <ellipse cx="178" cy="130" rx="10" ry="2"   fill="#e6eaf0" opacity="0.11" transform="rotate(15 178 130)" />
      </g>

      {/* Night side overlay (over continents + clouds) */}
      <circle cx="120" cy="120" r="84" fill="url(#nightSide)" />

      {/* Sphere rim */}
      <circle cx="120" cy="120" r="84" fill="none" stroke="url(#earthRim)" strokeWidth="1.4" />
    </svg>
  );
}

/* ─── City: 3 parallax silhouette layers ─────── */

function FarCityLayer() {
  return (
    <svg
      viewBox="0 0 1200 160"
      preserveAspectRatio="xMidYEnd meet"
      xmlns="http://www.w3.org/2000/svg"
      className="block h-auto w-full"
      style={{ filter: "blur(1.4px)" }}
    >
      <g fill="#1d2129" opacity="0.85">
        <rect x="10"   y="128" width="22" height="32" />
        <rect x="36"   y="116" width="18" height="44" />
        <rect x="58"   y="132" width="26" height="28" />
        <rect x="88"   y="120" width="20" height="40" />
        <rect x="112"  y="134" width="30" height="26" />
        <rect x="146"  y="118" width="22" height="42" />
        <path d="M 172 160 L 172 130 L 184 122 L 196 130 L 196 160 Z" />
        <rect x="204"  y="126" width="28" height="34" />
        <rect x="236"  y="118" width="20" height="42" />
        <rect x="260"  y="132" width="32" height="28" />
        <rect x="296"  y="124" width="22" height="36" />
        <rect x="322"  y="116" width="18" height="44" />
        <rect x="344"  y="130" width="28" height="30" />
        <path d="M 376 160 L 376 122 L 388 116 L 400 122 L 400 160 Z" />
        <rect x="408"  y="128" width="24" height="32" />
        <rect x="436"  y="120" width="20" height="40" />
        <rect x="460"  y="134" width="30" height="26" />
        <rect x="494"  y="124" width="22" height="36" />
        <rect x="520"  y="118" width="26" height="42" />
        <rect x="550"  y="130" width="22" height="30" />
        <rect x="576"  y="120" width="18" height="40" />
        <rect x="598"  y="128" width="32" height="32" />
        <rect x="634"  y="116" width="24" height="44" />
        <path d="M 662 160 L 662 124 L 674 116 L 686 124 L 686 160 Z" />
        <rect x="692"  y="130" width="28" height="30" />
        <rect x="724"  y="120" width="20" height="40" />
        <rect x="748"  y="132" width="30" height="28" />
        <rect x="782"  y="118" width="22" height="42" />
        <rect x="808"  y="126" width="26" height="34" />
        <rect x="838"  y="120" width="20" height="40" />
        <rect x="862"  y="130" width="32" height="30" />
        <rect x="898"  y="122" width="22" height="38" />
        <rect x="924"  y="116" width="20" height="44" />
        <rect x="948"  y="132" width="26" height="28" />
        <path d="M 978 160 L 978 126 L 990 118 L 1002 126 L 1002 160 Z" />
        <rect x="1010" y="124" width="24" height="36" />
        <rect x="1038" y="118" width="20" height="42" />
        <rect x="1062" y="130" width="30" height="30" />
        <rect x="1096" y="122" width="22" height="38" />
        <rect x="1122" y="128" width="26" height="32" />
        <rect x="1152" y="120" width="20" height="40" />
        <rect x="1176" y="132" width="18" height="28" />
      </g>
    </svg>
  );
}

function MidCityLayer() {
  return (
    <svg
      viewBox="0 0 1200 220"
      preserveAspectRatio="xMidYEnd meet"
      xmlns="http://www.w3.org/2000/svg"
      className="block h-auto w-full"
      style={{ filter: "blur(0.4px)" }}
    >
      <g fill="#373c45" opacity="0.92">
        <rect x="20"   y="120" width="44" height="100" />
        <rect x="70"   y="100" width="36" height="120" />
        <rect x="114"  y="130" width="50" height="90" />
        <path d="M 170 220 L 170 110 L 188 96 L 206 110 L 206 220 Z" />
        <rect x="214"  y="120" width="38" height="100" />
        <rect x="260"  y="90"  width="44" height="130" />
        <rect x="310"  y="116" width="32" height="104" />
        <rect x="350"  y="98"  width="50" height="122" />
        <rect x="408"  y="124" width="38" height="96" />
        <path d="M 454 220 L 454 110 L 466 96 L 478 110 L 478 220 Z" />
        <rect x="486"  y="106" width="44" height="114" />
        <rect x="538"  y="120" width="32" height="100" />
        <rect x="578"  y="90"  width="50" height="130" />
        <rect x="636"  y="116" width="38" height="104" />
        <rect x="682"  y="100" width="44" height="120" />
        <rect x="734"  y="124" width="32" height="96" />
        <path d="M 774 220 L 774 100 L 790 86 L 806 100 L 806 220 Z" />
        <rect x="814"  y="118" width="40" height="102" />
        <rect x="862"  y="92"  width="46" height="128" />
        <rect x="916"  y="120" width="34" height="100" />
        <rect x="958"  y="108" width="50" height="112" />
        <rect x="1016" y="126" width="36" height="94" />
        <rect x="1060" y="98"  width="46" height="122" />
        <rect x="1114" y="118" width="40" height="102" />
        <rect x="1162" y="124" width="32" height="96" />
      </g>
      {/* Window grid dots on mid layer */}
      <g fill="#6c7280" opacity="0.5">
        <rect x="28"   y="128" width="2" height="2" />
        <rect x="36"   y="128" width="2" height="2" />
        <rect x="44"   y="128" width="2" height="2" />
        <rect x="52"   y="128" width="2" height="2" />
        <rect x="28"   y="140" width="2" height="2" />
        <rect x="44"   y="140" width="2" height="2" />
        <rect x="52"   y="140" width="2" height="2" />
        <rect x="78"   y="110" width="2" height="2" />
        <rect x="86"   y="110" width="2" height="2" />
        <rect x="94"   y="110" width="2" height="2" />
        <rect x="78"   y="122" width="2" height="2" />
        <rect x="94"   y="122" width="2" height="2" />
        <rect x="268"  y="100" width="2" height="2" />
        <rect x="276"  y="100" width="2" height="2" />
        <rect x="284"  y="100" width="2" height="2" />
        <rect x="294"  y="100" width="2" height="2" />
        <rect x="268"  y="112" width="2" height="2" />
        <rect x="284"  y="112" width="2" height="2" />
        <rect x="358"  y="108" width="2" height="2" />
        <rect x="368"  y="108" width="2" height="2" />
        <rect x="378"  y="108" width="2" height="2" />
        <rect x="388"  y="108" width="2" height="2" />
        <rect x="358"  y="120" width="2" height="2" />
        <rect x="378"  y="120" width="2" height="2" />
        <rect x="588"  y="100" width="2" height="2" />
        <rect x="598"  y="100" width="2" height="2" />
        <rect x="608"  y="100" width="2" height="2" />
        <rect x="618"  y="100" width="2" height="2" />
        <rect x="588"  y="112" width="2" height="2" />
        <rect x="608"  y="112" width="2" height="2" />
        <rect x="866"  y="100" width="2" height="2" />
        <rect x="876"  y="100" width="2" height="2" />
        <rect x="886"  y="100" width="2" height="2" />
        <rect x="898"  y="100" width="2" height="2" />
        <rect x="1066" y="108" width="2" height="2" />
        <rect x="1078" y="108" width="2" height="2" />
        <rect x="1088" y="108" width="2" height="2" />
        <rect x="1098" y="108" width="2" height="2" />
      </g>
    </svg>
  );
}

function NearCityLayer() {
  return (
    <svg
      viewBox="0 0 1200 300"
      preserveAspectRatio="xMidYEnd meet"
      xmlns="http://www.w3.org/2000/svg"
      className="block h-auto w-full"
    >
      <defs>
        <linearGradient id="nearBuilding" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"  stopColor="#71777f" />
          <stop offset="60%" stopColor="#525860" />
          <stop offset="100%" stopColor="#383d46" />
        </linearGradient>
      </defs>

      <g fill="url(#nearBuilding)">
        {/* anonymous rect */}
        <rect x="40" y="180" width="56" height="120" />
        {/* Library form (stepped) */}
        <path d="M 110 300 L 110 200 L 122 200 L 122 180 L 188 180 L 188 200 L 200 200 L 200 300 Z" />
        {/* slim rect */}
        <rect x="212" y="170" width="32" height="130" />
        {/* Observatory: cylindrical base + dome */}
        <path d="M 256 300 L 256 170 Q 283 130, 310 170 L 310 300 Z" />
        {/* tall rect */}
        <rect x="322" y="140" width="38" height="160" />
        {/* stepped library form 2 */}
        <path d="M 374 300 L 374 200 L 390 200 L 390 178 L 414 178 L 414 200 L 430 200 L 430 300 Z" />
        {/* obelisk monument */}
        <path d="M 458 300 L 458 110 L 466 100 L 474 110 L 474 300 Z" />
        {/* rect with cap */}
        <rect x="488" y="158" width="48" height="142" />
        <rect x="486" y="156" width="52" height="3" />
        {/* Broadcast tower base */}
        <rect x="554" y="210" width="42" height="90" />
        {/* Broadcast tower mast */}
        <path d="M 562 210 L 575 60 L 588 210 Z" />
        {/* rect */}
        <rect x="608" y="150" width="46" height="150" />
        {/* low wide hall */}
        <rect x="668" y="220" width="80" height="80" />
        {/* tallest rect */}
        <rect x="760" y="124" width="34" height="176" />
        {/* peaked roof */}
        <path d="M 810 300 L 810 178 L 832 158 L 854 178 L 854 300 Z" />
        {/* rect */}
        <rect x="868" y="170" width="46" height="130" />
        {/* civic dome */}
        <path d="M 934 300 L 934 196 Q 970 158, 1006 196 L 1006 300 Z" />
        {/* rect */}
        <rect x="1018" y="158" width="38" height="142" />
        {/* low rect */}
        <rect x="1066" y="190" width="58" height="110" />
        {/* slim rect end */}
        <rect x="1134" y="170" width="36" height="130" />
      </g>

      {/* Broadcast tower internal beams + antenna */}
      <g stroke="#8a8f98" strokeWidth="1.2" fill="none">
        <line x1="566" y1="150" x2="584" y2="150" />
        <line x1="568" y1="120" x2="582" y2="120" />
        <line x1="571" y1="90"  x2="579" y2="90" />
      </g>
      <circle cx="575" cy="58" r="2.2" fill="#c9627f" opacity="0.85" />

      {/* Observatory dome slit */}
      <rect x="278" y="142" width="10" height="6" fill="#0d0e12" />

      {/* Civic dome vertical pole */}
      <line x1="970" y1="156" x2="970" y2="170" stroke="#8a8f98" strokeWidth="1" />

      {/* Cold (unlit) window dots */}
      <g fill="#0d0e12" opacity="0.85">
        {/* library */}
        <rect x="122" y="208" width="3" height="3" />
        <rect x="132" y="208" width="3" height="3" />
        <rect x="142" y="208" width="3" height="3" />
        <rect x="152" y="208" width="3" height="3" />
        <rect x="162" y="208" width="3" height="3" />
        <rect x="172" y="208" width="3" height="3" />
        <rect x="182" y="208" width="3" height="3" />
        <rect x="122" y="220" width="3" height="3" />
        <rect x="142" y="220" width="3" height="3" />
        <rect x="162" y="220" width="3" height="3" />
        <rect x="182" y="220" width="3" height="3" />
        {/* tall rect 322 */}
        <rect x="328" y="156" width="3" height="3" />
        <rect x="340" y="156" width="3" height="3" />
        <rect x="352" y="156" width="3" height="3" />
        <rect x="328" y="170" width="3" height="3" />
        <rect x="352" y="170" width="3" height="3" />
        <rect x="328" y="184" width="3" height="3" />
        <rect x="340" y="184" width="3" height="3" />
        <rect x="352" y="184" width="3" height="3" />
        {/* rect 488 */}
        <rect x="496" y="170" width="3" height="3" />
        <rect x="508" y="170" width="3" height="3" />
        <rect x="520" y="170" width="3" height="3" />
        <rect x="496" y="184" width="3" height="3" />
        <rect x="520" y="184" width="3" height="3" />
        <rect x="496" y="200" width="3" height="3" />
        <rect x="508" y="200" width="3" height="3" />
        <rect x="520" y="200" width="3" height="3" />
        {/* rect 608 */}
        <rect x="616" y="166" width="3" height="3" />
        <rect x="628" y="166" width="3" height="3" />
        <rect x="640" y="166" width="3" height="3" />
        <rect x="616" y="180" width="3" height="3" />
        <rect x="640" y="180" width="3" height="3" />
        {/* tall rect 760 */}
        <rect x="766" y="140" width="3" height="3" />
        <rect x="778" y="140" width="3" height="3" />
        <rect x="790" y="140" width="3" height="3" />
        <rect x="766" y="156" width="3" height="3" />
        <rect x="790" y="156" width="3" height="3" />
        <rect x="766" y="172" width="3" height="3" />
        <rect x="778" y="172" width="3" height="3" />
        <rect x="790" y="172" width="3" height="3" />
        {/* rect 868 */}
        <rect x="876" y="182" width="3" height="3" />
        <rect x="888" y="182" width="3" height="3" />
        <rect x="900" y="182" width="3" height="3" />
        {/* rect 1018 */}
        <rect x="1024" y="170" width="3" height="3" />
        <rect x="1036" y="170" width="3" height="3" />
        <rect x="1046" y="170" width="3" height="3" />
        <rect x="1024" y="184" width="3" height="3" />
        <rect x="1046" y="184" width="3" height="3" />
        {/* rect 1066 low */}
        <rect x="1074" y="206" width="3" height="3" />
        <rect x="1086" y="206" width="3" height="3" />
        <rect x="1098" y="206" width="3" height="3" />
        <rect x="1110" y="206" width="3" height="3" />
      </g>

      {/* Warm window pulses */}
      <g fill="#e6bfa1">
        <rect x="60"   y="206" width="3" height="4" className="window-warm" />
        <rect x="80"   y="222" width="3" height="4" className="window-warm" style={{ animationDelay: "-1.4s" }} />
        <rect x="220"  y="194" width="3" height="4" className="window-warm" style={{ animationDelay: "-2.8s" }} />
        <rect x="332"  y="200" width="3" height="4" className="window-warm" style={{ animationDelay: "-0.8s" }} />
        <rect x="498"  y="220" width="3" height="4" className="window-warm" style={{ animationDelay: "-3.6s" }} />
        <rect x="618"  y="222" width="3" height="4" className="window-warm" style={{ animationDelay: "-1.2s" }} />
        <rect x="780"  y="200" width="3" height="4" className="window-warm" style={{ animationDelay: "-4.2s" }} />
        <rect x="876"  y="222" width="3" height="4" className="window-warm" style={{ animationDelay: "-0.4s" }} />
        <rect x="1084" y="218" width="3" height="4" className="window-warm" style={{ animationDelay: "-2.4s" }} />
      </g>
    </svg>
  );
}

/* ─── Main component ─────────────────────────── */

export default function EarthCityScroll() {
  const sectionRef     = useRef<HTMLElement>(null);
  const farStarsRef    = useRef<HTMLDivElement>(null);
  const midStarsRef    = useRef<HTMLDivElement>(null);
  const nearStarsRef   = useRef<HTMLDivElement>(null);
  const earthRef       = useRef<HTMLDivElement>(null);
  const continentsRef  = useRef<SVGGElement>(null);
  const cityFarRef     = useRef<HTMLDivElement>(null);
  const cityMidRef     = useRef<HTMLDivElement>(null);
  const cityNearRef    = useRef<HTMLDivElement>(null);
  const cityHazeRef    = useRef<HTMLDivElement>(null);
  const earthLabelRef  = useRef<HTMLDivElement>(null);
  const cityLabelRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // Populate each star layer with its own density / size band
      const populate = (
        container: HTMLDivElement | null,
        cfg: (typeof STAR_LAYERS)[number],
      ) => {
        if (!container || container.children.length) return;
        for (let i = 0; i < cfg.count; i++) {
          const d = document.createElement("div");
          d.className = `dust-dot layer-${cfg.layer}`;
          const size =
            cfg.sizeMin + Math.random() * (cfg.sizeMax - cfg.sizeMin);
          d.style.width = size + "px";
          d.style.height = size + "px";
          d.style.left = Math.random() * 100 + "%";
          d.style.top = Math.random() * 100 + "%";
          const opa = cfg.opaMin + Math.random() * (cfg.opaMax - cfg.opaMin);
          d.style.setProperty("--opa", String(opa));
          d.style.animationDuration =
            cfg.dur[0] +
            Math.random() * (cfg.dur[1] - cfg.dur[0]) +
            "s";
          d.style.animationDelay = -Math.random() * 4 + "s";
          // Tint a few near-layer stars warm / pink
          if (cfg.layer === "near") {
            const t = Math.random();
            if (t > 0.92) d.style.background = "#e6bfa1";
            else if (t > 0.88) d.style.background = "#ec8ba8";
          }
          container.appendChild(d);
        }
      };
      populate(farStarsRef.current,  STAR_LAYERS[0]);
      populate(midStarsRef.current,  STAR_LAYERS[1]);
      populate(nearStarsRef.current, STAR_LAYERS[2]);

      const ctx = gsap.context(() => {
        // Slow continuous continent rotation (independent of scroll)
        if (continentsRef.current) {
          gsap.to(continentsRef.current, {
            rotation: 360,
            transformOrigin: "120px 120px",
            duration: 90,
            repeat: -1,
            ease: "none",
          });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=2600",
            pin: true,
            scrub: 1.2,
          },
        });

        // ── Earth: approach → push-in → zoom past ──
        tl.fromTo(
          earthRef.current,
          { opacity: 0, scale: 0.14, filter: "blur(14px)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            ease: "power2.out",
            duration: 0.32,
          },
          0,
        );
        tl.to(
          earthRef.current,
          { scale: 1.1, ease: "sine.inOut", duration: 0.16 },
          0.32,
        );
        tl.to(
          earthRef.current,
          {
            scale: 3.6,
            opacity: 0,
            filter: "blur(7px)",
            ease: "power2.in",
            duration: 0.20,
          },
          0.48,
        );

        // ── City: three layers rise + reveal ──
        tl.fromTo(
          cityFarRef.current,
          { opacity: 0, y: "30vh" },
          { opacity: 0.9, y: "6vh", ease: "power2.out", duration: 0.34 },
          0.50,
        );
        tl.fromTo(
          cityMidRef.current,
          { opacity: 0, y: "32vh", scale: 0.92 },
          {
            opacity: 1,
            y: "4vh",
            scale: 1,
            ease: "power2.out",
            duration: 0.32,
          },
          0.55,
        );
        tl.fromTo(
          cityNearRef.current,
          {
            opacity: 0,
            y: "30vh",
            scale: 0.78,
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            y: "0vh",
            scale: 1,
            filter: "blur(0px)",
            ease: "power2.out",
            duration: 0.32,
          },
          0.60,
        );
        tl.fromTo(
          cityHazeRef.current,
          { opacity: 0 },
          { opacity: 1, ease: "power2.out", duration: 0.30 },
          0.55,
        );

        // Gentle settle
        tl.to(
          cityFarRef.current,
          { y: "3vh", ease: "sine.inOut", duration: 0.12 },
          0.82,
        );
        tl.to(
          cityNearRef.current,
          { y: "-2vh", scale: 1.04, ease: "sine.inOut", duration: 0.12 },
          0.82,
        );

        // ── Star parallax (depth-graded speeds) ──
        tl.to(
          farStarsRef.current,
          { y: "-3vh", x: "-1vw", ease: "none", duration: 1 },
          0,
        );
        tl.to(
          midStarsRef.current,
          { y: "-7vh", x: "-2vw", ease: "none", duration: 1 },
          0,
        );
        tl.to(
          nearStarsRef.current,
          { y: "-14vh", x: "-4vw", ease: "none", duration: 1 },
          0,
        );

        // ── Captions ──
        tl.fromTo(
          earthLabelRef.current,
          { opacity: 0, y: 12 },
          { opacity: 0.8, y: 0, ease: "sine.out", duration: 0.10 },
          0.12,
        );
        tl.to(
          earthLabelRef.current,
          { opacity: 0, y: -8, ease: "sine.in", duration: 0.10 },
          0.42,
        );
        tl.fromTo(
          cityLabelRef.current,
          { opacity: 0, y: 12 },
          { opacity: 0.8, y: 0, ease: "sine.out", duration: 0.10 },
          0.66,
        );
        tl.to(
          cityLabelRef.current,
          { opacity: 0, y: -8, ease: "sine.in", duration: 0.10 },
          0.92,
        );
      }, sectionRef);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup?.();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-night"
    >
      {/* Layered star field — center cleared via radial mask so the
          focal subject isn't competing with dots */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          maskImage:
            "radial-gradient(circle 240px at 50% 48%, transparent 0px, transparent 90px, black 220px)",
          WebkitMaskImage:
            "radial-gradient(circle 240px at 50% 48%, transparent 0px, transparent 90px, black 220px)",
        }}
      >
        <div ref={farStarsRef}  className="dust-field absolute inset-0" />
        <div ref={midStarsRef}  className="dust-field absolute inset-0" />
        <div ref={nearStarsRef} className="dust-field absolute inset-0" />
      </div>

      {/* City — three parallax layers */}
      <div
        ref={cityFarRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] flex justify-center"
        style={{ willChange: "transform, opacity", opacity: 0 }}
      >
        <FarCityLayer />
      </div>
      <div
        ref={cityMidRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] flex justify-center"
        style={{ willChange: "transform, opacity", opacity: 0 }}
      >
        <MidCityLayer />
      </div>
      <div
        ref={cityNearRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] flex justify-center"
        style={{ willChange: "transform, opacity, filter", opacity: 0 }}
      >
        <NearCityLayer />
      </div>

      {/* Atmospheric haze veiling the city base */}
      <div
        ref={cityHazeRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-[42vh]"
        style={{
          opacity: 0,
          background:
            "linear-gradient(to top, rgba(12,14,18,0.92) 0%, rgba(38,44,56,0.55) 35%, rgba(52,60,72,0.18) 65%, transparent 100%)",
        }}
      />

      {/* Earth — phase 01 (sits above city, since earth phase ends
          before city begins this stacking is purely defensive) */}
      <div
        ref={earthRef}
        className="pointer-events-none absolute left-1/2 top-1/2 z-[7] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: "transform, opacity, filter", opacity: 0 }}
      >
        <div className="earth-float">
          <EarthSphere continentsRef={continentsRef} />
        </div>
      </div>

      {/* Captions */}
      <div
        ref={earthLabelRef}
        className="pointer-events-none absolute bottom-[14%] left-1/2 z-10 -translate-x-1/2 text-center"
        style={{ opacity: 0 }}
      >
        <div className="mb-2 font-mono text-[0.62rem] uppercase tracking-[0.3em] text-cream-mute">
          — Phase 01 —
        </div>
        <div className="font-display text-[1rem] italic text-cream-soft">
          approaching earth
        </div>
      </div>
      <div
        ref={cityLabelRef}
        className="pointer-events-none absolute bottom-[14%] left-1/2 z-10 -translate-x-1/2 text-center"
        style={{ opacity: 0 }}
      >
        <div className="mb-2 font-mono text-[0.62rem] uppercase tracking-[0.3em] text-cream-mute">
          — Phase 02 —
        </div>
        <div className="font-display text-[1rem] italic text-cream-soft">
          descending to the city
        </div>
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint pointer-events-none absolute bottom-7 left-1/2 z-30 -translate-x-1/2 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-cream-mute">
        SCROLL ↓
      </div>
    </section>
  );
}
