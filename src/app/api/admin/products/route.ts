import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAuth, requireWrite } from "@/lib/auth-helpers";
import { createActivityLog } from "@/lib/activity-log";
import { getRequestMeta } from "@/lib/activity-log";
import { prisma } from "@/lib/db";
import { z } from "zod";

const createProductSchema = z.object({
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  image: z.string().min(1, "Image is required"),
  price: z.number().optional().nullable(),
  titleEn: z.string().min(1, "Title (EN) is required"),
  titleAr: z.string().min(1, "Title (AR) is required"),
  subtitleEn: z.string().min(1),
  subtitleAr: z.string().min(1),
  shortDescriptionEn: z.string().min(1),
  shortDescriptionAr: z.string().min(1),
  fullDescriptionEn: z.string().min(1),
  fullDescriptionAr: z.string().min(1),
  warrantyEn: z.string().min(1),
  warrantyAr: z.string().min(1),
  featuresEn: z.string(), // JSON array
  featuresAr: z.string(),
  specsEn: z.string().optional().nullable(),
  specsAr: z.string().optional().nullable(),
  category: z.string().min(1),
  badgeEn: z.string().optional().nullable(),
  badgeAr: z.string().optional().nullable(),
  isActive: z.boolean().optional().default(true),
  isFeatured: z.boolean().optional().default(false),
  sortOrder: z.number().optional().default(0),
});

export async function GET() {
  const auth = await requireAuth();
  if (auth.res) return auth.res;
  try {
    const products = await prisma.product.findMany({
      orderBy: [{ sortOrder: "asc" }, { category: "asc" }],
    });
    return NextResponse.json(products);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch products" },
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
    const data = createProductSchema.parse(body);
    const existing = await prisma.product.findUnique({ where: { slug: data.slug } });
    if (existing) {
      return NextResponse.json(
        { error: "Product with this slug already exists" },
        { status: 400 }
      );
    }
    const product = await prisma.product.create({
      data: {
        slug: data.slug,
        image: data.image,
        price: data.price ?? null,
        titleEn: data.titleEn,
        titleAr: data.titleAr,
        subtitleEn: data.subtitleEn,
        subtitleAr: data.subtitleAr,
        shortDescriptionEn: data.shortDescriptionEn,
        shortDescriptionAr: data.shortDescriptionAr,
        fullDescriptionEn: data.fullDescriptionEn,
        fullDescriptionAr: data.fullDescriptionAr,
        warrantyEn: data.warrantyEn,
        warrantyAr: data.warrantyAr,
        featuresEn: data.featuresEn,
        featuresAr: data.featuresAr,
        specsEn: data.specsEn ?? null,
        specsAr: data.specsAr ?? null,
        category: data.category,
        badgeEn: data.badgeEn ?? null,
        badgeAr: data.badgeAr ?? null,
        isActive: data.isActive ?? true,
        isFeatured: data.isFeatured ?? false,
        sortOrder: data.sortOrder ?? 0,
      },
    });
    await createActivityLog({
      user: auth.user,
      action: "create",
      module: "products",
      itemId: product.id,
      itemLabel: product.titleEn || product.titleAr,
      details: { slug: product.slug },
      ...meta,
    });
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath(`/products/${product.slug}`);
    return NextResponse.json(product);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { error: e.errors.map((x) => x.message).join(", ") },
        { status: 400 }
      );
    }
    console.error(e);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
