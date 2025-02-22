import AdminScenario from "./page.client";
import prisma from "@/lib/prisma";

export default async function AdminScenarioPage() {
  const scenarioList = await prisma.scenario.findMany({
    include: {
      todos: true,
      scenarioFiles: {
        include: {
          file: true,
        },
      },
      scenarioMails: {
        include: {
          mail: true,
        },
      },
    },
    orderBy: {
      scenarioId: "asc",
    },
  });
  return <AdminScenario scenarioList={scenarioList} />;
}
