import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAuth, requireWrite } from "@/lib/auth-helpers";
import { createActivityLog, buildChangeDetails, getRequestMeta } from "@/lib/activity-log";
import { prisma } from "@/lib/db";
import { z } from "zod";

function revalidateProductPages(slug?: string) {
  revalidatePath("/");
  revalidatePath("/products");
  if (slug) revalidatePath(`/products/${slug}`);
}

const updateProductSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/).optional(),
  image: z.string().optional(),
  price: z.number().optional().nullable(),
  titleEn: z.string().optional(),
  titleAr: z.string().optional(),
  subtitleEn: z.string().optional(),
  subtitleAr: z.string().optional(),
  shortDescriptionEn: z.string().optional(),
  shortDescriptionAr: z.string().optional(),
  fullDescriptionEn: z.string().optional(),
  fullDescriptionAr: z.string().optional(),
  warrantyEn: z.string().optional(),
  warrantyAr: z.string().optional(),
  featuresEn: z.string().optional(),
  featuresAr: z.string().optional(),
  specsEn: z.string().optional().nullable(),
  specsAr: z.string().optional().nullable(),
  category: z.string().optional(),
  badgeEn: z.string().optional().nullable(),
  badgeAr: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  sortOrder: z.number().optional(),
});

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth();
  if (auth.res) return auth.res;
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireWrite();
  if (auth.res) return auth.res;
  const meta = getRequestMeta(req);
  try {
    const { id } = await params;
    const body = await req.json();
    const data = updateProductSchema.parse(body);
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    if (data.slug && data.slug !== existing.slug) {
      const slugExists = await prisma.product.findUnique({ where: { slug: data.slug } });
      if (slugExists) {
        return NextResponse.json(
          { error: "Product with this slug already exists" },
          { status: 400 }
        );
      }
    }
    if (data.isFeatured === true) {
      await prisma.product.updateMany({
        where: { id: { not: id } },
        data: { isFeatured: false },
      });
    }
    const changes: Array<{ field: string; oldValue: unknown; newValue: unknown }> = [];
    if (data.titleEn !== undefined && data.titleEn !== existing.titleEn)
      changes.push({ field: "titleEn", oldValue: existing.titleEn, newValue: data.titleEn });
    if (data.titleAr !== undefined && data.titleAr !== existing.titleAr)
      changes.push({ field: "titleAr", oldValue: existing.titleAr, newValue: data.titleAr });
    if (data.slug !== undefined && data.slug !== existing.slug)
      changes.push({ field: "slug", oldValue: existing.slug, newValue: data.slug });
    console.log("[admin/products/update] payload:", JSON.stringify(data));
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(data.slug !== undefined && { slug: data.slug }),
        ...(data.image !== undefined && data.image !== "" && { image: data.image }),
        ...(data.price !== undefined && { price: data.price }),
        ...(data.titleEn !== undefined && { titleEn: data.titleEn }),
        ...(data.titleAr !== undefined && { titleAr: data.titleAr }),
        ...(data.subtitleEn !== undefined && { subtitleEn: data.subtitleEn }),
        ...(data.subtitleAr !== undefined && { subtitleAr: data.subtitleAr }),
        ...(data.shortDescriptionEn !== undefined && { shortDescriptionEn: data.shortDescriptionEn }),
        ...(data.shortDescriptionAr !== undefined && { shortDescriptionAr: data.shortDescriptionAr }),
        ...(data.fullDescriptionEn !== undefined && { fullDescriptionEn: data.fullDescriptionEn }),
        ...(data.fullDescriptionAr !== undefined && { fullDescriptionAr: data.fullDescriptionAr }),
        ...(data.warrantyEn !== undefined && { warrantyEn: data.warrantyEn }),
        ...(data.warrantyAr !== undefined && { warrantyAr: data.warrantyAr }),
        ...(data.featuresEn !== undefined && { featuresEn: data.featuresEn }),
        ...(data.featuresAr !== undefined && { featuresAr: data.featuresAr }),
        ...(data.specsEn !== undefined && { specsEn: data.specsEn }),
        ...(data.specsAr !== undefined && { specsAr: data.specsAr }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.badgeEn !== undefined && { badgeEn: data.badgeEn }),
        ...(data.badgeAr !== undefined && { badgeAr: data.badgeAr }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
        ...(data.isFeatured !== undefined && { isFeatured: data.isFeatured }),
        ...(data.sortOrder !== undefined && { sortOrder: data.sortOrder }),
      },
    });
    await createActivityLog({
      user: auth.user,
      action: "update",
      module: "products",
      itemId: product.id,
      itemLabel: product.titleEn || product.titleAr,
      details: changes.length > 0 ? buildChangeDetails(changes) : undefined,
      ...meta,
    });
    console.log("[admin/products/update] db result: id=", product.id, "slug=", product.slug);
    revalidateProductPages(product.slug);
    if (data.slug && data.slug !== existing.slug) {
      revalidatePath(`/products/${existing.slug}`);
    }
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
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireWrite();
  if (auth.res) return auth.res;
  const meta = getRequestMeta(req);
  try {
    const { id } = await params;
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    await prisma.product.delete({ where: { id } });
    await createActivityLog({
      user: auth.user,
      action: "delete",
      module: "products",
      itemId: id,
      itemLabel: existing.titleEn || existing.titleAr,
      ...meta,
    });
    revalidateProductPages(existing.slug);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
