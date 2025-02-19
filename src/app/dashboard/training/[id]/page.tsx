"use client";

import { useParams } from "next/navigation";
import { Box, Text } from "@chakra-ui/react";

export default function TrainingDetailPage() {
  const { id } = useParams(); // ✅ 현재 동적 URL의 id 가져오기

  return (
    <Box p={10}>
      <Text fontSize="l" fontWeight="bold">
        훈련 상세 페이지: {id}
      </Text>
    </Box>
  );
}
