import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import DashboardNav from "@/components/dashboard/DashboardNav";
import AnimationWrapper from "@/components/AnimationWrapper";
import { Flex, Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await auth();

  if (!session?.user?.email) {
    return redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return redirect("/signup");
  }

  return (
    <Flex backgroundColor="body">
      <DashboardNav user={user} />
      <Box h="100vh" flex="1" overflow="auto">
        <AnimationWrapper>{children}</AnimationWrapper>
      </Box>
    </Flex>
  );
}
