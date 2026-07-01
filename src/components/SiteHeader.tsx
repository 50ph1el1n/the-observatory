import Link from "next/link";
import MobileNav from "./MobileNav";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Article", href: "/#articles" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-night/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-[1.2rem] font-medium italic tracking-tight text-cream transition-colors hover:text-gold"
        >
          <span className="not-italic text-gold text-[1rem]">✦</span>
          The Observatory
        </Link>
        <nav className="hidden gap-7 md:flex">
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
        <MobileNav />
      </div>
    </header>
  );
}
