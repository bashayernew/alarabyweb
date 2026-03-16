import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import OffersCatalog from "@/components/sections/OffersCatalog";

export const metadata: Metadata = {
  title: "العروض",
  description:
    "عروض حصرية على أنظمة المياه والسخانات المركزية والفلاتر والمضخات.",
};

export default function OffersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main>
        <OffersCatalog />
      </main>
      <Footer />
    </div>
  );
}
