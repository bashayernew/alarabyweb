import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAuth, requireWrite } from "@/lib/auth-helpers";
import { createActivityLog, getRequestMeta } from "@/lib/activity-log";
import { prisma } from "@/lib/db";
import { z } from "zod";

const createSchema = z.object({
  titleEn: z.string().min(1, "Title (EN) is required"),
  titleAr: z.string().min(1, "Title (AR) is required"),
  descriptionEn: z.string().min(1, "Description (EN) is required"),
  descriptionAr: z.string().min(1, "Description (AR) is required"),
  icon: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  isActive: z.boolean().optional().default(true),
  displayOrder: z.number().optional().default(0),
});

export async function GET() {
  const auth = await requireAuth();
  if (auth.res) return auth.res;
  try {
    const services = await prisma.maintenanceService.findMany({
      orderBy: [{ displayOrder: "asc" }, { titleEn: "asc" }],
    });
    return NextResponse.json(services);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch maintenance services" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireWrite();
  if (auth.res) return auth.res;
  const meta = getRequestMeta(req);
  try {
    const body = await req.json();
    const data = createSchema.parse(body);
    const service = await prisma.maintenanceService.create({
      data: {
        titleEn: data.titleEn,
        titleAr: data.titleAr,
        descriptionEn: data.descriptionEn,
        descriptionAr: data.descriptionAr,
        icon: data.icon ?? null,
        image: data.image ?? null,
        category: data.category ?? null,
        isActive: data.isActive ?? true,
        displayOrder: data.displayOrder ?? 0,
      },
    });
    await createActivityLog({
      user: auth.user,
      action: "create",
      module: "maintenance_services",
      itemId: service.id,
      itemLabel: service.titleEn || service.titleAr,
      ...meta,
    });
    revalidatePath("/");
    revalidatePath("/maintenance");
    return NextResponse.json(service);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { error: e.errors.map((x) => x.message).join(", ") },
        { status: 400 }
      );
    }
    console.error(e);
    return NextResponse.json(
      { error: "Failed to create maintenance service" },
      { status: 500 }
    );
  }
}
