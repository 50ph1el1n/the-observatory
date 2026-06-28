"use client";

import { useEffect, useRef } from "react";

const NUM_DOTS = 220;

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

// Deterministic city skyline — generated once at module load.
// Top portion of each building is a solid rect; lower portion fades to
// halftone dots, matching the reference image.
const cityShapes = (() => {
  const random = seededRandom(7);
  const buildings = [
    { x: 30, w: 28, h: 80 },
    { x: 62, w: 36, h: 120 },
    { x: 102, w: 30, h: 96 },
    { x: 138, w: 40, h: 140 },
    { x: 182, w: 30, h: 108 },
    { x: 218, w: 34, h: 160 },
    { x: 258, w: 28, h: 96 },
    { x: 292, w: 42, h: 132 },
    { x: 338, w: 30, h: 116 },
    { x: 374, w: 34, h: 104 },
    { x: 414, w: 30, h: 138 },
    { x: 450, w: 28, h: 90 },
  ];

  const rects: { x: number; y: number; w: number; h: number }[] = [];
  const dots: { x: number; y: number; r: number }[] = [];
  const GAP = 3.5;

  for (const b of buildings) {
    const solidH = b.h * 0.6;
    const dottedH = b.h - solidH;
    const dottedTopY = 200 - dottedH;
    rects.push({ x: b.x, y: 200 - b.h, w: b.w, h: solidH });

    const cols = Math.floor(b.w / GAP);
    const rows = Math.floor(dottedH / GAP);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const dx = b.x + c * GAP + GAP / 2;
        const dy = dottedTopY + r * GAP + GAP / 2;
        const verticalProgress = r / rows;
        const showProb = 0.88 - 0.78 * verticalProgress;
        if (random() < showProb) {
          dots.push({ x: dx, y: dy, r: 1.2 });
        }
      }
    }
  }

  // Trailing floor dots — halftone bleeds below the skyline
  for (let i = 0; i < 70; i++) {
    dots.push({
      x: 10 + random() * 500,
      y: 196 + random() * 4,
      r: 1,
    });
  }

  return { rects, dots };
})();

