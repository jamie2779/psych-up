import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import MailNav from "@/components/mail/MailNav";
import AnimationWrapper from "@/components/AnimationWrapper";
import { Flex, Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

interface MailLayoutProps {
  children: ReactNode;
  params: { id?: string };
}

export default async function MailLayout({
  children,
  params,
}: MailLayoutProps) {
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

  if (!params?.id) {
    return redirect("/404");
  }

  const trainingId = Number(params.id);

  if (Number.isNaN(trainingId)) {
    return redirect("/404");
  }

  const training = await prisma.training.findFirst({
    where: {
      memberId: user.memberId,
      trainingId: trainingId,
      status: {
        not: "FAIL",
      },
    },
  });

  if (!training) {
    return redirect("/404");
  }

  return (
    <Flex backgroundColor="body">
      <MailNav user={user} />
      <Box h="100vh" flex="1" overflow="auto">
        <AnimationWrapper>{children}</AnimationWrapper>
      </Box>
    </Flex>
  );
}
