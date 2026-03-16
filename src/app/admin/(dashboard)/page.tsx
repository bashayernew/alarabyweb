import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminPageWrapper } from "@/components/admin/AdminPageWrapper";

export default function AdminPage() {
  return (
    <AdminPageWrapper
      title="Dashboard"
      subtitle="Manage orders, service requests, and export data"
    >
      <AdminDashboard />
    </AdminPageWrapper>
  );
}
