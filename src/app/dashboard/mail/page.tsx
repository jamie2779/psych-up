"use client";
import { ArrowIcon } from "@/assets/IconSet";
import { Box, Text, VStack, Flex } from "@chakra-ui/react";
import MailboxElement, { MailboxData } from "@/components/MailboxElement";
import { useRouter } from "next/navigation";

export default function DashboardMailPage() {
  const mailboxData: MailboxData[] = [
    {
      type: "분류 3",
      typeColor: "danger",
      title: "훈련 시나리오 이름1",
      progress: 76,
      trainingId: 1,
    },
    {
      type: "분류 1",
      typeColor: "success",
      title: "훈련 시나리오 이름2",
      progress: 100,
      trainingId: 2,
    },
    {
      type: "분류 2",
      typeColor: "warning",
      title: "훈련 시나리오 이름3",
      progress: 50,
      trainingId: 3,
    },
  ];

  const router = useRouter();

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

      <VStack w={1280} px={40} spacing={20}>
        {/* 훈련 중인 메일함 목록 */}
        {/* progress가 100이 아닌 메일함이 있을경우 표시 */}
        {mailboxData.filter((data) => data.progress < 100).length > 0 && (
          <VStack w="100%" spacing={10} align="flex-start">
            <Text fontSize="l" fontWeight="medium" color="grey.shade2">
              훈련 중인 메일함
            </Text>
            {mailboxData
              .filter((data) => data.progress < 100)
              .map((data, index) => (
                <MailboxElement key={index} mailboxData={data} />
              ))}
          </VStack>
        )}

        {/* 훈련 완료 메일함 목록 */}
        {/* progress가 100인 메일함이 있을경우 표시 */}
        {mailboxData.filter((data) => data.progress === 100).length > 0 && (
          <VStack w="100%" spacing={10} align="flex-start">
            <Text fontSize="l" fontWeight="medium" color="grey.shade2">
              훈련을 끝마친 메일함
            </Text>
            {mailboxData
              .filter((data) => data.progress === 100)
              .map((data, index) => (
                <MailboxElement key={index} mailboxData={data} />
              ))}
          </VStack>
        )}

        {/* 메일함이 없을 경우 표시 */}
        {mailboxData.length === 0 && (
          <VStack w="100%" spacing={10} align="center">
            <Text fontSize="xl" fontWeight="medium" color="grey.shade2">
              훈련 중인 메일함이 없습니다
            </Text>
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
              <Text fontSize="m" fontWeight="regular" color="#ABABAB">
                새로운 훈련을 시작해보세요!
              </Text>
              <ArrowIcon boxSize={24} color="#ABABAB" transform="scaleX(-1)" />
            </Flex>
          </VStack>
        )}
      </VStack>
    </Box>
  );
}
