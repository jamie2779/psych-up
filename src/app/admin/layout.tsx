import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import AdminNav from "@/components/admin/AdminNav";
import AnimationWrapper from "@/components/AnimationWrapper";
import { Flex, Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { Permission } from "@prisma/client";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await auth();

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (user && user.permission === Permission.admin) {
      return (
        <Flex backgroundColor="body">
          <AdminNav user={user} />
          <Box flex="1" h="100vh" overflowY="auto">
            <Box overflowX="visible">
              <AnimationWrapper>{children}</AnimationWrapper>
            </Box>
          </Box>
        </Flex>
      );
    }
  }

  return redirect("/404");
}
