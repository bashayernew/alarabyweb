import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServicesWithAbout from "@/components/sections/ServicesWithAbout";

export const metadata: Metadata = {
  title: "الخدمات | من نحن",
  description:
    "شركة الرائد العربي - خدمات أنظمة المياه والسستم المركزي، تركيب وصيانة السخانات والفلاتر والمضخات.",
};

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main>
        <ServicesWithAbout />
      </main>
      <Footer />
    </div>
  );
}

