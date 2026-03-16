"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, UserX, UserCheck, Trash2, Shield, Edit3, Eye } from "lucide-react";
import { AdminPageWrapper } from "@/components/admin/AdminPageWrapper";
import { useAdminLanguage } from "@/hooks/useAdminLanguage";

type User = {
  id: string;
  email: string;
  name: string | null;
  role: string;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
};

export default function AdminUsersPage() {
  const router = useRouter();
  const { t, lang, isRTL } = useAdminLanguage();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    role: "editor" as "super_admin" | "editor" | "viewer",
  });

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (res.status === 403) {
        router.push("/admin");
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setUsers(data);
    } catch {
      setError(t("users.failedToLoad"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setModal(null);
      setForm({ email: "", name: "", password: "", role: "editor" });
      fetchUsers();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setError("");
    try {
      const body: Record<string, unknown> = {
        name: form.name,
        email: form.email,
        role: form.role,
      };
      if (form.password) body.password = form.password;
      const res = await fetch(`/api/admin/users/${editingUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setModal(null);
      setEditingUser(null);
      setForm({ email: "", name: "", password: "", role: "editor" });
      fetchUsers();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    }
  };

  const handleDeactivate = async (u: User) => {
    if (!confirm(t("users.confirmDeactivate", { email: u.email }))) return;
    try {
      const res = await fetch(`/api/admin/users/${u.id}/deactivate`, {
        method: "PATCH",
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }
      fetchUsers();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed");
    }
  };

  const handleActivate = async (u: User) => {
    try {
      const res = await fetch(`/api/admin/users/${u.id}/activate`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Failed");
      fetchUsers();
    } catch {
      alert(t("users.failedToActivate"));
    }
  };

  const handleDelete = async (u: User) => {
    if (!confirm(t("users.confirmDeleteUser", { email: u.email }))) return;
    try {
      const res = await fetch(`/api/admin/users/${u.id}`, { method: "DELETE" });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }
      fetchUsers();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed");
    }
  };

  const openEdit = (u: User) => {
    setEditingUser(u);
    setForm({
      email: u.email,
      name: u.name || "",
      password: "",
      role: u.role as "super_admin" | "editor" | "viewer",
    });
    setModal("edit");
  };

  const roleIcon = (r: string) => {
    if (r === "super_admin") return <Shield className="h-4 w-4" />;
    if (r === "editor") return <Edit3 className="h-4 w-4" />;
    return <Eye className="h-4 w-4" />;
  };

  return (
    <AdminPageWrapper
      title={t("users.title")}
      subtitle={t("users.subtitle")}
    >
      <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={() => {
              setModal("create");
              setForm({ email: "", name: "", password: "", role: "editor" });
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
          >
            <Plus className="h-4 w-4" />
            {t("users.addUser")}
          </button>
        </div>

        {loading ? (
          <p className="text-slate-500">{t("common.loading")}</p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">
                    {t("users.name")}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">
                    {t("users.role")}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">
                    {t("common.status")}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">
                    {t("users.lastLogin")}
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase text-slate-500">
                    {t("common.actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-slate-900">
                          {u.name || u.email}
                        </p>
                        <p className="text-sm text-slate-500">{u.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                        {roleIcon(u.role)}
                        {u.role === "super_admin" ? t("users.superAdmin") : u.role === "editor" ? t("users.editor") : t("users.viewer")}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          u.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {u.isActive ? t("users.active") : t("users.inactive")}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500">
                      {u.lastLoginAt
                        ? new Date(u.lastLoginAt).toLocaleString(lang === "ar" ? "ar-KW" : "en-US")
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEdit(u)}
                          className="rounded p-2 text-slate-600 hover:bg-slate-100"
                          title={t("common.edit")}
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        {u.isActive ? (
                          <button
                            onClick={() => handleDeactivate(u)}
                            className="rounded p-2 text-amber-600 hover:bg-amber-50"
                            title={t("users.deactivate")}
                          >
                            <UserX className="h-4 w-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleActivate(u)}
                            className="rounded p-2 text-green-600 hover:bg-green-50"
                            title={t("users.activate")}
                          >
                            <UserCheck className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(u)}
                          className="rounded p-2 text-red-600 hover:bg-red-50"
                          title={t("common.delete")}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900">
              {modal === "create" ? t("users.addUser") : t("users.editUser")}
            </h2>
            <form
              onSubmit={modal === "create" ? handleCreate : handleUpdate}
              className="mt-4 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  {t("users.name")}
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  {t("users.email")}
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  required
                  disabled={modal === "edit"}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 disabled:bg-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  {t("users.password")} {modal === "edit" && t("users.passwordLeaveBlank")}
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  required={modal === "create"}
                  minLength={6}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  {t("users.role")}
                </label>
                <select
                  value={form.role}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      role: e.target.value as "super_admin" | "editor" | "viewer",
                    }))
                  }
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800"
                >
                  <option value="super_admin">{t("users.superAdmin")}</option>
                  <option value="editor">{t("users.editor")}</option>
                  <option value="viewer">{t("users.viewer")}</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setModal(null);
                    setEditingUser(null);
                  }}
                  className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
                >
                  {t("common.cancel")}
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
                >
                  {modal === "create" ? t("users.create") : t("common.save")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminPageWrapper>
  );
}
