import { getSession } from "@/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await getSession();
  return <>{children}</>;
}