export default function EarthCityScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const dustFieldRef = useRef<HTMLDivElement>(null);
  const earthRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);
  const earthLabelRef = useRef<HTMLDivElement>(null);
  const cityLabelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const dustField = dustFieldRef.current;
      if (dustField && !dustField.children.length) {
        for (let i = 0; i < NUM_DOTS; i++) {
          const d = document.createElement("div");
          d.className = "dust-dot";
          const size =
            Math.random() < 0.85
              ? 1 + Math.random() * 2
              : 3 + Math.random() * 2;
          const opacity = 0.4 + Math.random() * 0.5;
          d.style.width = size + "px";
          d.style.height = size + "px";
          d.style.left = Math.random() * 100 + "%";
          d.style.top = Math.random() * 100 + "%";
          d.style.setProperty("--opa", String(opacity));
          d.style.animationDuration = 2 + Math.random() * 3.5 + "s";
          d.style.animationDelay = -Math.random() * 4 + "s";
          dustField.appendChild(d);
        }
      }

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=2200",
            pin: true,
            scrub: 1,
          },
        });

        // ── Earth: approach → hold → zoom past
        tl.fromTo(
          earthRef.current,
          { opacity: 0, scale: 0.18 },
          { opacity: 1, scale: 1, ease: "none", duration: 0.30 },
          0,
        );
        tl.to(
          earthRef.current,
          { scale: 1.35, ease: "none", duration: 0.18 },
          0.30,
        );
        tl.to(
          earthRef.current,
          { scale: 3.5, opacity: 0, ease: "power1.in", duration: 0.18 },
          0.48,
        );

        // ── City: rises from below + settles
        tl.fromTo(
          cityRef.current,
          { opacity: 0, scale: 0.32, y: "22vh" },
          { opacity: 1, scale: 1, y: "0vh", ease: "none", duration: 0.30 },
          0.55,
        );
        tl.to(
          cityRef.current,
          { scale: 1.12, ease: "none", duration: 0.15 },
          0.85,
        );

        // ── Captions
        tl.fromTo(
          earthLabelRef.current,
          { opacity: 0 },
          { opacity: 0.75, ease: "none", duration: 0.1 },
          0.12,
        );
        tl.to(
          earthLabelRef.current,
          { opacity: 0, ease: "none", duration: 0.1 },
          0.42,
        );
        tl.fromTo(
          cityLabelRef.current,
          { opacity: 0 },
          { opacity: 0.75, ease: "none", duration: 0.1 },
          0.65,
        );
        tl.to(
          cityLabelRef.current,
          { opacity: 0, ease: "none", duration: 0.1 },
          0.92,
        );

        // ── Background dust parallax
        tl.to(
          dustFieldRef.current,
          { y: "-8vh", ease: "none", duration: 1 },
          0,
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
      <div
        ref={dustFieldRef}
        className="dust-field pointer-events-none absolute inset-0 z-[1]"
      />

      {/* ── Earth layer ── */}
      <div
        ref={earthRef}
        className="pointer-events-none absolute left-1/2 top-1/2 z-[5] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: "transform, opacity", opacity: 0 }}
      >
        <svg
          viewBox="0 0 200 200"
          width="280"
          height="280"
          xmlns="http://www.w3.org/2000/svg"
          className="block"
        >
          <circle cx="100" cy="100" r="76" fill="#7a7a82" />
          <ellipse
            cx="100"
            cy="100"
            rx="76"
            ry="22"
            fill="none"
            stroke="#0d0d10"
            strokeWidth="1"
            opacity="0.55"
          />
          <ellipse
            cx="100"
            cy="100"
            rx="76"
            ry="52"
            fill="none"
            stroke="#0d0d10"
            strokeWidth="1"
            opacity="0.35"
          />
          <line
            x1="100"
            y1="24"
            x2="100"
            y2="176"
            stroke="#0d0d10"
            strokeWidth="1"
            opacity="0.45"
          />
          <path
            d="M 100 24 Q 60 100, 100 176"
            fill="none"
            stroke="#0d0d10"
            strokeWidth="1"
            opacity="0.3"
          />
          <path
            d="M 100 24 Q 140 100, 100 176"
            fill="none"
            stroke="#0d0d10"
            strokeWidth="1"
            opacity="0.3"
          />
          <path
            d="M 80 58 Q 92 52, 108 60 Q 120 56, 130 68 L 130 82 Q 124 88, 126 96 L 122 110 Q 118 122, 108 130 L 106 142 Q 100 150, 94 142 L 90 128 Q 86 116, 82 104 L 80 90 Q 76 78, 80 68 Z"
            fill="#2a2a32"
          />
          <circle
            cx="100"
            cy="100"
            r="76"
            fill="none"
            stroke="#b8b8c0"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* ── City layer ── */}
      <div
        ref={cityRef}
        className="pointer-events-none absolute left-1/2 top-1/2 z-[6] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: "transform, opacity", opacity: 0 }}
      >
        <svg
          viewBox="0 0 520 200"
          width="560"
          height="216"
          xmlns="http://www.w3.org/2000/svg"
          className="block"
        >
          <g fill="#ededed">
            {cityShapes.rects.map((r, i) => (
              <rect
                key={`r-${i}`}
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
              />
            ))}
            {cityShapes.dots.map((d, i) => (
              <circle key={`d-${i}`} cx={d.x} cy={d.y} r={d.r} />
            ))}
          </g>
        </svg>
      </div>

      {/* ── Captions ── */}
      <div
        ref={earthLabelRef}
        className="pointer-events-none absolute bottom-[16%] left-1/2 z-10 -translate-x-1/2 text-center"
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
        className="pointer-events-none absolute bottom-[16%] left-1/2 z-10 -translate-x-1/2 text-center"
        style={{ opacity: 0 }}
      >
        <div className="mb-2 font-mono text-[0.62rem] uppercase tracking-[0.3em] text-cream-mute">
          — Phase 02 —
        </div>
        <div className="font-display text-[1rem] italic text-cream-soft">
          descending to the city
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div className="scroll-hint pointer-events-none absolute bottom-7 left-1/2 z-30 -translate-x-1/2 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-cream-mute">
        SCROLL ↓
      </div>
    </section>
  );
}
