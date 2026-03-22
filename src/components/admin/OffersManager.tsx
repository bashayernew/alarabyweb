"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Upload,
  X,
  Save,
  Image as ImageIcon,
} from "lucide-react";
import { AdminPageWrapper } from "./AdminPageWrapper";
import { useAdminUser } from "./AdminUserContext";
import { useAdminLanguage } from "@/hooks/useAdminLanguage";

type Offer = {
  id: string;
  slug: string | null;
  titleAr: string;
  titleEn: string;
  shortDescriptionAr: string;
  shortDescriptionEn: string;
  fullDescriptionAr: string;
  fullDescriptionEn: string;
  image: string;
  badgeAr: string | null;
  badgeEn: string | null;
  startDate: string;
  endDate: string | null;
  isActive: boolean;
  displayOrder: number;
  ctaTextAr: string | null;
  ctaTextEn: string | null;
};

const defaultForm = () => ({
  slug: "",
  titleAr: "",
  titleEn: "",
  shortDescriptionAr: "",
  shortDescriptionEn: "",
  fullDescriptionAr: "",
  fullDescriptionEn: "",
  image: "",
  badgeAr: "",
  badgeEn: "",
  startDate: new Date().toISOString().split("T")[0],
  endDate: "",
  isActive: true,
  displayOrder: 0,
  ctaTextAr: "",
  ctaTextEn: "",
});

