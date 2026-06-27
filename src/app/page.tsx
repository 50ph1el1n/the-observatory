import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Articles from "@/components/Articles";
import CityMap from "@/components/CityMap";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="bg-night px-8 py-28">
        <Intro />
        <div className="mt-20">
          <Articles />
        </div>
      </section>

      <section
        id="city"
        className="border-y border-line bg-night-deep px-8 py-28"
      >
        <CityMap />
      </section>

      <Footer />
    </>
  );
}
