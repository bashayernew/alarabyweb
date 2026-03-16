"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";

export type OfferForRequest = {
  id: string;
  titleAr: string;
  titleEn: string;
  shortDescriptionAr?: string;
  shortDescriptionEn?: string;
  fullDescriptionAr?: string;
  fullDescriptionEn?: string;
  image?: string;
  badgeAr?: string | null;
  badgeEn?: string | null;
  startDate?: string;
  endDate?: string | null;
};

type OfferRequestModalProps = {
  offer: OfferForRequest;
  onClose: () => void;
  language: "ar" | "en";
};

const SUCCESS_MESSAGES = {
  ar: "تم استلام طلبك بنجاح. سيقوم فريقنا بالتواصل معك قريباً.",
  en: "Your request has been received. Our team will contact you soon.",
};

export function OfferRequestModal({
  offer,
  onClose,
  language,
}: OfferRequestModalProps) {
  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    address: "",
    area: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const labels = {
    ar: {
      title: "طلب العرض",
      offerLabel: "العرض",
      name: "الاسم الكامل",
      phone: "رقم الهاتف",
      email: "البريد الإلكتروني (اختياري)",
      address: "العنوان",
      area: "المنطقة",
      notes: "ملاحظات",
      submit: "اطلب العرض",
      close: "إغلاق",
    },
    en: {
      title: "Request Offer",
      offerLabel: "Offer",
      name: "Full Name",
      phone: "Phone Number",
      email: "Email (optional)",
      address: "Address",
      area: "Area",
      notes: "Notes",
      submit: "Request Offer",
      close: "Close",
    },
  };

  const t = labels[language];
  const isRTL = language === "ar";
  const offerName = language === "ar" ? offer.titleAr : offer.titleEn;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.customerName.trim() || !form.customerPhone.trim()) {
      setError(
        language === "ar"
          ? "الرجاء إدخال الاسم ورقم الهاتف"
          : "Please enter name and phone"
      );
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/offer-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offerId: offer.id,
          customerName: form.customerName.trim(),
          customerPhone: form.customerPhone.trim(),
          customerEmail: form.customerEmail.trim() || undefined,
          address: form.address.trim() || undefined,
          area: form.area.trim() || undefined,
          notes: form.notes.trim() || undefined,
          language,
        }),
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
      onClick={onClose}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div
        className={`relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl ${
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
              {SUCCESS_MESSAGES[language]}
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
              {t.offerLabel}: {offerName}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  {t.name} *
                </label>
                <input
                  type="text"
                  value={form.customerName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, customerName: e.target.value }))
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
                  placeholder={t.name}
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  {t.phone} *
                </label>
                <input
                  type="tel"
                  value={form.customerPhone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, customerPhone: e.target.value }))
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
                  placeholder={t.phone}
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  {t.email}
                </label>
                <input
                  type="email"
                  value={form.customerEmail}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, customerEmail: e.target.value }))
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
                  placeholder={t.email}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  {t.area}
                </label>
                <input
                  type="text"
                  value={form.area}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, area: e.target.value }))
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
                  placeholder={t.area}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  {t.address}
                </label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, address: e.target.value }))
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
                  placeholder={t.address}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  {t.notes}
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, notes: e.target.value }))
                  }
                  rows={3}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
                  placeholder={t.notes}
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50"
                >
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : null}
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
