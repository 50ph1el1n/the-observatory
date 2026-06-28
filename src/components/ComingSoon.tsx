import Link from "next/link";
import SiteHeader from "./SiteHeader";
import Footer from "./Footer";

type Props = {
  title: string;
  blurb?: string;
};

export default function ComingSoon({ title, blurb }: Props) {
  return (
    <div className="min-h-screen bg-night text-cream">
      <SiteHeader />

      <main className="flex min-h-[calc(100vh-180px)] items-center justify-center px-6 py-20">
        <div className="max-w-[540px] text-center">
          <div className="mb-6 font-mono text-[0.72rem] uppercase tracking-[0.3em] text-gold">
            — Coming Soon —
          </div>
          <h1 className="mb-8 font-display text-[clamp(2.4rem,5vw,3.8rem)] font-medium italic tracking-tight text-cream">
            {title}
          </h1>
          {blurb && (
            <p className="mb-12 font-display text-[1.15rem] italic leading-relaxed text-cream-soft">
              {blurb}
            </p>
          )}
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[0.75rem] uppercase tracking-[0.18em] text-cream-soft transition-colors hover:text-gold"
          >
            <span aria-hidden>←</span> Back to the worlds
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
