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
  totalActiveTodo: number;
  completedActiveTodo: number;
  trainingCount: number;
  fishingCount: number;
  fooledCount: number;
  mailCount: number;
  todoCount: number;
  totalScore: number;
}

interface TrainingData {
  badge: string;
  text: string;
  data: string;
}

interface MailData {
  title: string;
  color: string;
  data: string;
}

export default function DashboardHome({
  user,
  totalActiveTodo,
  completedActiveTodo,
  trainingCount,
  fishingCount,
  fooledCount,
  mailCount,
  todoCount,
  totalScore,
}: DashboardHomePageProps) {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const trainingData: TrainingData[] = [
    {
      badge: PassBadge,
      text: "완료한 훈련 개수",
      data: `${trainingCount}개`,
    },
    {
      badge: WarningBadge,
      text: "피싱 회피율",
      data:
        fishingCount === 0
          ? "0%"
          : `${(((fishingCount - fooledCount) / fishingCount) * 100).toFixed(1)}%`,
    },
    {
      badge: FailBadge,
      text: "당한 피싱 수",
      data: `${fooledCount}회`,
    },
  ];

  const mailData: MailData[] = [
    { title: "수신한 메일", data: `${mailCount}개`, color: "black" },
    { title: "완료한 Todo", data: `${todoCount}개`, color: "success" },
    {
      title: "지금까지 얻은 점수",
      data: `${totalScore}점`,
      color: "secondary",
    },
  ];

  const tipList: string[] = [
    "의심스러운 이메일의 링크를 클릭하지 마세요.",
    "첨부파일을 열기 전에 발신자를 확인하세요.",
    "이메일 주소를 주의깊게 살펴보세요.",
    "자신의 개인정보를 SNS에 공유하지 마세요.",
    "급하게 조치를 요구하는 이메일을 경계하세요.",
    "정기적인 보안 교육과 훈련에 참여하세요",
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

      <VStack maxW={950} px={40} spacing={20}>
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
          {isClient && (
            <Text fontSize="s" fontWeight="medium">
              Tip: {tipList[Math.floor(Math.random() * tipList.length)]}
            </Text>
          )}
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
                    data={
                      totalActiveTodo === 0
                        ? [{ value: 0 }, { value: 0 }, { value: 100 }]
                        : [
                            {
                              value: completedActiveTodo,
                            },
                            {
                              value: totalActiveTodo - completedActiveTodo,
                            },
                          ]
                    }
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
                    <Cell fill="grey" pointerEvents="none" />
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
                color={totalActiveTodo === 0 ? "grey" : "primary"}
              >
                {totalActiveTodo === 0
                  ? 0
                  : ((completedActiveTodo / totalActiveTodo) * 100) % 1 === 0
                    ? (completedActiveTodo / totalActiveTodo) * 100 // 정수인 경우
                    : ((completedActiveTodo / totalActiveTodo) * 100).toFixed(
                        1
                      )}
                %
              </Text>
            </Box>
            <VStack pt={22} spacing={30} align="flex-start">
              {totalActiveTodo === 0 ? (
                <VStack spacing={8} align="flex-start">
                  <Text fontSize="s" fontWeight="regular">
                    진행중인 훈련이 없습니다
                  </Text>
                </VStack>
              ) : (
                <VStack spacing={8} align="flex-start">
                  <Text fontSize="s" fontWeight="regular">
                    진행 중인 모든 훈련의 To-Do 중
                  </Text>
                  <Text fontSize="xl" fontWeight="semibold">
                    {completedActiveTodo}개 완료
                  </Text>
                </VStack>
              )}

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
          <VStack flex="1" spacing={20}>
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
                    {item.data}
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
                {item.data}
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
