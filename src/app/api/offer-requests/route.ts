import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { handleApiError } from "@/lib/api-error";

export const dynamic = "force-dynamic";

const requestSchema = z.object({
  offerId: z.string().min(1, "Offer is required"),
  customerName: z.string().min(1, "Name is required").max(200),
  customerPhone: z.string().min(1, "Phone is required").max(50),
  customerEmail: z
    .union([z.string().email("Invalid email"), z.literal("")])
    .optional(),
  address: z.string().max(500).optional(),
  area: z.string().max(200).optional(),
  notes: z.string().max(2000).optional(),
  language: z.enum(["en", "ar"]).optional().default("en"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const {
      offerId,
      customerName,
      customerPhone,
      customerEmail,
      address,
      area,
      notes,
      language,
    } = parsed.data;

    const offer = await prisma.offer.findFirst({
      where: { id: offerId, isActive: true },
    });
    if (!offer) {
      return NextResponse.json(
        { error: "Offer not found" },
        { status: 404 }
      );
    }

    await prisma.offerRequest.create({
      data: {
        offerId: offer.id,
        offerTitleAr: offer.titleAr,
        offerTitleEn: offer.titleEn,
        customerName,
        customerPhone,
        customerEmail: customerEmail?.trim() || null,
        address: address?.trim() || null,
        area: area?.trim() || null,
        notes: notes?.trim() || null,
        language,
      },
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    return handleApiError(e, "api/offer-requests", "Failed to create offer request");
  }
}
