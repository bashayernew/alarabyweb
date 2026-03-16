import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const orderSchema = z.object({
  serviceId: z.string().min(1, "Service is required"),
  customerName: z.string().min(1, "Name is required").max(200),
  customerPhone: z.string().min(1, "Phone is required").max(50),
  customerEmail: z
    .union([z.string().email("Invalid email"), z.literal("")])
    .optional(),
  address: z.string().max(500).optional(),
  area: z.string().max(200).optional(),
  preferredDate: z.string().max(50).optional(),
  preferredTime: z.string().max(50).optional(),
  notes: z.string().max(2000).optional(),
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
    const {
      serviceId,
      customerName,
      customerPhone,
      customerEmail,
      address,
      area,
      preferredDate,
      preferredTime,
      notes,
      language,
    } = parsed.data;

    const service = await prisma.maintenanceService.findFirst({
      where: {
        OR: [{ id: serviceId }],
        isActive: true,
      },
    });
    if (!service) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    await prisma.maintenanceOrder.create({
      data: {
        serviceId: service.id,
        serviceTitleAr: service.titleAr,
        serviceTitleEn: service.titleEn,
        customerName,
        customerPhone,
        customerEmail: customerEmail?.trim() || null,
        address: address?.trim() || null,
        area: area?.trim() || null,
        preferredDate: preferredDate?.trim() || null,
        preferredTime: preferredTime?.trim() || null,
        notes: notes?.trim() || null,
        language,
      },
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to create maintenance order" },
      { status: 500 }
    );
  }
}
