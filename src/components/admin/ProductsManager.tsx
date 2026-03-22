"use client";

import { useEffect, useRef, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Upload,
  Save,
  Image as ImageIcon,
  X,
  ChevronUp,
  ChevronDown,
  Star,
} from "lucide-react";
import { AdminPageWrapper } from "./AdminPageWrapper";
import { useAdminUser } from "./AdminUserContext";
import { useAdminLanguage } from "@/hooks/useAdminLanguage";

type Product = {
  id: string;
  slug: string;
  image: string;
  price: number | null;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  shortDescriptionEn: string;
  shortDescriptionAr: string;
  fullDescriptionEn: string;
  fullDescriptionAr: string;
  warrantyEn: string;
  warrantyAr: string;
  featuresEn: string;
  featuresAr: string;
  specsEn: string | null;
  specsAr: string | null;
  category: string;
  badgeEn: string | null;
  badgeAr: string | null;
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
};

const defaultForm = () => ({
  slug: "",
  image: "",
  price: null as number | null,
  titleEn: "",
  titleAr: "",
  subtitleEn: "",
  subtitleAr: "",
  shortDescriptionEn: "",
  shortDescriptionAr: "",
  fullDescriptionEn: "",
  fullDescriptionAr: "",
  warrantyEn: "",
  warrantyAr: "",
  featuresEn: "[]",
  featuresAr: "[]",
  specsEn: "",
  specsAr: "",
  category: "pump",
  badgeEn: "",
  badgeAr: "",
  isActive: true,
  isFeatured: false,
  sortOrder: 0,
});

