import Hero from "@/components/Hero";
import EarthCityScroll from "@/components/EarthCityScroll";
import CityWorlds from "@/components/CityWorlds";
import Articles from "@/components/Articles";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <EarthCityScroll />
      <CityWorlds />

      <section className="bg-night-deep border-t border-line px-8 py-28">
        <Articles />
      </section>

      <Footer />
    </>
  );
}
