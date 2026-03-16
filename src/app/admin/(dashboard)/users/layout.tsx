import { redirect } from "next/navigation";
import { getSessionWithUser } from "@/lib/auth-helpers";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const result = await getSessionWithUser();
  if (!result) redirect("/admin/login?callbackUrl=/admin/users");
  const role = result.user.role;
  if (role !== "super_admin" && role !== "admin") {
    redirect("/admin");
  }
  return <>{children}</>;
}
