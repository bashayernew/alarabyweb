"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Filter, Download } from "lucide-react";
import { AdminPageWrapper } from "@/components/admin/AdminPageWrapper";
import { useAdminLanguage } from "@/hooks/useAdminLanguage";

type LogItem = {
  id: string;
  userEmail: string;
  userName: string | null;
  userRole: string;
  action: string;
  module: string;
  itemId: string | null;
  itemLabel: string | null;
  details: Record<string, unknown> | null;
  createdAt: string;
};

export default function AdminActivityLogsPage() {
  const router = useRouter();
  const { t, isRTL, formatDate } = useAdminLanguage();
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    userId: "",
    role: "",
    action: "",
    module: "",
    from: "",
    to: "",
    search: "",
  });

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.userId) params.set("userId", filters.userId);
      if (filters.role) params.set("role", filters.role);
      if (filters.action) params.set("action", filters.action);
      if (filters.module) params.set("module", filters.module);
      if (filters.from) params.set("from", filters.from);
      if (filters.to) params.set("to", filters.to);
      if (filters.search) params.set("search", filters.search);
      params.set("limit", "100");

      const res = await fetch(`/api/admin/activity-logs?${params}`);
      if (res.status === 403) {
        router.push("/admin");
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setLogs(data.logs);
      setTotal(data.total);
    } catch {
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }, [filters.userId, filters.role, filters.action, filters.module, filters.from, filters.to, filters.search, router]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleExport = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.userId) params.set("userId", filters.userId);
      if (filters.role) params.set("role", filters.role);
      if (filters.action) params.set("action", filters.action);
      if (filters.module) params.set("module", filters.module);
      if (filters.from) params.set("from", filters.from);
      if (filters.to) params.set("to", filters.to);
      if (filters.search) params.set("search", filters.search);
      params.set("limit", "5000");

      const res = await fetch(`/api/admin/activity-logs?${params}`);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();

      const headers = [
        "Timestamp",
        "User",
        "Email",
        "Role",
        "Action",
        "Module",
        "Item",
        "Details",
      ];
      const rows = data.logs.map((l: LogItem) => [
        l.createdAt,
        l.userName || "",
        l.userEmail,
        l.userRole,
        l.action,
        l.module,
        l.itemLabel || l.itemId || "",
        l.details ? JSON.stringify(l.details) : "",
      ]);
      const csv = [headers.join(","), ...rows.map((r: string[]) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))].join("\n");

      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `activity-logs-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert(t("activityLogs.exportFailed"));
    }
  };

  const formatDetails = (d: Record<string, unknown> | null) => {
    if (!d) return null;
    const parts: string[] = [];
    for (const [k, v] of Object.entries(d)) {
      const val = v as { old?: unknown; new?: unknown };
      if (val && typeof val === "object" && "old" in val && "new" in val) {
        parts.push(`${k}: ${JSON.stringify(val.old)} → ${JSON.stringify(val.new)}`);
      } else {
        parts.push(`${k}: ${JSON.stringify(v)}`);
      }
    }
    return parts.join("; ");
  };

  return (
    <AdminPageWrapper
      title={t("activityLogs.title")}
      subtitle={t("activityLogs.subtitle")}
    >
      <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
        {/* Filters */}
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Filter className="h-4 w-4" />
            {t("activityLogs.filters")}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="block text-xs text-slate-500">{t("activityLogs.search")}</label>
              <input
                type="text"
                placeholder={t("activityLogs.searchPlaceholder")}
                value={filters.search}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, search: e.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500">{t("activityLogs.role")}</label>
              <select
                value={filters.role}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, role: e.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="">{t("common.all")}</option>
                <option value="super_admin">{t("users.superAdmin")}</option>
                <option value="editor">{t("users.editor")}</option>
                <option value="viewer">{t("users.viewer")}</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-500">{t("activityLogs.action")}</label>
              <select
                value={filters.action}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, action: e.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="">{t("common.all")}</option>
                <option value="create">{t("users.create")}</option>
                <option value="update">Update</option>
                <option value="delete">Delete</option>
                <option value="export">Export</option>
                <option value="sign_in">Sign In</option>
                <option value="activate">Activate</option>
                <option value="deactivate">Deactivate</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-500">{t("activityLogs.module")}</label>
              <select
                value={filters.module}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, module: e.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="">{t("common.all")}</option>
                <option value="products">{t("nav.products")}</option>
                <option value="services">{t("nav.services")}</option>
                <option value="offers">{t("nav.offers")}</option>
                <option value="maintenance_services">{t("nav.maintenance")}</option>
                <option value="maintenance_orders">{t("nav.maintenanceOrders")}</option>
                <option value="users">{t("nav.users")}</option>
                <option value="export">Export</option>
                <option value="auth">Auth</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-500">{t("activityLogs.fromDate")}</label>
              <input
                type="date"
                value={filters.from}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, from: e.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500">{t("activityLogs.toDate")}</label>
              <input
                type="date"
                value={filters.to}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, to: e.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            {t("activityLogs.showingLogs", { count: String(logs.length), total: String(total) })}
          </p>
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Download className="h-4 w-4" />
            {t("activityLogs.exportCsv")}
          </button>
        </div>

        {loading ? (
          <p className="text-slate-500">{t("common.loading")}</p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="max-h-[600px] overflow-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="sticky top-0 bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">
                      {t("activityLogs.timestamp")}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">
                      {t("activityLogs.user")}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">
                      {t("activityLogs.action")}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">
                      {t("activityLogs.module")}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">
                      {t("activityLogs.item")}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">
                      {t("common.details")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-2 text-sm text-slate-600">
                        {formatDate(log.createdAt)}
                      </td>
                      <td className="px-4 py-2">
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {log.userName || log.userEmail}
                          </p>
                          <p className="text-xs text-slate-500">
                            {log.userRole} • {log.userEmail}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                          {log.action}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm text-slate-600">
                        {log.module}
                      </td>
                      <td className="max-w-[200px] truncate px-4 py-2 text-sm text-slate-600">
                        {log.itemLabel || log.itemId || "—"}
                      </td>
                      <td className="max-w-[300px] px-4 py-2 text-xs text-slate-500">
                        {formatDetails(log.details) || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminPageWrapper>
  );
}
