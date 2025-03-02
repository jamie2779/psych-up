"use client";
import { Box, Text, VStack, Flex } from "@chakra-ui/react";
import MailboxElement, { MailboxData } from "@/components/MailboxElement";
import { Training, Scenario, TodoHolder } from "@prisma/client";

interface DashboardMailPageProps {
  trainingList: (Training & {
    scenario: Scenario;
    todoHolders: TodoHolder[];
  })[];
}

export default function DashboardMailPage({
  trainingList,
}: DashboardMailPageProps) {
  const mailboxData: MailboxData[] = trainingList.map((training) => {
    const allTodoCount = training.todoHolders.length;
    const doneTodoCount = training.todoHolders.filter(
      (todo) => todo.isCompleted
    ).length;
    const progress = Math.floor((doneTodoCount / allTodoCount) * 100);

    return {
      type: training.scenario.type,
      title: training.scenario.title,
      progress: progress,
      trainingId: training.trainingId,
      isCompleted: training.status === "COMPLETE",
    };
  });

  return (
    <Box h="100%">
      <VStack pt={70} pb={30} px={45} spacing={6} align="flex-start">
        <Text fontSize={32} fontWeight="medium" textStyle="gradient2">
          메일함을 확인해보세요
        </Text>
        <Text fontSize="m" color="grey.shade2" fontWeight="regular">
          어떤 메일이 왔을까요?
        </Text>
      </VStack>

      <VStack maxW={1280} px={40} spacing={20}>
        {/* 훈련 중인 메일함 목록 */}
        {mailboxData.filter((data) => !data.isCompleted).length > 0 && (
          <VStack w="100%" spacing={10} align="flex-start">
            <Text px={5} fontSize="l" fontWeight="medium" color="grey.shade2">
              훈련 중인 메일함
            </Text>
            {mailboxData
              .filter((data) => data.isCompleted)
              .map((data, index) => (
                <MailboxElement key={index} mailboxData={data} />
              ))}
          </VStack>
        )}

        {/* 훈련 완료 메일함 목록 */}
        {mailboxData.filter((data) => data.isCompleted).length > 0 && (
          <VStack w="100%" spacing={10} align="flex-start">
            <Text px={5} fontSize="l" fontWeight="medium" color="grey.shade2">
              훈련을 끝마친 메일함
            </Text>
            {mailboxData
              .filter((data) => data.isCompleted)
              .map((data, index) => (
                <MailboxElement key={index} mailboxData={data} />
              ))}
          </VStack>
        )}

        {/* 메일함이 없을 경우 표시 */}
        {mailboxData.length === 0 && (
          <Box position="relative" w="100%" h="100px">
            <Box
              as="svg"
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              viewBox="0 0 100% 100%"
              pointerEvents="none"
            >
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                rx="14"
                ry="14"
                fill="none"
                stroke="rgba(0, 0, 0, 0.1)"
                strokeWidth="1"
                strokeDasharray="8 8"
              />
            </Box>
            <Flex
              w="100%"
              h="100%"
              align="center"
              justify="center"
              bg="#EFF4FC"
              borderRadius={14}
            >
              <Text fontSize="s" fontWeight="medium" color="grey.shade2">
                아직 참여중인 훈련이 없네요
              </Text>
            </Flex>
          </Box>
        )}
      </VStack>
    </Box>
  );
}
