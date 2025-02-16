"use client";

import { ArrowIcon } from "@/assets/IconSet";
import { Box, Text, VStack, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function DashboardMailPage() {
  const router = useRouter();

  return (
    <Box h="100%">
      <VStack pt={70} pb={30} px={45} spacing={6} align="flex-start">
        <Text fontSize={32} fontWeight="medium" textStyle="gradient2">
          어떤 훈련을 시작하시겠어요?
        </Text>
        <Text fontSize="m" color="grey.shade2" fontWeight="regular">
          어렵더라도 시도하다 보면 얻는게 있을거에요!
        </Text>
      </VStack>

      <VStack w={1280} px={40} spacing={20}>
        {/* 진행 중인 훈련 목록 */}
        <VStack w="100%" spacing={10} align="flex-start">
          <Text fontSize="l" fontWeight="medium" color="grey.shade2">
            진행 중인 훈련
          </Text>
        </VStack>

        {/* 새로운 훈련 목록 */}
        <VStack w="100%" spacing={10} align="flex-start">
          <Text fontSize="l" fontWeight="medium" color="grey.shade2">
            새로운 훈련 목록
          </Text>
        </VStack>

        {/* 준비된 훈련이 없을 경우 표시 */}
        <VStack w="100%" spacing={10} align="center">
          <Text fontSize="xl" fontWeight="medium" color="grey.shade2">
            준비된 훈련 시나리오가 없습니다. 잠시만 기다려 주세요!
          </Text>
          <Flex
            gap={5}
            align="center"
            onClick={() => router.push("/dashboard")}
            _hover={{
              cursor: "pointer",
              transform: "scale(1.02)",
              transition: "0.2s",
            }}
          >
            <Text fontSize="m" fontWeight="regular" color="#ABABAB">
              새로운 훈련을 기다려보세요!
            </Text>
            <ArrowIcon boxSize={24} color="#ABABAB" transform="scaleX(-1)" />
          </Flex>
        </VStack>
      </VStack>
    </Box>
  );
}
