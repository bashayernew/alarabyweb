"use client";

import { createContext, useContext } from "react";

type AdminUserContextValue = {
  userRole: string;
  canWrite: boolean;
  canManageUsers: boolean;
  canViewLogs: boolean;
  canExport: boolean;
};

const AdminUserContext = createContext<AdminUserContextValue | null>(null);

export function AdminUserProvider({
  children,
  userRole,
}: {
  children: React.ReactNode;
  userRole: string;
}) {
  const canWrite =
    userRole === "super_admin" || userRole === "admin" || userRole === "editor";
  const canManageUsers =
    userRole === "super_admin" || userRole === "admin";
  const canViewLogs = canManageUsers;
  const canExport = canWrite;

  return (
    <AdminUserContext.Provider
      value={{
        userRole,
        canWrite,
        canManageUsers,
        canViewLogs,
        canExport,
      }}
    >
      {children}
    </AdminUserContext.Provider>
  );
}

export function useAdminUser() {
  const ctx = useContext(AdminUserContext);
  return ctx ?? {
    userRole: "viewer",
    canWrite: false,
    canManageUsers: false,
    canViewLogs: false,
    canExport: false,
  };
}
