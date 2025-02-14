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

interface DashboardHomePageProps {
  user: User;
  totalTodo: number;
  completedTodo: number;
}

export default function DashboardHome({
  user,
  totalTodo,
  completedTodo,
}: DashboardHomePageProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const trainingData = [
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
            현재 x개의 훈련을 진행하고 있어요!
          </Text>
        </Flex>

        <Flex w="100%" gap={20}>
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

              <Flex gap={5} align="center">
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
      </VStack>
    </Box>
  );
}
