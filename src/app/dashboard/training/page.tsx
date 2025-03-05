import DashboardTrainingPage from "./page.client";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function DashboardTraining() {
  const session = await auth();

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (user) {
      const scenarios = await prisma.scenario.findMany({
        where: { isPublic: true },
      });
      const trainingList = await prisma.training.findMany({
        where: { memberId: user.memberId, status: { not: "FAIL" } },
        include: {
          scenario: true,
        },
      });

      const currentScenarioList = trainingList
        .filter((training) => training.status === "ACTIVE")
        .map((training) => training.scenario);

      const completedScenarioList = trainingList
        .filter((training) => training.status === "COMPLETE")
        .map((training) => training.scenario);

      const newScenarioList = scenarios.filter(
        (scenario) =>
          !currentScenarioList.find(
            (currentScenario) =>
              currentScenario.scenarioId === scenario.scenarioId
          ) &&
          !completedScenarioList.find(
            (completedScenario) =>
              completedScenario.scenarioId === scenario.scenarioId
          )
      );

      return (
        <DashboardTrainingPage
          currentScenarioList={currentScenarioList}
          completedScenarioList={completedScenarioList}
          newScenarioList={newScenarioList}
        />
      );
    } else {
      return redirect("/signup");
    }
  } else {
    return redirect("/login");
  }
}