export function OffersManager() {
  const { canWrite } = useAdminUser();
  const { t, lang, isRTL } = useAdminLanguage();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Offer | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState(defaultForm());

  function resetForm() {
    setForm(defaultForm());
    setEditing(null);
    setCreating(false);
  }

  async function fetchOffers() {
    try {
      const res = await fetch("/api/admin/offers");
      if (res.ok) setOffers(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOffers();
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/offers/upload", {
        method: "POST",
        credentials: "include",
        body: fd,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = err.details ? `${err.error}: ${err.details}` : (err.error || "Upload failed");
        throw new Error(msg);
      }
      const { url } = await res.json();
      setForm((f) => ({ ...f, image: url }));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleSave() {
    if (!form.titleAr.trim() || !form.titleEn.trim()) {
      alert(t("errors.enterTitleBoth"));
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        slug: form.slug?.trim() || null,
        badgeAr: form.badgeAr?.trim() || null,
        badgeEn: form.badgeEn?.trim() || null,
        endDate: form.endDate?.trim() || null,
        ctaTextAr: form.ctaTextAr?.trim() || null,
        ctaTextEn: form.ctaTextEn?.trim() || null,
        shortDescriptionAr: form.shortDescriptionAr?.trim() || form.titleAr,
        shortDescriptionEn: form.shortDescriptionEn?.trim() || form.titleEn,
        fullDescriptionAr: form.fullDescriptionAr?.trim() || form.shortDescriptionAr || form.titleAr,
        fullDescriptionEn: form.fullDescriptionEn?.trim() || form.shortDescriptionEn || form.titleEn,
      };
      if (editing) {
        console.log("[admin/offers/ui] submit payload id:", editing.id);
        const res = await fetch(`/api/admin/offers/${editing.id}`, {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.error || (res.status === 401 ? "Session expired – please sign in again" : "Failed to update"));
      } else {
        const res = await fetch("/api/admin/offers", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.error || (res.status === 401 ? "Session expired – please sign in again" : "Failed to create"));
      }
      await fetchOffers();
      resetForm();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm(t("offers.confirmDelete")))
      return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/offers/${id}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) throw new Error("Failed to delete");
      await fetchOffers();
      if (editing?.id === id) resetForm();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setDeleting(null);
    }
  }

  function startEdit(o: Offer) {
    console.log("[admin/offers/ui] edit clicked id:", o.id);
    setEditing(o);
    setForm({
      slug: o.slug ?? "",
      titleAr: o.titleAr,
      titleEn: o.titleEn,
      shortDescriptionAr: o.shortDescriptionAr,
      shortDescriptionEn: o.shortDescriptionEn,
      fullDescriptionAr: o.fullDescriptionAr,
      fullDescriptionEn: o.fullDescriptionEn,
      image: o.image,
      badgeAr: o.badgeAr ?? "",
      badgeEn: o.badgeEn ?? "",
      startDate: o.startDate,
      endDate: o.endDate ?? "",
      isActive: o.isActive,
      displayOrder: o.displayOrder,
      ctaTextAr: o.ctaTextAr ?? "",
      ctaTextEn: o.ctaTextEn ?? "",
    });
    setCreating(false);
  }

  function startCreate() {
    resetForm();
    setCreating(true);
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );
  }

  return (
    <AdminPageWrapper
      title={t("offers.title")}
      subtitle={t("offers.subtitle")}
      actions={canWrite ? (
        <button
          type="button"
          onClick={startCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-primary-700 hover:shadow-lg"
        >
          <Plus className="h-4 w-4" />
          {t("offers.addOffer")}
        </button>
      ) : undefined}
    >
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>

      {canWrite && (creating || editing) && (
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            handleSave();
          }}
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="mb-4 text-lg font-semibold text-slate-800">
            {editing ? t("offers.editOffer") : t("offers.newOffer")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                {t("offers.titleAr")} *
              </label>
              <input
                type="text"
                value={form.titleAr}
                onChange={(e) =>
                  setForm((f) => ({ ...f, titleAr: e.target.value }))
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                {t("offers.titleEn")} *
              </label>
              <input
                type="text"
                value={form.titleEn}
                onChange={(e) =>
                  setForm((f) => ({ ...f, titleEn: e.target.value }))
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                {t("offers.shortDescAr")}
              </label>
              <textarea
                value={form.shortDescriptionAr}
                onChange={(e) =>
                  setForm((f) => ({ ...f, shortDescriptionAr: e.target.value }))
                }
                rows={2}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                {t("offers.shortDescEn")}
              </label>
              <textarea
                value={form.shortDescriptionEn}
                onChange={(e) =>
                  setForm((f) => ({ ...f, shortDescriptionEn: e.target.value }))
                }
                rows={2}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                {t("offers.fullDescAr")}
              </label>
              <textarea
                value={form.fullDescriptionAr}
                onChange={(e) =>
                  setForm((f) => ({ ...f, fullDescriptionAr: e.target.value }))
                }
                rows={4}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                {t("offers.fullDescEn")}
              </label>
              <textarea
                value={form.fullDescriptionEn}
                onChange={(e) =>
                  setForm((f) => ({ ...f, fullDescriptionEn: e.target.value }))
                }
                rows={4}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                {t("common.image")}
              </label>
              <div className="flex items-center gap-2">
                {form.image ? (
                  <div className="relative h-20 w-28 overflow-hidden rounded-lg border">
                    <img
                      src={form.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, image: "" }))}
                      className="absolute top-0.5 right-0.5 rounded-full bg-red-500 p-1 text-white"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : null}
                <label className="flex h-20 w-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 text-slate-500 hover:border-primary-400">
                  {uploading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <>
                      <Upload className="h-6 w-6" />
                      <span className="mt-1 text-xs">{t("common.upload")}</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                {t("offers.badgeAr")}
              </label>
              <input
                type="text"
                value={form.badgeAr}
                onChange={(e) =>
                  setForm((f) => ({ ...f, badgeAr: e.target.value }))
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
                placeholder="عرض خاص"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                {t("offers.badgeEn")}
              </label>
              <input
                type="text"
                value={form.badgeEn}
                onChange={(e) =>
                  setForm((f) => ({ ...f, badgeEn: e.target.value }))
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
                placeholder="Special Offer"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                {t("offers.startDate")}
              </label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, startDate: e.target.value }))
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                {t("offers.endDate")}
              </label>
              <input
                type="date"
                value={form.endDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, endDate: e.target.value }))
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                {t("offers.displayOrder")}
              </label>
              <input
                type="number"
                value={form.displayOrder}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    displayOrder: parseInt(e.target.value) || 0,
                  }))
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
              />
            </div>
            <div className="flex items-center gap-2 sm:col-span-2">
              <input
                type="checkbox"
                id="isActive"
                checked={form.isActive}
                onChange={(e) =>
                  setForm((f) => ({ ...f, isActive: e.target.checked }))
                }
                className="rounded border-slate-300"
              />
              <label htmlFor="isActive" className="text-sm text-slate-700">
                {t("offers.offerActive")}
              </label>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {t("common.save")}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              {t("common.cancel")}
            </button>
          </div>
        </form>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
          <h2 className="font-semibold text-slate-800">
            {t("offers.offerList")}
          </h2>
        </div>
        {offers.length === 0 ? (
          <p className="p-6 text-slate-500">
            {t("offers.noOffers")}
          </p>
        ) : (
          <div className="divide-y divide-slate-100">
            {offers.map((o) => (
              <div
                key={o.id}
                className="flex flex-wrap items-center gap-4 p-4 sm:flex-nowrap"
                dir={isRTL ? "rtl" : "ltr"}
              >
                <div className="h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                  {o.image ? (
                    <img
                      src={o.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-slate-400" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-slate-800">
                    {lang === "ar" ? (o.titleAr || o.titleEn) : (o.titleEn || o.titleAr)}
                  </p>
                  <p className="truncate text-sm text-slate-500">
                    {o.shortDescriptionAr}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {o.startDate} {!o.isActive && `• ${t("common.inactive")}`}
                  </p>
                </div>
                {canWrite && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(o)}
                      className="rounded-lg border border-slate-300 p-2 text-slate-600 hover:bg-slate-50 hover:text-primary-600"
                      title={t("common.edit")}
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(o.id)}
                      disabled={deleting === o.id}
                      className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                      title={t("common.delete")}
                    >
                      {deleting === o.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </AdminPageWrapper>
  );
}
