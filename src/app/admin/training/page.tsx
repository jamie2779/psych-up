import AdminUser from "./page.client";
import prisma from "@/lib/prisma";

export default async function AdminUserPage() {
  const scenarioList = await prisma.scenario.findMany({
    include: {
      todos: true,
    },
  });
  return <AdminUser scenarioList={scenarioList} />;
}
