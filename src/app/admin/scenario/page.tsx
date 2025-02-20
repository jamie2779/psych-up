import AdminScenario from "./page.client";
import prisma from "@/lib/prisma";

export default async function AdminScenarioPage() {
  const scenarioList = await prisma.scenario.findMany({
    include: {
      todos: true,
    },
  });
  return <AdminScenario scenarioList={scenarioList} />;
}
