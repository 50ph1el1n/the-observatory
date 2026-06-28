"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Article", href: "/#articles" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

const NUM_DOTS = 220;
const NUM_PARTICLES = 60;

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const dustFieldRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const moteRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // 1. Generate dust field (random twinkling dots)
      const dustField = dustFieldRef.current;
      if (dustField && !dustField.children.length) {
        for (let i = 0; i < NUM_DOTS; i++) {
          const d = document.createElement("div");
          d.className = "dust-dot";
          const size = Math.random() < 0.85
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
          const tint = Math.random();
          if (tint > 0.92) d.style.background = "#e6bfa1";
          else if (tint > 0.88) d.style.background = "#ec8ba8";
          dustField.appendChild(d);
        }
      }

      // 2. Generate dispersal particles
      const pContainer = particlesRef.current;
      const particles: HTMLDivElement[] = [];
      if (pContainer && !pContainer.children.length) {
        for (let i = 0; i < NUM_PARTICLES; i++) {
          const p = document.createElement("div");
          p.className = "particle";
          if (Math.random() > 0.7) p.classList.add("warm");
          if (Math.random() > 0.88) p.classList.add("pink");
          const size = 2 + Math.random() * 4;
          p.style.width = size + "px";
          p.style.height = size + "px";
          pContainer.appendChild(p);
          particles.push(p);
        }
      }

      // 3. Scroll-scrubbed timeline
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=1800",
            pin: true,
            scrub: 1,
          },
        });

        // Mote descends + slight scale up
        tl.fromTo(
          moteRef.current,
          { top: "50%" },
          { top: "92%", ease: "none", duration: 1 },
          0
        );
        tl.to(moteRef.current, { scale: 1.18, ease: "none", duration: 1 }, 0);
        tl.to(moteRef.current, { opacity: 0.55, ease: "none", duration: 0.4 }, 0.6);

        // Particle dispersal
        particles.forEach((p) => {
          const angle = Math.random() * Math.PI * 2;
          const dist = 80 + Math.random() * 260;
          const x = Math.cos(angle) * dist;
          const y = Math.sin(angle) * dist * 0.7 + 60;
          const start = 0.45 + Math.random() * 0.15;
          tl.fromTo(
            p,
            { x: 0, y: 0, opacity: 0, scale: 0.5 },
            { x, y, opacity: 1, scale: 1, ease: "power1.out", duration: 0.35 },
            start
          );
          tl.to(p, { opacity: 0, ease: "power1.in", duration: 0.3 }, start + 0.3);
        });

        // Background parallax + tag fade out
        tl.to(dustFieldRef.current, { y: "-5vh", ease: "none", duration: 1 }, 0);
        tl.to(tagRef.current, { opacity: 0, y: 40, ease: "none", duration: 0.4 }, 0.1);
        tl.to(hintRef.current, { opacity: 0, ease: "none", duration: 0.2 }, 0.1);
      }, heroRef);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup?.();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen overflow-hidden bg-night"
    >
      {/* Dust field (twinkling background dots) */}
      <div
        ref={dustFieldRef}
        className="dust-field pointer-events-none absolute inset-0 z-[1]"
      />

      {/* Particle dispersal layer */}
      <div
        ref={particlesRef}
        className="particles pointer-events-none absolute left-1/2 top-1/2 z-[6] h-0 w-0"
      />

      {/* Central organic mote */}
      <div
        ref={moteRef}
        className="mote-wrap absolute left-1/2 top-1/2 z-[5] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: "transform, top" }}
      >
        <div
          className="mote"
          style={{
            width: 200,
            height: 150,
            animation: "float 5.5s ease-in-out infinite",
            filter: "drop-shadow(0 8px 24px rgba(230,191,161,0.22))",
          }}
        >
          <svg viewBox="0 0 220 165" xmlns="http://www.w3.org/2000/svg" className="block w-full h-full">
            <defs>
              <radialGradient id="moteFill" cx="40%" cy="35%" r="68%">
                <stop offset="0%" stopColor="#f0d2b3" />
                <stop offset="55%" stopColor="#e6bfa1" />
                <stop offset="100%" stopColor="#caa386" />
              </radialGradient>
            </defs>
            <path
              d="M 18 92 C 2 60, 40 18, 80 20 C 108 21, 130 8, 162 22 C 192 36, 218 58, 205 95 C 198 122, 178 138, 148 144 C 132 148, 118 156, 92 152 C 60 148, 26 144, 12 120 C 0 107, 4 96, 18 92 Z"
              fill="url(#moteFill)"
            />
          </svg>
        </div>
      </div>

      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-12 py-7">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-[1.2rem] font-medium italic tracking-tight text-cream"
        >
          <span className="not-italic text-[1.1rem] text-gold">✦</span>
          The Observatory
        </Link>
        <nav className="flex gap-7">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.12em] text-cream opacity-65 transition hover:text-gold hover:opacity-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Hero tag (below mote) */}
      <div
        ref={tagRef}
        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 translate-y-[100px] pointer-events-none text-center"
      >
        <div className="font-display text-[1rem] italic text-cream-soft opacity-75">
          scroll to enter the worlds
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={hintRef}
        className="scroll-hint absolute bottom-7 left-1/2 z-30 -translate-x-1/2 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-cream-mute"
      >
        SCROLL ↓
      </div>
    </section>
  );
}
