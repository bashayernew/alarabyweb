"use client";

import { useEffect, useState } from "react";
import { Package, FileText, Loader2, Search } from "lucide-react";
import { AdminExportDropdown } from "./AdminExportDropdown";
import { useAdminUser } from "./AdminUserContext";
import { useAdminLanguage } from "@/hooks/useAdminLanguage";
import {
  productOrdersToExport,
  serviceRequestsToExport,
  combinedRequestsToExport,
} from "@/lib/admin-export";

const STATUS_OPTIONS = [
  { value: "", key: "statusOptions.all" },
  { value: "new", key: "statusOptions.new" },
  { value: "contacted", key: "statusOptions.contacted" },
  { value: "in progress", key: "statusOptions.inProgress" },
  { value: "completed", key: "statusOptions.completed" },
  { value: "cancelled", key: "statusOptions.cancelled" },
] as const;

type Order = {
  id: string;
  customerName: string;
  email: string | null;
  phone: string;
  area: string | null;
  message: string | null;
  status: string;
  language: string;
  createdAt: string;
  product: { slug: string; titleEn: string; titleAr: string };
};

type Request = {
  id: string;
  customerName: string;
  email: string | null;
  phone: string;
  area: string | null;
  message: string | null;
  status: string;
  language: string;
  createdAt: string;
  service: { slug: string; titleEn: string; titleAr: string };
};

type OfferRequest = {
  id: string;
  offerTitleAr: string;
  offerTitleEn: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  address: string | null;
  area: string | null;
  notes: string | null;
  status: string;
  createdAt: string;
};

type MaintenanceOrder = {
  id: string;
  serviceTitleAr: string;
  serviceTitleEn: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  address: string | null;
  area: string | null;
  notes: string | null;
  status: string;
  createdAt: string;
};

