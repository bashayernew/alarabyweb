import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { handleApiError } from "@/lib/api-error";

export const dynamic = "force-dynamic";

const orderSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  productSlug: z.string().optional(),
  customerName: z.string().max(200).optional(),
  name: z.string().max(200).optional(),
  email: z.union([z.string().email("Invalid email"), z.literal("")]).optional(),
  phone: z.string().min(1, "Phone is required").max(50),
  area: z.string().max(200).optional(),
  message: z.string().max(2000).optional(),
  notes: z.string().max(2000).optional(),
  language: z.enum(["en", "ar"]).optional().default("en"),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch (e) {
    console.error("[api/orders] Invalid JSON body:", e);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    const msg = parsed.error.errors.map((e) => e.message).join("; ");
    console.error("[api/orders] Validation failed:", parsed.error.flatten());
    return NextResponse.json(
      { error: "Validation failed", details: msg },
      { status: 400 }
    );
  }

  const parsedData = parsed.data;
  const customerName = (parsedData.customerName || parsedData.name || "").trim();
  const message = parsedData.message ?? parsedData.notes ?? null;
  const { productId, productSlug, email, phone, area, language } = parsedData;

  if (!customerName) {
    return NextResponse.json(
      { error: "Name is required" },
      { status: 400 }
    );
  }
  if (!phone.trim()) {
    return NextResponse.json(
      { error: "Phone is required" },
      { status: 400 }
    );
  }

  try {
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
        email: email && String(email).trim() ? String(email).trim() : null,
        phone: phone.trim(),
        area: area && String(area).trim() ? String(area).trim() : null,
        message: message && String(message).trim() ? String(message).trim() : null,
        status: "new",
        language: language ?? "en",
      },
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    return handleApiError(e, "api/orders", "Failed to create order");
  }
}
