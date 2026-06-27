import Link from "next/link";
import { districts } from "@/lib/districts";
import { getArticlesByDistrict } from "@/lib/articles";

export default function CityMap() {
  return (
    <div className="mx-auto max-w-[1240px]">
      <div className="mb-5 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-gold">
        — The City Map —
      </div>
      <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] font-medium leading-[1.1] tracking-tight text-cream">
        Eight <em className="font-normal italic text-gold">districts</em> of
        thought.
      </h2>
      <p className="mt-4 max-w-[560px] font-display text-[1.1rem] italic leading-[1.7] text-cream-soft">
        Each district holds one kind of writing. The more I write, the denser
        the city becomes.
      </p>

      <div className="mt-14 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
        {districts.map((d) => {
          const count = getArticlesByDistrict(d.key).length;
          return (
            <Link
              key={d.key}
              href={`/districts/${d.key}`}
              className="group bg-night-deep px-7 py-9 text-left transition-colors hover:bg-night-soft"
            >
              <div className="mb-5 flex h-8 w-8 items-center justify-center text-[1.5rem] text-gold transition-transform duration-300 group-hover:scale-110">
                {d.mark}
              </div>
              <div className="mb-1 font-display text-[1.25rem] font-medium italic tracking-tight text-cream transition-colors group-hover:text-gold">
                {d.name}
              </div>
              <div className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cream-mute">
                {d.en}
              </div>
              <div className="font-sans text-[0.8rem] text-cream-soft">
                {count} {count === 1 ? "essay" : "essays"}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