export function AdminDashboard() {
  const { canWrite, canExport } = useAdminUser();
  const { t, isRTL, formatDate } = useAdminLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [offerRequests, setOfferRequests] = useState<OfferRequest[]>([]);
  const [maintenanceOrders, setMaintenanceOrders] = useState<MaintenanceOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderStatusFilter, setOrderStatusFilter] = useState("");
  const [requestStatusFilter, setRequestStatusFilter] = useState("");
  const [orderSearch, setOrderSearch] = useState("");
  const [requestSearch, setRequestSearch] = useState("");
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);
  const [updatingRequest, setUpdatingRequest] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [ordersRes, requestsRes, offerRes, maintRes] = await Promise.all([
          fetch("/api/admin/orders"),
          fetch("/api/admin/requests"),
          fetch("/api/admin/offer-requests"),
          fetch("/api/admin/maintenance-orders"),
        ]);
        if (ordersRes.ok) setOrders(await ordersRes.json());
        if (requestsRes.ok) setRequests(await requestsRes.json());
        if (offerRes.ok) setOfferRequests(await offerRes.json());
        if (maintRes.ok) setMaintenanceOrders(await maintRes.json());
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function updateOrderStatus(id: string, status: string) {
    setUpdatingOrder(id);
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
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
    } finally {
      setUpdatingOrder(null);
    }
  }

  async function updateRequestStatus(id: string, status: string) {
    setUpdatingRequest(id);
    try {
      const res = await fetch(`/api/admin/requests/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update");
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingRequest(null);
    }
  }

  const filteredOrders = orders.filter((o) => {
    const matchStatus = !orderStatusFilter || o.status === orderStatusFilter;
    const searchLower = orderSearch.toLowerCase();
    const matchSearch =
      !searchLower ||
      o.customerName.toLowerCase().includes(searchLower) ||
      o.phone.includes(searchLower) ||
      (o.email?.toLowerCase().includes(searchLower) ?? false) ||
      o.product.titleAr.toLowerCase().includes(searchLower) ||
      o.product.titleEn.toLowerCase().includes(searchLower) ||
      (o.area?.toLowerCase().includes(searchLower) ?? false);
    return matchStatus && matchSearch;
  });

  const filteredRequests = requests.filter((r) => {
    const matchStatus = !requestStatusFilter || r.status === requestStatusFilter;
    const searchLower = requestSearch.toLowerCase();
    const matchSearch =
      !searchLower ||
      r.customerName.toLowerCase().includes(searchLower) ||
      r.phone.includes(searchLower) ||
      (r.email?.toLowerCase().includes(searchLower) ?? false) ||
      r.service.titleAr.toLowerCase().includes(searchLower) ||
      r.service.titleEn.toLowerCase().includes(searchLower) ||
      (r.area?.toLowerCase().includes(searchLower) ?? false);
    return matchStatus && matchSearch;
  });

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
        <span className="sr-only">{t("common.loading")}</span>
      </div>
    );
  }

  const productOrdersExport = productOrdersToExport(orders);
  const productOrdersFilteredExport = productOrdersToExport(filteredOrders);
  const serviceRequestsExport = serviceRequestsToExport(requests);
  const serviceRequestsFilteredExport = serviceRequestsToExport(filteredRequests);
  const combinedExport = combinedRequestsToExport(
    orders,
    requests,
    offerRequests,
    maintenanceOrders
  );
  const combinedFilteredExport = combinedRequestsToExport(
    filteredOrders,
    filteredRequests,
    offerRequests,
    maintenanceOrders
  );

  return (
    <div className="space-y-8" dir={isRTL ? "rtl" : "ltr"}>
      {canExport && (
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-slate-800">
          {t("dashboard.exportAll")}
        </h2>
        <p className="mb-4 text-sm text-slate-500">
          {t("dashboard.exportAllDesc")}
        </p>
        <AdminExportDropdown
          section="all-requests"
          sectionTitle="All Client Requests"
          data={combinedExport}
          filteredData={combinedFilteredExport}
          isFiltered={orderStatusFilter !== "" || requestStatusFilter !== "" || orderSearch !== "" || requestSearch !== ""}
          disabled={orders.length + requests.length + offerRequests.length + maintenanceOrders.length === 0}
        />
      </div>
      )}

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/80 px-5 py-4">
          <h2 className="flex items-center gap-2 text-base font-semibold text-slate-800">
            <Package className="h-5 w-5 text-primary-600" />
            {t("dashboard.productOrders")} ({filteredOrders.length})
          </h2>
          {canExport && <AdminExportDropdown
            section="product-orders"
            sectionTitle="Product Orders"
            data={productOrdersExport}
            filteredData={productOrdersFilteredExport}
            isFiltered={orderStatusFilter !== "" || orderSearch !== ""}
            disabled={orders.length === 0}
          />}
        </div>
        <div className="flex flex-wrap gap-3 p-5 pb-0">
          <div className={`relative min-w-[200px] flex-1 ${isRTL ? "" : ""}`}>
            <Search className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 ${isRTL ? "right-3" : "left-3"}`} />
            <input
              type="text"
              placeholder={t("common.search")}
              value={orderSearch}
              onChange={(e) => setOrderSearch(e.target.value)}
              className={`w-full rounded-xl border border-slate-200 py-2.5 text-slate-800 shadow-sm transition-colors focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 ${isRTL ? "pr-10 pl-3" : "pl-10 pr-3"}`}
            />
          </div>
          <select
            value={orderStatusFilter}
            onChange={(e) => setOrderStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {t(opt.key)}
              </option>
            ))}
          </select>
        </div>
        <div className="p-5">
          {orders.length === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 py-12 text-center text-slate-500">
              {t("dashboard.noOrders")}
            </p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-100">
              <table className={`w-full text-sm ${isRTL ? "text-right" : "text-left"}`}>
                <thead className="border-b border-slate-200 bg-slate-50/80">
                  <tr>
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">{t("common.date")}</th>
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">{t("common.product")}</th>
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">{t("common.customer")}</th>
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">{t("common.email")}</th>
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">{t("common.phone")}</th>
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">{t("common.area")}</th>
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">{t("common.status")}</th>
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">{t("common.notes")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((o) => (
                    <tr key={o.id} className="border-b border-slate-100 transition-colors hover:bg-slate-50/50">
                      <td className="px-5 py-3.5 text-slate-600">
                        {formatDate(o.createdAt)}
                      </td>
                      <td className="px-5 py-3.5 font-medium text-slate-800">{isRTL ? (o.product.titleAr || o.product.titleEn) : (o.product.titleEn || o.product.titleAr)}</td>
                      <td className="px-5 py-3.5 text-slate-700">{o.customerName}</td>
                      <td className="px-5 py-3.5 text-slate-600">{o.email ?? "—"}</td>
                      <td className="px-5 py-3.5 text-slate-600">{o.phone}</td>
                      <td className="px-5 py-3.5 text-slate-600">{o.area ?? "—"}</td>
                      <td className="px-5 py-3.5">
                        <select
                          value={o.status}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                          disabled={updatingOrder === o.id || !canWrite}
                          className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs shadow-sm focus:border-primary-400 focus:outline-none disabled:opacity-50"
                        >
                          {STATUS_OPTIONS.filter((x) => x.value).map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {t(opt.key)}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="max-w-[150px] truncate px-5 py-3.5 text-slate-500">
                        {o.message ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/80 px-5 py-4">
          <h2 className="flex items-center gap-2 text-base font-semibold text-slate-800">
            <FileText className="h-5 w-5 text-primary-600" />
            {t("dashboard.serviceRequests")} ({filteredRequests.length})
          </h2>
          {canExport && (
            <AdminExportDropdown
              section="service-requests"
              sectionTitle="Service Requests"
              data={serviceRequestsExport}
              filteredData={serviceRequestsFilteredExport}
              isFiltered={requestStatusFilter !== "" || requestSearch !== ""}
              disabled={requests.length === 0}
            />
          )}
        </div>
        <div className="flex flex-wrap gap-3 p-5 pb-0">
          <div className="relative min-w-[200px] flex-1">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="بحث..."
              value={requestSearch}
              onChange={(e) => setRequestSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 py-2.5 pr-10 pl-3 text-slate-800 shadow-sm transition-colors focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
          <select
            value={requestStatusFilter}
            onChange={(e) => setRequestStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="p-5">
          {requests.length === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 py-12 text-center text-slate-500">
              لا توجد طلبات خدمات بعد. / No service requests yet.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-100">
              <table className="w-full text-right text-sm">
                <thead className="border-b border-slate-200 bg-slate-50/80">
                  <tr>
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">التاريخ</th>
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">الخدمة</th>
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">العميل</th>
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">البريد</th>
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">الهاتف</th>
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">المنطقة</th>
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">الحالة</th>
                    <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">الملاحظات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((r) => (
                    <tr key={r.id} className="border-b border-slate-100 transition-colors hover:bg-slate-50/50">
                      <td className="px-5 py-3.5 text-slate-600">
                        {new Date(r.createdAt).toLocaleString("ar-KW")}
                      </td>
                      <td className="px-5 py-3.5 font-medium text-slate-800">{r.service.titleAr}</td>
                      <td className="px-5 py-3.5 text-slate-700">{r.customerName}</td>
                      <td className="px-5 py-3.5 text-slate-600">{r.email ?? "—"}</td>
                      <td className="px-5 py-3.5 text-slate-600">{r.phone}</td>
                      <td className="px-5 py-3.5 text-slate-600">{r.area ?? "—"}</td>
                      <td className="px-5 py-3.5">
                        <select
                          value={r.status}
                          onChange={(e) => updateRequestStatus(r.id, e.target.value)}
                          disabled={updatingRequest === r.id || !canWrite}
                          className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs shadow-sm focus:border-primary-400 focus:outline-none disabled:opacity-50"
                        >
                          {STATUS_OPTIONS.filter((x) => x.value).map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="max-w-[150px] truncate px-5 py-3.5 text-slate-500">
                        {r.message ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
