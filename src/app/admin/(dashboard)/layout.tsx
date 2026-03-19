import { redirect } from "next/navigation";
import { getSessionWithUser } from "@/lib/auth-helpers";
import { AdminLayoutShell } from "@/components/admin/AdminLayoutShell";
import { AdminUserProvider } from "@/components/admin/AdminUserContext";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let result;
  try {
    result = await getSessionWithUser();
  } catch (e) {
    console.error("[admin/layout] Unexpected error:", e);
    redirect("/admin/login?callbackUrl=/admin");
  }

  if (!result) {
    redirect("/admin/login?callbackUrl=/admin");
  }

  const { user } = result;

  return (
    <AdminUserProvider userRole={user.role}>
        <AdminLayoutShell
          userEmail={user.email ?? "Admin"}
          userName={user.name ?? undefined}
          userRole={user.role}
        >
          {children}
        </AdminLayoutShell>
      </AdminUserProvider>
  );
}
