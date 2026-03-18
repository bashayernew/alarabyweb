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
import { offerRequestsToExport } from "@/lib/admin-export";

function useStatusOptions(t: (k: string) => string) {
  return [
    { value: "", label: t("statusOptions.all") },
    { value: "new", label: t("statusOptions.new") },
    { value: "contacted", label: t("statusOptions.contacted") },
    { value: "in_progress", label: t("statusOptions.inProgress") },
    { value: "completed", label: t("statusOptions.completed") },
    { value: "cancelled", label: t("statusOptions.cancelled") },
  ] as const;
}

type OfferRequest = {
  id: string;
  offerId: string | null;
  offerTitleAr: string;
  offerTitleEn: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  address: string | null;
  area: string | null;
  notes: string | null;
  language: string;
  status: string;
  createdAt: string;
  completedByName?: string | null;
};

export function OfferRequestsManager() {
  const { canWrite, canExport } = useAdminUser();
  const { t, lang, isRTL, formatDate } = useAdminLanguage();
  const STATUS_OPTIONS = useStatusOptions(t);
  const [requests, setRequests] = useState<OfferRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  async function fetchRequests() {
    try {
      const res = await fetch("/api/admin/offer-requests");
      if (res.ok) setRequests(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    try {
      const res = await fetch(`/api/admin/offer-requests/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update");
      const data = await res.json();
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, ...data } : r))
      );
    } catch (e) {
      console.error(e);
      alert(t("errors.loadFailed"));
    } finally {
      setUpdating(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm(t("offerRequests.confirmDelete")))
      return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/offer-requests/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      console.error(e);
      alert(t("errors.deleteFailed"));
    } finally {
      setDeleting(null);
    }
  }

  const filteredRequests = requests.filter((r) => {
    const matchStatus = !statusFilter || r.status === statusFilter;
    const searchLower = search.toLowerCase();
    const matchSearch =
      !searchLower ||
      r.customerName.toLowerCase().includes(searchLower) ||
      r.customerPhone.includes(searchLower) ||
      (r.customerEmail?.toLowerCase().includes(searchLower) ?? false) ||
      r.offerTitleAr.toLowerCase().includes(searchLower) ||
      r.offerTitleEn.toLowerCase().includes(searchLower) ||
      (r.area?.toLowerCase().includes(searchLower) ?? false) ||
      (r.address?.toLowerCase().includes(searchLower) ?? false);
    return matchStatus && matchSearch;
  });

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );
  }

  const exportData = offerRequestsToExport(requests);
  const exportFilteredData = offerRequestsToExport(filteredRequests);

  return (
    <AdminPageWrapper
      title={t("offerRequests.title")}
      subtitle={t("offerRequests.subtitle")}
      actions={canExport ? (
        <AdminExportDropdown
          section="offer-requests"
          sectionTitle={t("offerRequests.title")}
          data={exportData}
          filteredData={exportFilteredData}
          isFiltered={statusFilter !== "" || search !== ""}
          disabled={requests.length === 0}
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
        {requests.length === 0 ? (
          <p className="p-6 text-slate-500">
            {t("offerRequests.noRequests")}
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
                    {t("common.offer")}
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
                    {t("common.status")}
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-slate-700">
                    {t("common.actions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((r) => (
                  <React.Fragment key={r.id}>
                    <tr className="border-b border-slate-100">
                      <td className="px-4 py-3 text-slate-600">
                        {formatDate(r.createdAt)}
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-800">
                        {lang === "ar" ? (r.offerTitleAr || r.offerTitleEn) : (r.offerTitleEn || r.offerTitleAr)}
                      </td>
                      <td className="px-4 py-3">{r.customerName}</td>
                      <td className="px-4 py-3">
                        <a
                          href={`tel:${r.customerPhone}`}
                          className="text-primary-600 hover:underline"
                        >
                          {r.customerPhone}
                        </a>
                      </td>
                      <td className="px-4 py-3">{r.area ?? "—"}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-0.5">
                          <select
                            value={r.status}
                            onChange={(e) =>
                              updateStatus(r.id, e.target.value)
                            }
                            disabled={updating === r.id || !canWrite}
                            className="rounded border border-slate-300 bg-white px-2 py-1 text-xs disabled:opacity-50"
                          >
                            {STATUS_OPTIONS.filter((x) => x.value).map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          {r.status === "completed" && r.completedByName && (
                            <span className="text-[10px] text-slate-500">
                              {t("dashboard.doneBy")} {r.completedByName}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              setExpandedId(
                                expandedId === r.id ? null : r.id
                              )
                            }
                            className="rounded-lg border border-slate-300 p-1.5 text-slate-600 hover:bg-slate-50"
                            title={t("common.details")}
                          >
                            {expandedId === r.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </button>
                          {canWrite && (
                            <button
                              onClick={() => handleDelete(r.id)}
                              disabled={deleting === r.id}
                              className="rounded-lg border border-red-200 p-1.5 text-red-600 hover:bg-red-50 disabled:opacity-50"
                              title={t("common.delete")}
                            >
                            {deleting === r.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                    {expandedId === r.id && (
                      <tr className="bg-slate-50">
                        <td colSpan={7} className="px-4 py-4">
                          <div className="space-y-2 text-sm">
                            <p>
                              <span className="font-medium text-slate-700">
                                {t("common.email")}:
                              </span>{" "}
                              {r.customerEmail ?? "—"}
                            </p>
                            <p>
                              <span className="font-medium text-slate-700">
                                {t("common.address")}:
                              </span>{" "}
                              {r.address ?? "—"}
                            </p>
                            {r.notes && (
                              <p>
                                <span className="font-medium text-slate-700">
                                  {t("common.notes")}:
                                </span>{" "}
                                {r.notes}
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
