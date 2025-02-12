import RegisterPage from "./page.client";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const session = await auth();

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (user) {
      return redirect("/dashboard");
    }
  } else {
    return redirect("/login");
  }

  return <RegisterPage />;
}
