import { NextRequest, NextResponse } from "next/server";
import { productToJson } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const { prisma } = await import("@/lib/db");
    const { searchParams } = new URL(req.url);
    const hero = searchParams.get("hero") === "1";

    if (hero) {
      try {
        // Prefer heating system products for hero (not shower filters, etc.)
        const heaterCategories = ["heater", "heater-system"];
        let product = await prisma.product.findFirst({
          where: { isActive: true, isFeatured: true, category: { in: heaterCategories } },
          orderBy: { sortOrder: "asc" },
        });
        if (!product) {
          product = await prisma.product.findFirst({
            where: { isActive: true, category: { in: heaterCategories } },
            orderBy: { sortOrder: "asc" },
          });
        }
        if (!product) {
          product = await prisma.product.findFirst({
            where: { isActive: true, isFeatured: true },
            orderBy: { sortOrder: "asc" },
          });
        }
        if (!product) {
          product = await prisma.product.findFirst({
            where: { isActive: true },
            orderBy: { sortOrder: "asc" },
          });
        }
        const res = NextResponse.json(product ? productToJson(product) : null);
        res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
        return res;
      } catch (heroErr) {
        // Hero fetch fails (DB not ready, no products, etc.) → return null so Hero shows fallback image
        console.warn("[api/products] hero fetch failed:", heroErr);
        const res = NextResponse.json(null);
        res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
        return res;
      }
    }

    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { category: "asc" }],
    });
    const res = NextResponse.json(products.map(productToJson));
    res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    return res;
  } catch (e) {
    console.error("[api/products]", e);
    return NextResponse.json([], { status: 500 });
  }
}
