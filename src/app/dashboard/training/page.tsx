import DashboardTrainingPage from "./page.client";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function DashboardTraining() {
  const session = await auth();

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (user) {
      const scenarios = await prisma.scenario.findMany();
      const trainingList = await prisma.training.findMany({
        where: { memberId: user.memberId },
        include:{
          scenario: true,
        }
      });
      const currentScenarioList = trainingList.map((training) => training.scenario);
      
      return (
        <DashboardTrainingPage
          currentScenarioList={currentScenarioList}
          scenarioList={scenarios}
        />
      );
    } else {
      return redirect("/signup");
    }
  } else {
    return redirect("/login");
  }
}
