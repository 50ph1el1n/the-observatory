export default function Footer() {
  return (
    <footer className="border-t border-line bg-night-deep px-8 py-16">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <div className="font-display text-base italic text-cream-soft">
          <span className="mr-2 text-gold">✦</span>The Observatory
        </div>
        <div className="font-mono text-[0.72rem] uppercase tracking-[0.15em] text-cream-mute">
          Built with care in Taipei · © 2026
        </div>
      </div>
    </footer>
  );
}
