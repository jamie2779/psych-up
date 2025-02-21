"use client";
import { Text, Flex, VStack, Badge } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface TrainingCellProps {
  id: number;
  type: string;
  title: string;
  detail: string;
}

export default function TrainingCell({
  id,
  type,
  title,
  detail,
}: TrainingCellProps) {
  const router = useRouter();
  return (
    <Flex
      h={200}
      bg="white"
      p={26}
      borderRadius={14}
      justify="space-between"
      flexDirection="column"
      onClick={() => router.push(`/dashboard/training/${id}`)}
      _hover={{
        cursor: "pointer",
        boxShadow: "0px 4px 20px rgba(0, 31, 99, 0.05)",
        transform: "scale(1.02)",
      }}
    >
      <VStack spacing={16} align="flex-start">
        <Text fontSize="l" fontWeight="semibold">
          {title}
        </Text>
        <Text fontSize="s" fontWeight="regular">
          {detail}
        </Text>
      </VStack>
      <Badge>{type}</Badge>
    </Flex>
  );
}
