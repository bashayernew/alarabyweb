import { NextResponse } from "next/server";
import { requireExport } from "@/lib/auth-helpers";
import { createActivityLog, getRequestMeta } from "@/lib/activity-log";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const auth = await requireExport();
  if (auth.res) return auth.res;
  const meta = getRequestMeta(req);
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
        "Date,Product (EN),Product (AR),Customer,Email,Phone,Area,Status,Message,Language",
        ...orders.map(
          (o) =>
            [
              o.createdAt.toISOString(),
              o.product.titleEn,
              o.product.titleAr,
              `"${(o.customerName ?? "").replace(/"/g, '""')}"`,
              o.email ?? "",
              o.phone,
              o.area ?? "",
              o.status,
              `"${(o.message ?? "").replace(/"/g, '""')}"`,
              o.language,
            ].join(",")
        ),
      ].join("\n");
      const requestsCsv = [
        "Date,Service (EN),Service (AR),Customer,Email,Phone,Area,Status,Message,Language",
        ...requests.map(
          (r) =>
            [
              r.createdAt.toISOString(),
              r.service.titleEn,
              r.service.titleAr,
              `"${(r.customerName ?? "").replace(/"/g, '""')}"`,
              r.email ?? "",
              r.phone,
              r.area ?? "",
              r.status,
              `"${(r.message ?? "").replace(/"/g, '""')}"`,
              r.language,
            ].join(",")
        ),
      ].join("\n");
      const combined = `Product Orders\n${ordersCsv}\n\nService Requests\n${requestsCsv}`;
      await createActivityLog({
        user: auth.user,
        action: "export",
        module: "export",
        details: { format: "csv", ordersCount: orders.length, requestsCount: requests.length },
        ...meta,
      });
      return new NextResponse(combined, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": "attachment; filename=aqua-systems-export.csv",
        },
      });
    }

    await createActivityLog({
      user: auth.user,
      action: "export",
      module: "export",
      details: { format: "json", ordersCount: orders.length, requestsCount: requests.length },
      ...meta,
    });
    return NextResponse.json({ orders, requests });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to export records" },
      { status: 500 }
    );
  }
}
