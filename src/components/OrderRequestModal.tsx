"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";

type OrderRequestModalProps = {
  type: "product" | "service";
  itemId: string;
  itemName: string;
  onClose: () => void;
  language?: "ar" | "en";
};

const SUCCESS_MESSAGES = {
  product: {
    ar: "تم استلام طلب المنتج بنجاح. سيقوم فريق المبيعات بالتواصل معك قريباً.",
    en: "Your product order has been received. Our sales team will contact you soon.",
  },
  service: {
    ar: "تم استلام طلب الخدمة بنجاح. سيقوم فريق الخدمات بالتواصل معك قريباً.",
    en: "Your service request has been received. Our services team will contact you soon.",
  },
};

export function OrderRequestModal({
  type,
  itemId,
  itemName,
  onClose,
  language = "ar",
}: OrderRequestModalProps) {
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    area: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isProduct = type === "product";
  const endpoint = isProduct ? "/api/orders" : "/api/requests";
  const payload = isProduct
    ? {
        productId: itemId,
        productSlug: itemId,
        customerName: form.customerName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        area: form.area.trim() || undefined,
        message: form.notes.trim() || undefined,
        language,
      }
    : {
        serviceId: itemId,
        serviceSlug: itemId,
        customerName: form.customerName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        area: form.area.trim() || undefined,
        message: form.notes.trim() || undefined,
        language,
      };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.customerName.trim() || !form.phone.trim()) {
      setError(language === "ar" ? "الرجاء إدخال الاسم والهاتف" : "Please enter name and phone");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit");
      }
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  }

  const labels = {
    ar: {
      title: isProduct ? "طلب منتج" : "طلب خدمة",
      itemLabel: isProduct ? "المنتج" : "الخدمة",
      name: "الاسم",
      phone: "الهاتف",
      email: "البريد الإلكتروني (اختياري)",
      area: "المنطقة (اختياري)",
      notes: "ملاحظات",
      submit: "إرسال الطلب",
      close: "إغلاق",
    },
    en: {
      title: isProduct ? "Product Order" : "Service Request",
      itemLabel: isProduct ? "Product" : "Service",
      name: "Name",
      phone: "Phone",
      email: "Email (optional)",
      area: "Area (optional)",
      notes: "Notes",
      submit: "Submit Request",
      close: "Close",
    },
  };

  const t = labels[language];
  const isRTL = language === "ar";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
      onClick={onClose}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div
        className={`relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl ${
          isRTL ? "text-right" : "text-left"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
          aria-label={t.close}
        >
          <X className="h-4 w-4" />
        </button>

        {success ? (
          <div className="py-4">
            <p className="text-lg font-semibold text-emerald-600">
              {SUCCESS_MESSAGES[type][language]}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
            >
              {t.close}
            </button>
          </div>
        ) : (
          <>
            <h3 className="mb-4 text-lg font-bold text-slate-800">{t.title}</h3>
            <p className="mb-4 text-sm text-slate-600">
              {t.itemLabel}: {itemName}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">{t.name}</label>
                <input
                  type="text"
                  value={form.customerName}
                  onChange={(e) => setForm((f) => ({ ...f, customerName: e.target.value }))}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
                  placeholder={t.name}
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">{t.phone}</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
                  placeholder={t.phone}
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">{t.email}</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
                  placeholder={t.email}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">{t.area}</label>
                <input
                  type="text"
                  value={form.area}
                  onChange={(e) => setForm((f) => ({ ...f, area: e.target.value }))}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
                  placeholder={t.area}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">{t.notes}</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  rows={3}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
                  placeholder={t.notes}
                />
              </div>

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {t.submit}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  {t.close}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
