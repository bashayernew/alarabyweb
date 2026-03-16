import { prisma } from "@/lib/db";
import type { SessionUser } from "./auth-helpers";
import type { NextRequest } from "next/server";

export function getRequestMeta(req?: NextRequest | Request | null): {
  ipAddress: string | null;
  userAgent: string | null;
} {
  if (!req || !("headers" in req)) return { ipAddress: null, userAgent: null };
  const headers = req.headers;
  const ip =
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headers.get("x-real-ip") ??
    null;
  const ua = headers.get("user-agent");
  return { ipAddress: ip, userAgent: ua };
}

export type Action =
  | "create"
  | "update"
  | "delete"
  | "export"
  | "sign_in"
  | "sign_out"
  | "activate"
  | "deactivate";

export type Module =
  | "products"
  | "services"
  | "offers"
  | "offer_requests"
  | "maintenance_services"
  | "maintenance_orders"
  | "orders"
  | "requests"
  | "users"
  | "export"
  | "auth";

export interface CreateActivityLogParams {
  user: SessionUser;
  action: Action;
  module: Module;
  itemId?: string | null;
  itemLabel?: string | null;
  details?: Record<string, unknown> | null;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export async function createActivityLog(params: CreateActivityLogParams): Promise<void> {
  try {
    await prisma.activityLog.create({
      data: {
        userId: params.user.id,
        userEmail: params.user.email ?? "unknown",
        userName: params.user.name ?? null,
        userRole: params.user.role,
        action: params.action,
        module: params.module,
        itemId: params.itemId ?? null,
        itemLabel: params.itemLabel ?? null,
        details: params.details ? JSON.stringify(params.details) : null,
        ipAddress: params.ipAddress ?? null,
        userAgent: params.userAgent ?? null,
      },
    });
  } catch (e) {
    console.error("[activity-log] Failed to create log:", e);
  }
}

/**
 * Build details object for field-level change tracking.
 */
export function buildChangeDetails(
  changes: Array<{ field: string; oldValue: unknown; newValue: unknown }>
): Record<string, { old: unknown; new: unknown }> {
  const details: Record<string, { old: unknown; new: unknown }> = {};
  for (const c of changes) {
    details[c.field] = { old: c.oldValue, new: c.newValue };
  }
  return details;
}
