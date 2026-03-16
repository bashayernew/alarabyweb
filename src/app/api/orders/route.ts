import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const orderSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  productSlug: z.string().optional(),
  customerName: z.string().min(1, "Name is required").max(200),
  email: z.union([z.string().email("Invalid email"), z.literal("")]).optional(),
  phone: z.string().min(1, "Phone is required").max(50),
  area: z.string().max(200).optional(),
  message: z.string().max(2000).optional(),
  language: z.enum(["en", "ar"]).optional().default("en"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = orderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const { productId, productSlug, customerName, email, phone, area, message, language } =
      parsed.data;

    const product = await prisma.product.findFirst({
      where: productSlug
        ? { slug: productSlug }
        : { OR: [{ id: productId }, { slug: productId }] },
    });
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    await prisma.productOrder.create({
      data: {
        productId: product.id,
        customerName,
        email: email && email.trim() ? email.trim() : null,
        phone,
        area: area && area.trim() ? area.trim() : null,
        message: message ?? null,
        language,
      },
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
