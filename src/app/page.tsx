import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import HomeServicesPreview from "@/components/sections/HomeServicesPreview";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import HomeProductsPreview from "@/components/sections/HomeProductsPreview";
import WaterTanks from "@/components/sections/WaterTanks";
import WaterHeaterSystems from "@/components/sections/WaterHeaterSystems";
import Process from "@/components/sections/Process";
import Offers from "@/components/sections/Offers";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import ContactSection from "@/components/sections/ContactSection";
import FinalCTA from "@/components/sections/FinalCTA";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

