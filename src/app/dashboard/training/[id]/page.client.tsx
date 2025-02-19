"use client";

import { Box, Text, VStack, Flex, Badge, Button } from "@chakra-ui/react";
import { ArrowIcon } from "@/assets/IconSet";
import { useRouter } from "next/navigation";

interface TrainingDetailProps {
  id: string;
  title: string;
  detail: string;
  type: string;
  files: string[];
  todos: string[];
}

export default function TrainingDetail({
  id,
  title,
  detail,
  type,
  files,
  todos,
}: TrainingDetailProps) {
  const router = useRouter();

  return (
    <Box h="100%">
      <VStack pt={70} pb={30} px={45} spacing={6} align="flex-start">
        <Text fontSize={32} fontWeight="medium" textStyle="gradient2">
          과연 어떤 시나리오의 훈련일까요?
        </Text>
        <Text fontSize="m" color="grey.shade2" fontWeight="regular">
          언제든지 훈련을 시작 수 있어요!
        </Text>
      </VStack>
      <Flex maxW={1280} px={40} gap={10}>
        {/* 좌측 영역*/}
        <VStack w="70%" bg="white" p={26} borderRadius={14} align="flex-start">
          {/* 상단*/}
          <VStack spacing={16} align="flex-start">
            <Flex
              gap={4}
              color="#B3B3B3"
              align="center"
              onClick={() => router.push("/dashboard/training")}
              _hover={{ cursor: "pointer", transform: "scale(1.02)" }}
            >
              <ArrowIcon boxSize={24} />
              <Text fontSize="s" fontWeight="regular">
                리스트로 돌아가기
              </Text>
            </Flex>
            <Text fontSize="l" fontWeight="semibold">
              {title}
            </Text>
            <Text fontSize="s" fontWeight="regular">
              {detail}
            </Text>
          </VStack>
          {/* 중단*/}
          <VStack align="flex-start" spacing={10} py={20}>
            <Flex gap={8}>
              <Text fontSize="s" fontWeight="medium">
                첨부파일
              </Text>
              <Flex
                px={10}
                bg="primary"
                color="white"
                borderRadius={14}
                fontSize="xs"
                fontWeight="medium"
                align="center"
              >
                {files.length}
              </Flex>
            </Flex>

            {files.map((file, index) => (
              <Text key={index} fontSize="s" fontWeight="regular">
                {file}
              </Text>
            ))}
          </VStack>

          {/* 하단*/}
          <Flex align="end" justify="space-between" w="100%">
            <Flex gap={10} align="center">
              <Badge>{type}</Badge>
              <Text fontSize="s" fontWeight="regular" color="#B3B3B3">
                이 훈련은 지금까지 2명이 성공했어요
              </Text>
            </Flex>
            <Button w={95} h={35} bg="success" fontSize="s" fontWeight="medium">
              수락 및 시작
            </Button>
          </Flex>
        </VStack>

        {/* 우측 영역*/}
        <Flex
          flex="1"
          bg="white"
          p={26}
          borderRadius={14}
          justify="space-between"
          flexDirection="column"
        >
          <VStack align="flex-start">
            <Text mb={16} fontSize="l" fontWeight="semibold">
              ✅ 이 훈련의 To-Do
            </Text>
            {todos.map((todo, index) => (
              <Text key={index} fontSize="s" fontWeight="regular">
                {index + 1}. {todo}
              </Text>
            ))}
          </VStack>
          <Text mt="auto" color="#B3B3B3" fontSize="s" fontWeight="regular">
            {todos.length}개의 To-Do
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
