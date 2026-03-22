"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Save,
  Wrench,
  Flame,
  Filter,
  Gauge,
  Droplets,
  Zap,
  Settings,
} from "lucide-react";
import { AdminPageWrapper } from "./AdminPageWrapper";
import { useAdminUser } from "./AdminUserContext";
import { useAdminLanguage } from "@/hooks/useAdminLanguage";

type MaintenanceService = {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  icon: string | null;
  image: string | null;
  category: string | null;
  isActive: boolean;
  displayOrder: number;
};

const defaultForm = () => ({
  titleEn: "",
  titleAr: "",
  descriptionEn: "",
  descriptionAr: "",
  icon: null as string | null,
  image: null as string | null,
  category: "",
  isActive: true,
  displayOrder: 0,
});

export function MaintenanceServicesManager() {
  const { canWrite } = useAdminUser();
  const { t, lang, isRTL } = useAdminLanguage();
  const [services, setServices] = useState<MaintenanceService[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<MaintenanceService | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [bootstrapping, setBootstrapping] = useState(false);
  const [form, setForm] = useState(defaultForm());

  const ICON_OPTIONS = ["Flame", "Filter", "Gauge", "Droplets", "Wrench", "Zap", "Settings"];
  const ICON_COMPONENTS: Record<string, typeof Wrench> = {
    Flame, Filter, Gauge, Droplets, Wrench, Zap, Settings,
  };

  function resetForm() {
    setForm(defaultForm());
    setEditing(null);
    setCreating(false);
  }

  async function fetchServices() {
    try {
      const res = await fetch("/api/admin/maintenance-services");
      if (res.ok) setServices(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchServices();
  }, []);

  async function handleSave() {
    if (!form.titleEn.trim() || !form.titleAr.trim()) {
      alert(t("errors.enterTitleBoth"));
      return;
    }
    setSaving(true);
    try {
      const payload = {
        titleEn: form.titleEn.trim(),
        titleAr: form.titleAr.trim(),
        descriptionEn: form.descriptionEn.trim() || form.titleEn,
        descriptionAr: form.descriptionAr.trim() || form.titleAr,
        icon: form.icon ?? null,
        image: form.image ?? null,
        category: form.category.trim() || null,
        isActive: form.isActive,
        displayOrder: form.displayOrder,
      };
      if (editing) {
        console.log("[admin/maintenance/ui] submit payload id:", editing.id);
        const res = await fetch(
          `/api/admin/maintenance-services/${editing.id}`,
          {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err?.error || (res.status === 401 ? "Session expired – please sign in again" : "Failed to update"));
        }
      } else {
        const res = await fetch("/api/admin/maintenance-services", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err?.error || (res.status === 401 ? "Session expired – please sign in again" : "Failed to create"));
        }
      }
      await fetchServices();
      resetForm();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  async function handleBootstrap(replace = false) {
    const msg = replace
      ? (t("maintenance.confirmReset") || "Replace ALL maintenance services with the 6 defaults? This will delete existing data.")
      : (t("maintenance.confirmBootstrap") || "Seed default maintenance services? This only runs when the table is empty.");
    if (!confirm(msg)) return;
    setBootstrapping(true);
    try {
      const url = replace ? "/api/admin/maintenance-services/bootstrap?replace=1" : "/api/admin/maintenance-services/bootstrap";
      const res = await fetch(url, { method: "POST", credentials: "include" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Bootstrap failed");
      await fetchServices();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Bootstrap failed");
    } finally {
      setBootstrapping(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm(t("maintenance.confirmDeleteService")))
      return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/maintenance-services/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete");
      await fetchServices();
      if (editing?.id === id) resetForm();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setDeleting(null);
    }
  }

  function startEdit(s: MaintenanceService) {
    console.log("[admin/maintenance/ui] edit clicked id:", s.id);
    setEditing(s);
    setForm({
      titleEn: s.titleEn,
      titleAr: s.titleAr,
      descriptionEn: s.descriptionEn,
      descriptionAr: s.descriptionAr,
      icon: s.icon ?? null,
      image: s.image ?? null,
      category: s.category ?? "",
      isActive: s.isActive,
      displayOrder: s.displayOrder,
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
      title={t("maintenance.servicesTitle")}
      subtitle={t("maintenance.servicesSubtitle")}
      actions={canWrite ? (
        <div className="flex flex-wrap gap-2">
          {services.length === 0 ? (
            <button
              onClick={() => handleBootstrap(false)}
              disabled={bootstrapping}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-amber-500 bg-amber-50 px-5 py-2.5 text-sm font-semibold text-amber-800 shadow-sm transition-colors hover:bg-amber-100 disabled:opacity-50"
            >
              {bootstrapping ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Wrench className="h-4 w-4" />
              )}
              {t("maintenance.seedDefaults") || "Seed default services"}
            </button>
          ) : (
            <button
              onClick={() => handleBootstrap(true)}
              disabled={bootstrapping}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-amber-500 bg-amber-50 px-5 py-2.5 text-sm font-semibold text-amber-800 shadow-sm transition-colors hover:bg-amber-100 disabled:opacity-50"
            >
              {bootstrapping ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Wrench className="h-4 w-4" />
              )}
              {t("maintenance.resetToDefaults") || "Reset to defaults"}
            </button>
          )}
          <button
            onClick={startCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-primary-700 hover:shadow-lg"
          >
            <Plus className="h-4 w-4" />
            {t("maintenance.addService")}
          </button>
        </div>
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
            {editing ? t("maintenance.editService") : t("maintenance.newService")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                {t("maintenance.titleAr")} *
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
                {t("maintenance.titleEn")} *
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
                {t("maintenance.descriptionAr")}
              </label>
              <textarea
                value={form.descriptionAr}
                onChange={(e) =>
                  setForm((f) => ({ ...f, descriptionAr: e.target.value }))
                }
                rows={3}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                {t("maintenance.descriptionEn")}
              </label>
              <textarea
                value={form.descriptionEn}
                onChange={(e) =>
                  setForm((f) => ({ ...f, descriptionEn: e.target.value }))
                }
                rows={3}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                {t("maintenance.icon")}
              </label>
              <select
                value={form.icon ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, icon: e.target.value || null }))
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
              >
                <option value="">—</option>
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                {t("common.category")}
              </label>
              <input
                type="text"
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
                placeholder="maintenance"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                {t("maintenance.sortOrder")}
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
                {t("maintenance.serviceActive")}
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
            {t("maintenance.serviceList")}
          </h2>
        </div>
        {services.length === 0 ? (
          <p className="p-6 text-slate-500">
            {t("maintenance.noServices")}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-right font-medium text-slate-700">
                    {t("maintenance.icon")}
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-slate-700">
                    {t("common.title")}
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-slate-700">
                    {t("maintenance.sortOrder")}
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-slate-700">
                    {t("common.active")}
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-slate-700">
                    {t("common.actions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.id} className="border-b border-slate-100">
                    <td className="px-4 py-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
                        {(() => {
                          const IconC = ICON_COMPONENTS[s.icon ?? ""] ?? Wrench;
                          return <IconC className="h-5 w-5 text-primary-600" />;
                        })()}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {lang === "ar" ? (s.titleAr || s.titleEn) : (s.titleEn || s.titleAr)}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{s.displayOrder}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          s.isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {s.isActive ? t("common.active") : t("common.inactive")}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {canWrite && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(s)}
                            className="rounded-lg border border-slate-300 p-2 text-slate-600 hover:bg-slate-50 hover:text-primary-600"
                            title={t("common.edit")}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(s.id)}
                            disabled={deleting === s.id}
                            className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                            title={t("common.delete")}
                          >
                            {deleting === s.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
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
