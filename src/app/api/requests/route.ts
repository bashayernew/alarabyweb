import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { handleApiError } from "@/lib/api-error";

export const dynamic = "force-dynamic";

const requestSchema = z.object({
  serviceId: z.string().min(1, "Service is required"),
  serviceSlug: z.string().optional(),
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
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const {
      serviceId,
      serviceSlug,
      customerName,
      email,
      phone,
      area,
      message,
      language,
    } = parsed.data;

    const service = await prisma.service.findFirst({
      where: serviceSlug
        ? { slug: serviceSlug }
        : { OR: [{ id: serviceId }, { slug: serviceId }] },
    });
    if (!service) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    await prisma.serviceRequest.create({
      data: {
        serviceId: service.id,
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
    return handleApiError(e, "api/requests", "Failed to create request");
  }
}
