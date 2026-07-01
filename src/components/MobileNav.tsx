"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Article", href: "/#articles" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

/**
 * Phone navigation — a hamburger button that opens a full-screen drawer.
 * Only ever visible below `md`; the desktop <nav> sits beside it hidden on
 * small screens. Shared by SiteHeader (sub-pages) and Hero (home).
 */
export default function MobileNav() {
  const [open, setOpen] = useState(false);

  // Lock body scroll + close on Escape while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="-mr-2 flex h-10 w-10 items-center justify-center text-cream transition-colors hover:text-gold"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden
        >
          <line x1="3" y1="6.5" x2="19" y2="6.5" />
          <line x1="3" y1="11" x2="19" y2="11" />
          <line x1="3" y1="15.5" x2="19" y2="15.5" />
        </svg>
      </button>

      {/* Full-screen drawer */}
      <div
        className={
          "fixed inset-0 z-[100] flex flex-col bg-night/98 backdrop-blur-md transition-opacity duration-300 " +
          (open ? "opacity-100" : "pointer-events-none opacity-0")
        }
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-5">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 font-display text-[1.2rem] font-medium italic tracking-tight text-cream"
          >
            <span className="not-italic text-[1rem] text-gold">✦</span>
            The Observatory
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center -mr-2 text-cream transition-colors hover:text-gold"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              aria-hidden
            >
              <line x1="5" y1="5" x2="17" y2="17" />
              <line x1="17" y1="5" x2="5" y2="17" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
          {navItems.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-4 py-3 font-display text-[2.2rem] font-medium italic tracking-tight text-cream transition-colors hover:text-gold"
            >
              <span className="font-mono text-[0.7rem] not-italic tracking-[0.2em] text-cream-mute transition-colors group-hover:text-gold">
                0{i + 1}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-line px-8 py-6 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-cream-mute">
          Built with care in Taipei · © 2026
        </div>
      </div>
    </div>
  );
}
