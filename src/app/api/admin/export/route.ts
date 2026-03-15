import { NextResponse } from "next/server";
import { getSession } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format") ?? "json";

  try {
    const [orders, requests] = await Promise.all([
      prisma.productOrder.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          product: {
            select: {
              slug: true,
              titleEn: true,
              titleAr: true,
            },
          },
        },
      }),
      prisma.serviceRequest.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          service: {
            select: {
              slug: true,
              titleEn: true,
              titleAr: true,
            },
          },
        },
      }),
    ]);

    if (format === "csv") {
      const ordersCsv = [
        "Date,Product (EN),Product (AR),Customer,Email,Phone,Message,Language",
        ...orders.map(
          (o) =>
            [
              o.createdAt.toISOString(),
              o.product.titleEn,
              o.product.titleAr,
              `"${(o.customerName ?? "").replace(/"/g, '""')}"`,
              o.email,
              o.phone,
              `"${(o.message ?? "").replace(/"/g, '""')}"`,
              o.language,
            ].join(",")
        ),
      ].join("\n");
      const requestsCsv = [
        "Date,Service (EN),Service (AR),Customer,Email,Phone,Message,Language",
        ...requests.map(
          (r) =>
            [
              r.createdAt.toISOString(),
              r.service.titleEn,
              r.service.titleAr,
              `"${(r.customerName ?? "").replace(/"/g, '""')}"`,
              r.email,
              r.phone,
              `"${(r.message ?? "").replace(/"/g, '""')}"`,
              r.language,
            ].join(",")
        ),
      ].join("\n");
      const combined = `Product Orders\n${ordersCsv}\n\nService Requests\n${requestsCsv}`;
      return new NextResponse(combined, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": "attachment; filename=aqua-systems-export.csv",
        },
      });
    }

    return NextResponse.json({ orders, requests });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to export records" },
      { status: 500 }
    );
  }
}
