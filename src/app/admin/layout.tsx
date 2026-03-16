import { AdminLanguageProvider } from "@/hooks/useAdminLanguage";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminLanguageProvider>
      {children}
    </AdminLanguageProvider>
  );
}
