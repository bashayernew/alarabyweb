import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export type UserRole = "super_admin" | "editor" | "viewer";

export const ROLES = {
  super_admin: "super_admin",
  editor: "editor",
  viewer: "viewer",
} as const;

export function isSuperAdmin(role: string): boolean {
  return role === "super_admin" || role === "admin"; // legacy admin = super_admin
}

export function isEditorOrAbove(role: string): boolean {
  return isSuperAdmin(role) || role === "editor";
}

export function canWrite(role: string): boolean {
  return isEditorOrAbove(role);
}

export function canManageUsers(role: string): boolean {
  return isSuperAdmin(role);
}

export function canViewLogs(role: string): boolean {
  return isSuperAdmin(role);
}

export function canExport(role: string): boolean {
  return isSuperAdmin(role) || role === "editor";
}

export interface SessionUser {
  id: string;
  email: string | null;
  name: string | null;
  role: string;
}

export async function getSessionWithUser(): Promise<{
  session: { user: SessionUser };
  user: SessionUser;
} | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, email: true, name: true, role: true, isActive: true },
  });
  if (!dbUser || !dbUser.isActive) return null;

  // Normalize legacy "admin" to "super_admin"
  const role = dbUser.role === "admin" ? "super_admin" : dbUser.role;

  const user: SessionUser = {
    id: dbUser.id,
    email: dbUser.email,
    name: dbUser.name,
    role,
  };

  return {
    session: { user: { ...session.user, ...user } },
    user,
  };
}

export type AllowedRoles = UserRole | UserRole[];

/**
 * Use in API routes to require specific roles. Returns 401/403 if not allowed.
 */
export async function requireAuth(
  allowedRoles?: AllowedRoles
): Promise<{ user: SessionUser; res: null } | { user: null; res: NextResponse }> {
  const result = await getSessionWithUser();
  if (!result) {
    return {
      user: null,
      res: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  if (allowedRoles) {
    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    if (!roles.includes(result.user.role as UserRole)) {
      return {
        user: null,
        res: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
      };
    }
  }

  return { user: result.user, res: null };
}

/**
 * Require write access. Any authenticated admin user can edit (viewer, editor, super_admin).
 */
export async function requireWrite(): Promise<
  { user: SessionUser; res: null } | { user: null; res: NextResponse }
> {
  return requireAuth();
}

/**
 * Require export permission (super_admin or editor). Viewer cannot export.
 */
export async function requireExport(): Promise<
  { user: SessionUser; res: null } | { user: null; res: NextResponse }
> {
  return requireAuth(["super_admin", "editor"]);
}

/**
 * Require super admin only. Use for user management, activity logs.
 */
export async function requireSuperAdmin(): Promise<
  { user: SessionUser; res: null } | { user: null; res: NextResponse }
> {
  return requireAuth("super_admin");
}
