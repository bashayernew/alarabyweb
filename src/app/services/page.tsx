import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServicesCatalog from "@/components/sections/ServicesCatalog";

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main>
        <ServicesCatalog />
      </main>
      <Footer />
    </div>
  );
}

