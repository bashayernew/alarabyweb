import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { productToJson } from "@/lib/api-helpers";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { category: "asc" },
    });
    return NextResponse.json(products.map(productToJson));
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
