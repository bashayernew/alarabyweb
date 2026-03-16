import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import HomeServicesPreview from "@/components/sections/HomeServicesPreview";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import HomeProductsPreview from "@/components/sections/HomeProductsPreview";
import WaterTanks from "@/components/sections/WaterTanks";
import WaterPumps from "@/components/sections/WaterPumps";
import WaterTankAccessories from "@/components/sections/WaterTankAccessories";
import PlumbingAccessories from "@/components/sections/PlumbingAccessories";
import WaterTankCooling from "@/components/sections/WaterTankCooling";
import RoFilters from "@/components/sections/RoFilters";
import RoSevenStageSystem from "@/components/sections/RoSevenStageSystem";
import TripleJumboFilter from "@/components/sections/TripleJumboFilter";
import TripleJumbo3Year from "@/components/sections/TripleJumbo3Year";
import WaterHeaterSystems from "@/components/sections/WaterHeaterSystems";
import WaterHeaterParts from "@/components/sections/WaterHeaterParts";
import LimescaleFilter from "@/components/sections/LimescaleFilter";
import Process from "@/components/sections/Process";
import Offers from "@/components/sections/Offers";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import ContactSection from "@/components/sections/ContactSection";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main>
        <Hero />
        <HomeServicesPreview />
        <WhyChooseUs />
        <HomeProductsPreview />
        <WaterTanks />
        <WaterHeaterSystems />
        <Process />
        <Offers />
        <Testimonials />
        <FAQ />
        <ContactSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

