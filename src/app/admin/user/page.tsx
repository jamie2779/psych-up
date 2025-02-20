import AdminUser from "./page.client";
import prisma from "@/lib/prisma";

export default async function AdminUserPage() {
  const users = await prisma.user.findMany();
  return <AdminUser users={users} />;
}
