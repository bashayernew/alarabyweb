import { redirect } from "next/navigation";
import { getSessionWithUser } from "@/lib/auth-helpers";
import { AdminLayoutShell } from "@/components/admin/AdminLayoutShell";
import { AdminUserProvider } from "@/components/admin/AdminUserContext";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const result = await getSessionWithUser();
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
