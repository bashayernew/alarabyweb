"use client";

import { useEffect, useState } from "react";
import { Download, Package, FileText, Loader2 } from "lucide-react";

type Order = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  message: string | null;
  language: string;
  createdAt: string;
  product: { slug: string; titleEn: string; titleAr: string };
};

type Request = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  message: string | null;
  language: string;
  createdAt: string;
  service: { slug: string; titleEn: string; titleAr: string };
};

export function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [ordersRes, requestsRes] = await Promise.all([
          fetch("/api/admin/orders"),
          fetch("/api/admin/requests"),
        ]);
        if (ordersRes.ok) setOrders(await ordersRes.json());
        if (requestsRes.ok) setRequests(await requestsRes.json());
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function handleExport(format: "json" | "csv") {
    setExporting(true);
    try {
      const res = await fetch(`/api/admin/export?format=${format}`);
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `aqua-systems-export.${format === "csv" ? "csv" : "json"}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    } finally {
      setExporting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-4">
        <h2 className="text-lg font-semibold text-slate-800">Export records</h2>
        <div className="flex gap-2">
          <button
            onClick={() => handleExport("json")}
            disabled={exporting}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            JSON
          </button>
          <button
            onClick={() => handleExport("csv")}
            disabled={exporting}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            CSV
          </button>
        </div>
      </div>

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800">
          <Package className="h-5 w-5" />
          Product orders ({orders.length})
        </h2>
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          {orders.length === 0 ? (
            <p className="p-6 text-slate-500">No orders yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 font-medium text-slate-700">Date</th>
                    <th className="px-4 py-3 font-medium text-slate-700">Product</th>
                    <th className="px-4 py-3 font-medium text-slate-700">Customer</th>
                    <th className="px-4 py-3 font-medium text-slate-700">Email</th>
                    <th className="px-4 py-3 font-medium text-slate-700">Phone</th>
                    <th className="px-4 py-3 font-medium text-slate-700">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-b border-slate-100">
                      <td className="px-4 py-3 text-slate-600">
                        {new Date(o.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">{o.product.titleEn}</td>
                      <td className="px-4 py-3">{o.customerName}</td>
                      <td className="px-4 py-3">{o.email}</td>
                      <td className="px-4 py-3">{o.phone}</td>
                      <td className="max-w-[200px] truncate px-4 py-3 text-slate-500">
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

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800">
          <FileText className="h-5 w-5" />
          Service requests ({requests.length})
        </h2>
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          {requests.length === 0 ? (
            <p className="p-6 text-slate-500">No service requests yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 font-medium text-slate-700">Date</th>
                    <th className="px-4 py-3 font-medium text-slate-700">Service</th>
                    <th className="px-4 py-3 font-medium text-slate-700">Customer</th>
                    <th className="px-4 py-3 font-medium text-slate-700">Email</th>
                    <th className="px-4 py-3 font-medium text-slate-700">Phone</th>
                    <th className="px-4 py-3 font-medium text-slate-700">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((r) => (
                    <tr key={r.id} className="border-b border-slate-100">
                      <td className="px-4 py-3 text-slate-600">
                        {new Date(r.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">{r.service.titleEn}</td>
                      <td className="px-4 py-3">{r.customerName}</td>
                      <td className="px-4 py-3">{r.email}</td>
                      <td className="px-4 py-3">{r.phone}</td>
                      <td className="max-w-[200px] truncate px-4 py-3 text-slate-500">
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
