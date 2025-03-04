import DashboardHome from "./page.client";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function DashboardHomePage() {
  const session = await auth();

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (user) {
      const trainingList = await prisma.training.findMany({
        where: {
          memberId: user.memberId,
          status: {
            not: "FAIL",
          },
        },
        include: {
          todoHolders: true,
          mailHolders: {
            include: {
              mail: true,
            },
          },
        },
      });
      const activeList = trainingList.filter(
        (training) => training.status === "ACTIVE"
      );

      const totalActiveTodo = activeList.reduce(
        (acc, training) => acc + training.todoHolders.length,
        0
      );

      const completedActiveTodo = activeList.reduce(
        (acc, training) =>
          acc +
          training.todoHolders.filter((todoHolder) => todoHolder.isCompleted)
            .length,
        0
      );

      const completeList = trainingList.filter(
        (training) => training.status === "COMPLETE"
      );

      const todoCount = trainingList.reduce(
        (acc, training) =>
          acc +
          training.todoHolders.filter((todoHolder) => todoHolder.isCompleted)
            .length,
        0
      );

      const mailCount = trainingList.reduce(
        (acc, training) => acc + training.mailHolders.length,
        0
      );

      const fishingCount = completeList.reduce(
        (acc, training) =>
          acc +
          training.mailHolders.filter((holder) => holder.mail.isFishing).length,
        0
      );

      const fooledCount = completeList.reduce(
        (acc, training) =>
          acc +
          training.mailHolders.filter(
            (holder) =>
              holder.mail.isFishing && (holder.isFooled || holder.isDownloaded)
          ).length,
        0
      );

      const totalScore = completeList.reduce(
        (acc, training) => acc + (training.score ? training.score : 0),
        0
      );

      return (
        <DashboardHome
          user={user}
          totalActiveTodo={totalActiveTodo}
          completedActiveTodo={completedActiveTodo}
          trainingCount={trainingList.length}
          fishingCount={fishingCount}
          fooledCount={fooledCount}
          mailCount={mailCount}
          todoCount={todoCount}
          totalScore={totalScore}
        />
      );
    } else {
      return redirect("/signup");
    }
  } else {
    return redirect("/login");
  }
}
