"use client";

import React, { useEffect, useState } from "react";
import {
  Loader2,
  Search,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { AdminPageWrapper } from "./AdminPageWrapper";
import { AdminExportDropdown } from "./AdminExportDropdown";
import { useAdminUser } from "./AdminUserContext";
import { useAdminLanguage } from "@/hooks/useAdminLanguage";
import { maintenanceOrdersToExport } from "@/lib/admin-export";

function useStatusOptions(t: (k: string) => string) {
  return [
    { value: "", label: t("statusOptions.all") },
    { value: "new", label: t("statusOptions.new") },
    { value: "in_progress", label: t("statusOptions.inProgress") },
    { value: "completed", label: t("statusOptions.completed") },
    { value: "cancelled", label: t("statusOptions.cancelled") },
  ] as const;
}

type MaintenanceOrder = {
  id: string;
  serviceId: string | null;
  serviceTitleAr: string;
  serviceTitleEn: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  address: string | null;
  area: string | null;
  preferredDate: string | null;
  preferredTime: string | null;
  notes: string | null;
  language: string;
  status: string;
  createdAt: string;
};

export function MaintenanceOrdersManager() {
  const { canWrite, canExport } = useAdminUser();
  const { t, lang, isRTL, formatDate } = useAdminLanguage();
  const STATUS_OPTIONS = useStatusOptions(t);
  const [orders, setOrders] = useState<MaintenanceOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  async function fetchOrders() {
    try {
      const res = await fetch("/api/admin/maintenance-orders");
      if (res.ok) setOrders(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    try {
      const res = await fetch(`/api/admin/maintenance-orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update");
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o))
      );
    } catch (e) {
      console.error(e);
      alert(t("errors.loadFailed"));
    } finally {
      setUpdating(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm(t("maintenance.confirmDeleteOrder")))
      return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/maintenance-orders/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch (e) {
      console.error(e);
      alert(t("errors.deleteFailed"));
    } finally {
      setDeleting(null);
    }
  }

  const filteredOrders = orders.filter((o) => {
    const matchStatus = !statusFilter || o.status === statusFilter;
    const searchLower = search.toLowerCase();
    const matchSearch =
      !searchLower ||
      o.customerName.toLowerCase().includes(searchLower) ||
      o.customerPhone.includes(searchLower) ||
      (o.customerEmail?.toLowerCase().includes(searchLower) ?? false) ||
      o.serviceTitleAr.toLowerCase().includes(searchLower) ||
      o.serviceTitleEn.toLowerCase().includes(searchLower) ||
      (o.area?.toLowerCase().includes(searchLower) ?? false) ||
      (o.address?.toLowerCase().includes(searchLower) ?? false);
    return matchStatus && matchSearch;
  });

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );
  }

  const exportData = maintenanceOrdersToExport(orders);
  const exportFilteredData = maintenanceOrdersToExport(filteredOrders);

  return (
    <AdminPageWrapper
      title={t("maintenance.ordersTitle")}
      subtitle={t("maintenance.ordersSubtitle")}
      actions={canExport ? (
        <AdminExportDropdown
          section="maintenance-orders"
          sectionTitle={t("maintenance.ordersTitle")}
          data={exportData}
          filteredData={exportFilteredData}
          isFiltered={statusFilter !== "" || search !== ""}
          disabled={orders.length === 0}
        />
      ) : undefined}
    >
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={t("common.search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 py-2 pr-10 pl-3 text-slate-800"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {orders.length === 0 ? (
          <p className="p-6 text-slate-500">
            {t("maintenance.noOrders")}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-right font-medium text-slate-700">
                    {t("common.date")}
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-slate-700">
                    {t("common.service")}
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-slate-700">
                    {t("common.customer")}
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-slate-700">
                    {t("common.phone")}
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-slate-700">
                    {t("common.area")}
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-slate-700">
                    {t("maintenance.preferredDate")}
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-slate-700">
                    {t("common.status")}
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-slate-700">
                    {t("common.actions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((o) => (
                  <React.Fragment key={o.id}>
                    <tr className="border-b border-slate-100">
                      <td className="px-4 py-3 text-slate-600">
                        {new Date(o.createdAt).toLocaleString("ar-KW")}
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-800">
                        {o.serviceTitleAr}
                      </td>
                      <td className="px-4 py-3">{o.customerName}</td>
                      <td className="px-4 py-3">
                        <a
                          href={`tel:${o.customerPhone}`}
                          className="text-primary-600 hover:underline"
                        >
                          {o.customerPhone}
                        </a>
                      </td>
                      <td className="px-4 py-3">{o.area ?? "—"}</td>
                      <td className="px-4 py-3">
                        {o.preferredDate ?? "—"}
                        {o.preferredTime ? ` (${o.preferredTime})` : ""}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={o.status}
                          onChange={(e) =>
                            updateStatus(o.id, e.target.value)
                          }
                          disabled={updating === o.id || !canWrite}
                          className="rounded border border-slate-300 bg-white px-2 py-1 text-xs disabled:opacity-50"
                        >
                          {STATUS_OPTIONS.filter((x) => x.value).map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              setExpandedId(expandedId === o.id ? null : o.id)
                            }
                            className="rounded-lg border border-slate-300 p-1.5 text-slate-600 hover:bg-slate-50"
                            title={t("common.details")}
                          >
                            {expandedId === o.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </button>
                          {canWrite && (
                            <button
                              onClick={() => handleDelete(o.id)}
                              disabled={deleting === o.id}
                              className="rounded-lg border border-red-200 p-1.5 text-red-600 hover:bg-red-50 disabled:opacity-50"
                              title={t("common.delete")}
                            >
                            {deleting === o.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                    {expandedId === o.id && (
                      <tr className="bg-slate-50">
                        <td colSpan={8} className="px-4 py-4">
                          <div className="space-y-2 text-sm">
                            <p>
                              <span className="font-medium text-slate-700">
                                {t("common.email")}:
                              </span>{" "}
                              {o.customerEmail ?? "—"}
                            </p>
                            <p>
                              <span className="font-medium text-slate-700">
                                {t("common.address")}:
                              </span>{" "}
                              {o.address ?? "—"}
                            </p>
                            {o.notes && (
                              <p>
                                <span className="font-medium text-slate-700">
                                  {t("common.notes")}:
                                </span>{" "}
                                {o.notes}
                              </p>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    </AdminPageWrapper>
  );
}
