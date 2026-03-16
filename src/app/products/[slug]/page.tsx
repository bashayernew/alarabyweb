import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductDetail from "@/components/sections/ProductDetail";
import { catalogProducts } from "@/content/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return catalogProducts.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = catalogProducts.find((p) => p.id === slug);
  if (!product) return { title: "Product" };
  return {
    title: product.title_en,
    description: product.short_description_en,
  };
}

async function getProduct(slug: string) {
  const fromCatalog = catalogProducts.find((p) => p.id === slug);
  if (fromCatalog) return fromCatalog;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/products/${slug}`,
      { cache: "no-store" }
    );
    if (res.ok) return res.json();
  } catch {
    /* ignore */
  }
  return null;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main>
        <ProductDetail product={product} />
      </main>
      <Footer />
    </div>
  );
}
