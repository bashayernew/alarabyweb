import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireWrite } from "@/lib/auth-helpers";
import { prisma } from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  id: z.string().min(1),
  direction: z.enum(["up", "down"]),
});

export async function POST(req: NextRequest) {
  const auth = await requireWrite();
  if (auth.res) return auth.res;
  try {
    const body = await req.json();
    const { id, direction } = schema.parse(body);
    const products = await prisma.product.findMany({
      orderBy: { sortOrder: "asc" },
      select: { id: true, sortOrder: true },
    });
    const idx = products.findIndex((p) => p.id === id);
    if (idx < 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= products.length) {
      return NextResponse.json({ success: true });
    }
    const [a, b] = [products[idx], products[swapIdx]];
    await prisma.$transaction([
      prisma.product.update({ where: { id: a.id }, data: { sortOrder: b.sortOrder } }),
      prisma.product.update({ where: { id: b.id }, data: { sortOrder: a.sortOrder } }),
    ]);
    revalidatePath("/");
    revalidatePath("/products");
    return NextResponse.json({ success: true });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { error: e.errors.map((x) => x.message).join(", ") },
        { status: 400 }
      );
    }
    console.error(e);
    return NextResponse.json(
      { error: "Failed to reorder" },
      { status: 500 }
    );
  }
}
