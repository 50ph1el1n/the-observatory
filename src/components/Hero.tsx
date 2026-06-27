import Link from "next/link";

const navItems = [
  { label: "About me", href: "/#about" },
  { label: "Article", href: "/#articles" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/#contact" },
];

export default function Hero() {
  return (
    <section
      className="relative h-screen min-h-[680px] overflow-hidden bg-night bg-cover bg-bottom bg-no-repeat"
      style={{ backgroundImage: "url(/hero.png)" }}
    >
      {/* Top fade for header readability */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-40 bg-gradient-to-b from-[rgba(20,10,40,0.55)] to-transparent" />

      {/* Header */}
      <header className="relative z-30 flex items-center justify-between px-12 py-7">
        <div className="flex items-center gap-12">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-[1.4rem] font-medium italic tracking-tight text-cream"
          >
            <span className="not-italic text-gold text-[1.1rem]">✦</span>
            The Observatory
          </Link>
          <nav className="flex gap-7">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-sans text-[0.85rem] font-medium tracking-wide text-cream opacity-85 transition hover:text-gold hover:opacity-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <button className="rounded-sm border border-cream bg-transparent px-5 py-2.5 font-sans text-[0.8rem] font-medium uppercase tracking-[0.08em] text-cream transition hover:border-gold hover:bg-gold hover:text-night-deep">
          Start Exploring
        </button>
      </header>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 z-10 h-[50px] w-px -translate-x-1/2 bg-gradient-to-b from-transparent to-cream-mute opacity-60">
        <span
          className="absolute -bottom-1 -left-[3px] block h-[7px] w-[7px] rotate-45 border-b border-r border-cream-mute"
          aria-hidden
        />
      </div>
    </section>
  );
}
