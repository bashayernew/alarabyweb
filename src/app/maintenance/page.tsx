import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MaintenancePage from "@/components/sections/MaintenancePage";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "خدمات الصيانة",
  description:
    "نقدم خدمات صيانة احترافية لجميع أنظمة المياه والفلاتر والسخانات والسستم المركزي باستخدام أفضل المعدات وفريق فني متخصص.",
};

export default function MaintenanceRoute() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main>
        <MaintenancePage />
      </main>
      <Footer />
    </div>
  );
}
