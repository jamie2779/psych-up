"use client";
import { Text, Flex, VStack, Badge } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Scenario } from "@prisma/client";

interface TrainingCellProps {
  scenario: Scenario;
}

export default function TrainingCell({ scenario }: TrainingCellProps) {
  const router = useRouter();
  return (
    <Flex
      h={200}
      bg="white"
      p={26}
      borderRadius={14}
      justify="space-between"
      flexDirection="column"
      onClick={() => router.push(`/dashboard/training/${scenario.scenarioId}`)}
      _hover={{
        cursor: "pointer",
        boxShadow: "0px 4px 20px rgba(0, 31, 99, 0.05)",
        transform: "scale(1.02)",
      }}
    >
      <VStack spacing={16} align="flex-start">
        <Text fontSize="l" fontWeight="semibold">
          {scenario.title}
        </Text>
        <Text fontSize="s" fontWeight="regular">
          {scenario.detail}
        </Text>
      </VStack>
      <Badge>{scenario.type}</Badge>
    </Flex>
  );
}
