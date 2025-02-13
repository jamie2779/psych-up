"use client";
import DashboardNav from "@/components/DashboardNav";
import { Flex, Box } from "@chakra-ui/react";
import { User } from "@prisma/client";

interface DashboardPageProps {
  user: User;
}

export default function DashboardPage({ user }: DashboardPageProps) {
  return (
    <>
      <Flex backgroundColor="body">
        <DashboardNav user={user} />
        <Box h="100%"></Box>
      </Flex>
    </>
  );
}
