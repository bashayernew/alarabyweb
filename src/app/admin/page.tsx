import { redirect } from "next/navigation";
import { getSession } from "@/auth";
import Link from "next/link";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/admin/login?callbackUrl=/admin");
  }
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-800">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">{session.user.email}</span>
            <Link
              href="/api/auth/signout"
              className="text-sm text-primary-600 hover:underline"
            >
              Sign out
            </Link>
            <Link
              href="/"
              className="text-sm text-slate-500 hover:text-slate-700"
            >
              ← Site
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <AdminDashboard />
      </main>
    </div>
  );
}