export function ProductsManager() {
  const { canWrite } = useAdminUser();
  const { t, lang, isRTL } = useAdminLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [reordering, setReordering] = useState<string | null>(null);
  const [featuring, setFeaturing] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState(defaultForm());
  const editingIdRef = useRef<string | null>(null);

  console.log("🧠 CURRENT STATE:", { editing, form });

  function resetForm() {
    setForm(defaultForm());
    setEditing(null);
    setCreating(false);
    editingIdRef.current = null;
  }

  async function fetchProducts() {
    try {
      const res = await fetch("/api/admin/products");
      if (res.ok) setProducts(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "products");
      const res = await fetch("/api/admin/upload", { method: "POST", credentials: "include", body: fd });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Upload failed");
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

  const handleSave = async () => {
    console.log("🚀 HANDLE SAVE STARTED");

    const payload = {
      ...form,
      price: form.price ?? null,
      featuresEn: form.featuresEn,
      featuresAr: form.featuresAr,
      specsEn: form.specsEn || null,
      specsAr: form.specsAr || null,
      badgeEn: form.badgeEn || null,
      badgeAr: form.badgeAr || null,
      isFeatured: form.isFeatured ?? false,
    };

    console.log("STATE CHECK", { editing, editingIdRef: editingIdRef.current, payload });

    const id = editingIdRef.current ?? editing?.id;

    if (id) {
      const url = `/api/admin/products/${id}`;
      console.log("🌐 PUT URL:", url);

      setSaving(true);
      try {
        console.log("📦 PAYLOAD:", payload);

        const response = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });

        console.log("✅ RESPONSE STATUS:", response.status);

        const data = await response.json().catch(() => ({}));
        console.log("✅ RESPONSE DATA:", data);

        if (!response.ok) {
          console.error("❌ Failed to update product", data);
          throw new Error(data?.error || "Update failed");
        }

        alert("✅ Product updated successfully");

        await fetchProducts();
        setEditing(null);
        setForm(defaultForm());
        setCreating(false);
        editingIdRef.current = null;
      } catch (error) {
        console.error("🔥 SAVE ERROR:", error);
        alert(error instanceof Error ? error.message : "Failed to save");
      } finally {
        setSaving(false);
      }
      return;
    }

    if (creating) {
      if (!form.slug.trim() || !form.image || !form.titleEn.trim() || !form.titleAr.trim()) {
        alert("الرجاء إدخال الرابط والصور والعنوان");
        return;
      }
      setSaving(true);
      try {
        const res = await fetch("/api/admin/products", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err?.error || "Failed to create");
        }
        await fetchProducts();
        resetForm();
      } catch (err) {
        alert(err instanceof Error ? err.message : "Failed to save");
      } finally {
        setSaving(false);
      }
      return;
    }

    console.error("❌ editing is NULL and not creating - cannot save");
  };

  async function handleReorder(id: string, direction: "up" | "down") {
    setReordering(id);
    try {
      const res = await fetch("/api/admin/products/reorder", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, direction }),
      });
      if (res.ok) await fetchProducts();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to reorder");
    } finally {
      setReordering(null);
    }
  }

  async function handleSetFeatured(id: string) {
    setFeaturing(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: true }),
      });
      if (res.ok) await fetchProducts();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to set hero");
    } finally {
      setFeaturing(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm(t("products.confirmDelete"))) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) throw new Error("Failed to delete");
      await fetchProducts();
      if (editing?.id === id) resetForm();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setDeleting(null);
    }
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
      title={t("products.title")}
      subtitle={t("products.subtitle")}
      actions={
        canWrite ? (
          <button
            type="button"
            onClick={startCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-primary-700 hover:shadow-lg"
          >
            <Plus className="h-4 w-4" />
            {t("products.addProduct")}
          </button>
        ) : undefined
      }
    >
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>

      {canWrite && (creating || editing) && (
        <form
          onSubmit={(e) => {
            console.log("🔥 SUBMIT TRIGGERED");
            e.preventDefault();

            if (typeof handleSave !== "function") {
              console.error("❌ handleSave is NOT a function");
              return;
            }

            handleSave();
          }}
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="mb-5 text-base font-semibold text-slate-800">
            {editing ? t("products.editProduct") : t("products.newProduct")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">{t("products.slug")}</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") }))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
                placeholder="product-slug"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">{t("products.category")}</label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
                placeholder="pump, filter, etc"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">{t("products.image")}</label>
              <div className="flex items-center gap-2">
                {form.image ? (
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg border">
                    <img src={form.image} alt="" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, image: "" }))}
                      className="absolute top-0.5 right-0.5 rounded-full bg-red-500 p-1 text-white"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : null}
                <label className="flex h-16 w-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 text-slate-500 hover:border-primary-400">
                  {uploading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Upload className="h-6 w-6" />}
                  <span className="text-xs">{t("products.upload")}</span>
                  <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
                </label>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">{t("products.price")}</label>
              <input
                type="number"
                step="0.01"
                value={form.price ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value ? parseFloat(e.target.value) : null }))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">{t("products.titleEn")}</label>
              <input
                type="text"
                value={form.titleEn}
                onChange={(e) => setForm((f) => ({ ...f, titleEn: e.target.value }))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">{t("products.titleAr")}</label>
              <input
                type="text"
                value={form.titleAr}
                onChange={(e) => setForm((f) => ({ ...f, titleAr: e.target.value }))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">{t("products.subtitleEn")}</label>
              <input
                type="text"
                value={form.subtitleEn}
                onChange={(e) => setForm((f) => ({ ...f, subtitleEn: e.target.value }))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">{t("products.subtitleAr")}</label>
              <input
                type="text"
                value={form.subtitleAr}
                onChange={(e) => setForm((f) => ({ ...f, subtitleAr: e.target.value }))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">{t("products.shortDescAr")}</label>
              <textarea
                value={form.shortDescriptionAr}
                onChange={(e) => setForm((f) => ({ ...f, shortDescriptionAr: e.target.value }))}
                rows={2}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">{t("products.shortDescEn")}</label>
              <textarea
                value={form.shortDescriptionEn}
                onChange={(e) => setForm((f) => ({ ...f, shortDescriptionEn: e.target.value }))}
                rows={2}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">{t("products.fullDescAr")}</label>
              <textarea
                value={form.fullDescriptionAr}
                onChange={(e) => setForm((f) => ({ ...f, fullDescriptionAr: e.target.value }))}
                rows={3}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">{t("products.fullDescEn")}</label>
              <textarea
                value={form.fullDescriptionEn}
                onChange={(e) => setForm((f) => ({ ...f, fullDescriptionEn: e.target.value }))}
                rows={3}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">{t("products.warrantyAr")}</label>
              <input
                type="text"
                value={form.warrantyAr}
                onChange={(e) => setForm((f) => ({ ...f, warrantyAr: e.target.value }))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">{t("products.warrantyEn")}</label>
              <input
                type="text"
                value={form.warrantyEn}
                onChange={(e) => setForm((f) => ({ ...f, warrantyEn: e.target.value }))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">{t("products.displayOrder")}</label>
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) => setForm((f) => ({ ...f, sortOrder: parseInt(e.target.value) || 0 }))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
              />
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
                  className="rounded border-slate-300"
                />
                <span className="text-sm text-slate-700">{t("products.productActive")}</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => setForm((f) => ({ ...f, isFeatured: e.target.checked }))}
                  className="rounded border-slate-300"
                />
                <span className="text-sm text-slate-700">{t("products.heroProduct")}</span>
              </label>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-primary-700 disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {t("common.save")}
            </button>
            <button
              type="button"
              onClick={() => {
                console.log("🛑 EDIT CANCELLED");
                setEditing(null);
                editingIdRef.current = null;
                setForm(defaultForm());
                setCreating(false);
              }}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            >
              {t("common.cancel")}
            </button>
          </div>
        </form>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-slate-50/80 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-800">{t("products.productList")}</h2>
        </div>
        {products.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 py-12 text-center text-slate-500">
            {t("products.noProducts")}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-200 bg-slate-50/80">
                <tr>
                  <th className={`px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 ${isRTL ? "text-right" : "text-left"}`}>{t("products.image")}</th>
                  <th className={`px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 ${isRTL ? "text-right" : "text-left"}`}>{t("common.title")}</th>
                  <th className={`px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 ${isRTL ? "text-right" : "text-left"}`}>{t("products.category")}</th>
                  <th className={`px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 ${isRTL ? "text-right" : "text-left"}`}>{t("products.priceCol")}</th>
                  <th className={`px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 ${isRTL ? "text-right" : "text-left"}`}>{t("products.orderCol")}</th>
                  <th className={`px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 ${isRTL ? "text-right" : "text-left"}`}>{t("products.heroCol")}</th>
                  <th className={`px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 ${isRTL ? "text-right" : "text-left"}`}>{t("common.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-slate-100 transition-colors hover:bg-slate-50/50">
                    <td className="px-5 py-3.5">
                      <div className="h-12 w-12 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                        {p.image ? (
                          <img src={p.image} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <ImageIcon className="h-5 w-5 text-slate-400" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-slate-800">{lang === "ar" ? (p.titleAr || p.titleEn) : (p.titleEn || p.titleAr)}</td>
                    <td className="px-5 py-3.5 text-slate-600">{p.category}</td>
                    <td className="px-5 py-3.5 text-slate-600">{p.price != null ? p.price : "—"}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleReorder(p.id, "up")}
                          disabled={reordering === p.id || products.findIndex((x) => x.id === p.id) === 0}
                          className="rounded p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-40"
                          title={t("products.moveUp")}
                        >
                          <ChevronUp className="h-4 w-4" />
                        </button>
                        <span className="min-w-[1.5rem] text-center text-slate-600">{p.sortOrder}</span>
                        <button
                          onClick={() => handleReorder(p.id, "down")}
                          disabled={reordering === p.id || products.findIndex((x) => x.id === p.id) === products.length - 1}
                          className="rounded p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-40"
                          title={t("products.moveDown")}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      {canWrite && (
                        <button
                          onClick={() => handleSetFeatured(p.id)}
                          disabled={featuring === p.id || (p as Product).isFeatured}
                          className={`rounded-lg p-2 transition-colors ${
                            (p as Product).isFeatured
                              ? "bg-amber-100 text-amber-600"
                              : "border border-slate-200 text-slate-400 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-600"
                          }`}
                          title={t("products.setAsHero")}
                        >
                          {featuring === p.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Star className={`h-4 w-4 ${(p as Product).isFeatured ? "fill-current" : ""}`} />}
                        </button>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      {canWrite && (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              console.log("✏️ EDIT CLICKED", p);
                              setEditing(p);
                              editingIdRef.current = p.id;
                              setForm({
                                slug: p.slug,
                                image: p.image,
                                price: p.price,
                                titleEn: p.titleEn,
                                titleAr: p.titleAr,
                                subtitleEn: p.subtitleEn,
                                subtitleAr: p.subtitleAr,
                                shortDescriptionEn: p.shortDescriptionEn,
                                shortDescriptionAr: p.shortDescriptionAr,
                                fullDescriptionEn: p.fullDescriptionEn,
                                fullDescriptionAr: p.fullDescriptionAr,
                                warrantyEn: p.warrantyEn,
                                warrantyAr: p.warrantyAr,
                                featuresEn: p.featuresEn,
                                featuresAr: p.featuresAr,
                                specsEn: p.specsEn ?? "",
                                specsAr: p.specsAr ?? "",
                                category: p.category,
                                badgeEn: p.badgeEn ?? "",
                                badgeAr: p.badgeAr ?? "",
                                isActive: p.isActive,
                                isFeatured: (p as Product).isFeatured ?? false,
                                sortOrder: p.sortOrder,
                              });
                              setCreating(false);
                            }}
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 shadow-sm transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600"
                            title={t("common.edit")}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            disabled={deleting === p.id}
                            className="rounded-lg border border-red-200 p-2 text-red-600 shadow-sm transition-colors hover:bg-red-50 disabled:opacity-50"
                            title={t("common.delete")}
                          >
                            {deleting === p.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
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
