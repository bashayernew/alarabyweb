"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Wrench,
  Tag,
  FileText,
  Settings,
  ClipboardList,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  Users,
  ScrollText,
} from "lucide-react";
import { useAdminLanguage } from "@/hooks/useAdminLanguage";
import { AdminLanguageSwitcher } from "./AdminLanguageSwitcher";

const BASE_SIDEBAR_LINKS = [
  { href: "/admin", key: "nav.dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", key: "nav.products", icon: Package },
  { href: "/admin/services", key: "nav.services", icon: Wrench },
  { href: "/admin/offers", key: "nav.offers", icon: Tag },
  { href: "/admin/offer-requests", key: "nav.offerRequests", icon: FileText },
  { href: "/admin/maintenance-services", key: "nav.maintenance", icon: Settings },
  { href: "/admin/maintenance-orders", key: "nav.maintenanceOrders", icon: ClipboardList },
  { href: "/admin/users", key: "nav.users", icon: "Users" as const, superAdminOnly: true },
  { href: "/admin/activity-logs", key: "nav.activityLogs", icon: "ScrollText" as const, superAdminOnly: true },
];

type AdminLayoutShellProps = {
  children: React.ReactNode;
  userEmail: string;
  userName?: string;
  userRole?: string;
};

const SUPER_ADMIN_ICONS = { Users, ScrollText } as const;

export function AdminLayoutShell({ children, userEmail, userName, userRole }: AdminLayoutShellProps) {
  const { t, isRTL } = useAdminLanguage();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isSuperAdmin = userRole === "super_admin" || userRole === "admin";

  return (
    <div className="flex min-h-screen bg-slate-50" dir={isRTL ? "rtl" : "ltr"}>
      {/* Sidebar backdrop (mobile) */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/50 lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 z-50 w-64 transform border-slate-200 bg-white shadow-xl transition-transform duration-200 ease-out lg:static lg:translate-x-0 lg:shadow-none ${
          isRTL ? "right-0 border-l" : "left-0 border-r"
        } ${sidebarOpen ? "translate-x-0" : isRTL ? "translate-x-full" : "-translate-x-full"}`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 lg:justify-center">
            <Link
              href="/admin"
              className="flex items-center gap-2 text-lg font-bold text-slate-800"
            >
              <LayoutDashboard className="h-6 w-6 text-primary-600" />
              <span>{t("common.admin")}</span>
            </Link>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-0.5">
              {BASE_SIDEBAR_LINKS.filter((item) => !(item as { superAdminOnly?: boolean }).superAdminOnly || isSuperAdmin).map((item) => {
                const Icon = typeof item.icon === "string" ? SUPER_ADMIN_ICONS[item.icon] : item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      title={t(item.key)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        (item.exact ? pathname === item.href : pathname.startsWith(item.href) && item.href !== "/admin")
                          ? "bg-primary-50 text-primary-700"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 shrink-0 ${
                          (item.exact ? pathname === item.href : pathname.startsWith(item.href) && item.href !== "/admin")
                            ? "text-primary-600"
                            : "text-slate-400"
                        }`}
                      />
                      <span className="flex-1">{t(item.key)}</span>
                      {(item.exact ? pathname === item.href : pathname.startsWith(item.href) && item.href !== "/admin") && (
                        <ChevronRight className={`h-4 w-4 shrink-0 text-primary-600 ${isRTL ? "rotate-180" : ""}`} />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 shadow-sm lg:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-3">
            <AdminLanguageSwitcher />
            <div className={`hidden max-w-[220px] sm:block ${isRTL ? "text-right" : "text-left"}`}>
              <p className="truncate text-sm font-medium text-slate-700">
                {userName || userEmail}
              </p>
              {userRole && (
                <p className="text-xs text-slate-500 capitalize">
                  {userRole.replace("_", " ")}
                </p>
              )}
            </div>
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.viewSite")}</span>
            </Link>
            <Link
              href="/api/auth/signout"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">{t("common.signOut")}</span>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
