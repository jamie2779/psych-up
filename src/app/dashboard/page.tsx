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
      return <DashboardHome user={user} totalTodo={12} completedTodo={5} />;
    } else {
      return redirect("/signup");
    }
  } else {
    return redirect("/login");
  }
}
