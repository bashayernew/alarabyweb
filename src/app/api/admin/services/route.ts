import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAuth, requireWrite } from "@/lib/auth-helpers";
import { createActivityLog, getRequestMeta } from "@/lib/activity-log";
import { prisma } from "@/lib/db";
import { z } from "zod";

const createServiceSchema = z.object({
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  image: z.string().optional().nullable(),
  category: z.string().min(1),
  titleEn: z.string().min(1, "Title (EN) is required"),
  titleAr: z.string().min(1, "Title (AR) is required"),
  subtitleEn: z.string().optional().nullable(),
  subtitleAr: z.string().optional().nullable(),
  descriptionEn: z.string().min(1),
  descriptionAr: z.string().min(1),
  optionsEn: z.string().optional().nullable(),
  optionsAr: z.string().optional().nullable(),
  isActive: z.boolean().optional().default(true),
  sortOrder: z.number().optional().default(0),
});

export async function GET() {
  const auth = await requireAuth();
  if (auth.res) return auth.res;
  try {
    const services = await prisma.service.findMany({
      orderBy: [{ sortOrder: "asc" }, { category: "asc" }],
    });
    return NextResponse.json(services);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch services" },
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
    const data = createServiceSchema.parse(body);
    const existing = await prisma.service.findUnique({ where: { slug: data.slug } });
    if (existing) {
      return NextResponse.json(
        { error: "Service with this slug already exists" },
        { status: 400 }
      );
    }
    const service = await prisma.service.create({
      data: {
        slug: data.slug,
        image: data.image ?? null,
        category: data.category,
        titleEn: data.titleEn,
        titleAr: data.titleAr,
        subtitleEn: data.subtitleEn ?? null,
        subtitleAr: data.subtitleAr ?? null,
        descriptionEn: data.descriptionEn,
        descriptionAr: data.descriptionAr,
        optionsEn: data.optionsEn ?? null,
        optionsAr: data.optionsAr ?? null,
        isActive: data.isActive ?? true,
        sortOrder: data.sortOrder ?? 0,
      },
    });
    await createActivityLog({
      user: auth.user,
      action: "create",
      module: "services",
      itemId: service.id,
      itemLabel: service.titleEn || service.titleAr,
      details: { slug: service.slug },
      ...meta,
    });
    revalidatePath("/");
    revalidatePath("/services");
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
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}
