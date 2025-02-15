"use client";
import PassBadge from "@/assets/dashboard/PassBadge.svg";
import WarningBadge from "@/assets/dashboard/WarningBadge.svg";
import FailBadge from "@/assets/dashboard/FailBadge.svg";

import { Image } from "@chakra-ui/next-js";
import { Box, Text, VStack, Flex } from "@chakra-ui/react";
import { User } from "@prisma/client";
import { ArrowIcon } from "@/assets/IconSet";
import { PieChart, Pie, Cell } from "recharts";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface DashboardHomePageProps {
  user: User;
  currentTraining: number;
  totalTodo: number;
  completedTodo: number;
}

interface TrainingData {
  badge: string;
  text: string;
  data: number;
}

interface MailData {
  title: string;
  color: string;
  count: number;
}

export default function DashboardHome({
  user,
  currentTraining,
  totalTodo,
  completedTodo,
}: DashboardHomePageProps) {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const trainingData: TrainingData[] = [
    {
      badge: PassBadge,
      text: "이번주에 성공한 훈련",
      data: 10,
    },
    {
      badge: WarningBadge,
      text: "이번주에 포기한 훈련",
      data: 3,
    },
    {
      badge: FailBadge,
      text: "이번주에 실패한 훈련",
      data: 5,
    },
  ];

  const mailData: MailData[] = [
    { title: "수신한 메일", count: 102, color: "black" },
    { title: "승인한 메일", count: 71, color: "primary" },
    { title: "삭제한 메일", count: 31, color: "danger" },
  ];

  return (
    <Box h="100%">
      <VStack pt={70} pb={30} px={45} spacing={6} align="flex-start">
        <Text fontSize={32} fontWeight="medium" textStyle="gradient2">
          반가워요, {user?.name ?? "사용자"}님.
        </Text>
        <Text fontSize="m" color="grey.shade2" fontWeight="regular">
          오늘도 안전한 하루 되세요!
        </Text>
      </VStack>

      <VStack w={950} px={40} spacing={20}>
        {/* 1단 */}
        <Flex
          w="100%"
          p={30}
          bg="white"
          borderRadius={14}
          align="center"
          gap={10}
        >
          <Text fontSize="xl" fontWeight="medium">
            😁
          </Text>
          <Text fontSize="s" fontWeight="medium">
            현재 {currentTraining}개의 훈련을 진행하고 있어요!
          </Text>
        </Flex>

        {/* 2단 */}
        <Flex w="100%" gap={20}>
          {/* 2단 좌측 */}
          <Flex
            w={550}
            h={376}
            p={30}
            gap={40}
            bg="white"
            borderRadius={14}
            align="center"
          >
            <Box position="relative" minW={200} minH={200}>
              {isClient && (
                <PieChart width={200} height={200}>
                  <Pie
                    data={[
                      { value: completedTodo },
                      { value: totalTodo - completedTodo },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    <Cell fill="#5EBFFB" pointerEvents="none" />
                    <Cell fill="none" pointerEvents="none" />
                  </Pie>
                </PieChart>
              )}

              <Text
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                fontSize="28px"
                fontWeight="bold"
                color="primary"
              >
                {((completedTodo / totalTodo) * 100) % 1 === 0
                  ? (completedTodo / totalTodo) * 100 // 정수인 경우
                  : ((completedTodo / totalTodo) * 100).toFixed(1)}
                %
              </Text>
            </Box>
            <VStack pt={22} spacing={30} align="flex-start">
              <VStack spacing={8} align="flex-start">
                <Text fontSize="s" fontWeight="regular">
                  진행 중인 모든 훈련의 To-Do 중
                </Text>
                <Text fontSize="xl" fontWeight="semibold">
                  {completedTodo}개 완료
                </Text>
              </VStack>

              <Flex
                gap={5}
                align="center"
                onClick={() => router.push("/dashboard/training")}
                _hover={{
                  cursor: "pointer",
                  transform: "scale(1.02)",
                  transition: "0.2s",
                }}
              >
                <Text color="#ABABAB" fontSize="xs" fontWeight="regular">
                  훈련으로 이동
                </Text>
                <ArrowIcon
                  boxSize={16}
                  color="#ABABAB"
                  transform="scaleX(-1)"
                />
              </Flex>
            </VStack>
          </Flex>
          {/* 2단 우측 */}
          <VStack w={300} spacing={20}>
            {trainingData.map((item, index) => (
              <Flex
                key={index}
                w="100%"
                bg="white"
                borderRadius={14}
                p={20}
                gap={20}
                align="center"
              >
                <Image src={item.badge} alt={`Badge-${index}`} boxSize={72} />
                <VStack spacing={6} align="flex-start">
                  <Text fontSize="xs" fontWeight="medium">
                    {item.text}
                  </Text>
                  <Text fontSize="l" fontWeight="bold">
                    {item.data}개
                  </Text>
                </VStack>
              </Flex>
            ))}
          </VStack>
        </Flex>

        {/* 3단 */}
        <Flex gap={20} align="center" w="100%">
          {mailData.map((item, index) => (
            <VStack
              key={index}
              w={`${100 / mailData.length}%`}
              h={150}
              bg="white"
              borderRadius={14}
              spacing={8}
              align="center"
              justify="center"
            >
              <Text fontSize="xl" fontWeight="bold" color={item.color}>
                {item.count}개
              </Text>
              <Text
                fontSize="s"
                fontWeight="regular"
                color="black"
                opacity={0.5}
              >
                {item.title}
              </Text>
            </VStack>
          ))}
        </Flex>
      </VStack>
    </Box>
  );
}
