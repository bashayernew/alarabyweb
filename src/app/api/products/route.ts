import { NextResponse } from "next/server";
import { productToJson } from "@/lib/api-helpers";
import { catalogProducts } from "@/content/products";

export async function GET() {
  try {
    const { prisma } = await import("@/lib/db");
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { category: "asc" }],
    });
    return NextResponse.json(products.map(productToJson));
  } catch (e) {
    console.error("[api/products] Database unavailable, falling back to static catalog:", e);
    return NextResponse.json(catalogProducts);
  }
}
