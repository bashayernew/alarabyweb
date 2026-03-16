import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Products from "@/components/sections/Products";

export const metadata: Metadata = {
  title: "المنتجات",
};

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main>
        <Products />
      </main>
      <Footer />
    </div>
  );
}

