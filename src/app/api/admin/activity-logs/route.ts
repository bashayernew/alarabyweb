import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSuperAdmin } from "@/lib/auth-helpers";

export async function GET(req: NextRequest) {
  const auth = await requireSuperAdmin();
  if (auth.res) return auth.res;

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const role = searchParams.get("role");
  const action = searchParams.get("action");
  const moduleFilter = searchParams.get("module");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const search = searchParams.get("search");
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "100", 10), 500);
  const offset = parseInt(searchParams.get("offset") ?? "0", 10);

  try {
    // Build WHERE conditions for raw SQL (PostgreSQL uses $1, $2, ...)
    const conditions: string[] = [];
    const params: (string | number)[] = [];

    if (userId) {
      conditions.push(`"userId" = $${params.length + 1}`);
      params.push(userId);
    }
    if (role) {
      conditions.push(`"userRole" = $${params.length + 1}`);
      params.push(role);
    }
    if (action) {
      conditions.push(`action = $${params.length + 1}`);
      params.push(action);
    }
    if (moduleFilter) {
      conditions.push(`module = $${params.length + 1}`);
      params.push(moduleFilter);
    }
    if (from) {
      conditions.push(`"createdAt" >= $${params.length + 1}`);
      params.push(new Date(from).toISOString());
    }
    if (to) {
      conditions.push(`"createdAt" <= $${params.length + 1}`);
      params.push(new Date(to).toISOString());
    }
    if (search?.trim()) {
      const searchVal = `%${search.trim()}%`;
      conditions.push(`("userEmail" LIKE $${params.length + 1} OR "userName" LIKE $${params.length + 2} OR "itemLabel" LIKE $${params.length + 3})`);
      params.push(searchVal, searchVal, searchVal);
    }

    const whereClause = conditions.length > 0 ? conditions.join(" AND ") : "1=1";
    const limitIdx = params.length + 1;
    const offsetIdx = params.length + 2;

    const logs = await prisma.$queryRawUnsafe<
      Array<{
        id: string;
        userId: string;
        userEmail: string;
        userName: string | null;
        userRole: string;
        action: string;
        module: string;
        itemId: string | null;
        itemLabel: string | null;
        details: string | null;
        ipAddress: string | null;
        userAgent: string | null;
        createdAt: string;
      }>
    >(
      `SELECT id, "userId", "userEmail", "userName", "userRole", action, module, "itemId", "itemLabel", details, "ipAddress", "userAgent", "createdAt"
       FROM "ActivityLog"
       WHERE ${whereClause}
       ORDER BY "createdAt" DESC
       LIMIT $${limitIdx} OFFSET $${offsetIdx}`,
      ...params,
      limit,
      offset
    );

    const countResult = await prisma.$queryRawUnsafe<Array<{ count: bigint }>>(
      `SELECT COUNT(*) as count FROM "ActivityLog" WHERE ${whereClause}`,
      ...params
    );
    const total = Number(countResult[0]?.count ?? 0);

    return NextResponse.json({
      logs: logs.map((l) => ({
        id: l.id,
        userId: l.userId,
        userEmail: l.userEmail,
        userName: l.userName,
        userRole: l.userRole,
        action: l.action,
        module: l.module,
        itemId: l.itemId,
        itemLabel: l.itemLabel,
        details: l.details ? (() => { try { return JSON.parse(l.details!); } catch { return null; } })() : null,
        ipAddress: l.ipAddress,
        userAgent: l.userAgent,
        createdAt: typeof l.createdAt === "string" ? l.createdAt : new Date(l.createdAt).toISOString(),
      })),
      total,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch activity logs" },
      { status: 500 }
    );
  }
}
