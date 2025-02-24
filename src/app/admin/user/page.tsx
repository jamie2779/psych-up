import AdminUser from "./page.client";
import prisma from "@/lib/prisma";

export default async function AdminUserPage() {
  const users = await prisma.user.findMany({
    orderBy: {
      memberId: "asc",
    },
  });
  return <AdminUser users={users} />;
}
