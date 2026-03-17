import { NextRequest, NextResponse } from "next/server";
import { productToJson } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  try {
    const { prisma } = await import("@/lib/db");
    const { searchParams } = new URL(req.url);
    const hero = searchParams.get("hero") === "1";

    if (hero) {
      try {
        let product = await prisma.product.findFirst({
          where: { isActive: true, isFeatured: true },
          orderBy: { sortOrder: "asc" },
        });
        if (!product) {
          product = await prisma.product.findFirst({
            where: { isActive: true },
            orderBy: { sortOrder: "asc" },
          });
        }
        return NextResponse.json(product ? productToJson(product) : null);
      } catch (heroErr) {
        // Hero fetch fails (DB not ready, no products, etc.) → return null so Hero shows fallback image
        console.warn("[api/products] hero fetch failed:", heroErr);
        return NextResponse.json(null);
      }
    }

    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { category: "asc" }],
    });
    return NextResponse.json(products.map(productToJson));
  } catch (e) {
    console.error("[api/products]", e);
    return NextResponse.json([], { status: 500 });
  }
}
