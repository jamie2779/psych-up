import DashboardMailPage from "./page.client";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function DashboardMail() {
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
          scenario: true,
          todoHolders: true,
        },
      });

      return <DashboardMailPage trainingList={trainingList} />;
    } else {
      return redirect("/signup");
    }
  } else {
    return redirect("/login");
  }
}
