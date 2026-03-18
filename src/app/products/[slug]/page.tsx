import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductDetail from "@/components/sections/ProductDetail";
import { prisma } from "@/lib/db";
import { productToJson } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      select: { slug: true },
    });
    return products.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await prisma.product.findFirst({
      where: { slug, isActive: true },
    });
    if (!product) return { title: "Product" };
    return {
      title: product.titleEn,
      description: product.shortDescriptionEn,
    };
  } catch {
    return { title: "Product" };
  }
}

async function getProduct(slug: string) {
  try {
    const product = await prisma.product.findFirst({
      where: { slug, isActive: true },
    });
    return product ? productToJson(product) : null;
  } catch {
    return null;
  }
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
