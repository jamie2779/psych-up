"use client";
import { Box, Text, VStack } from "@chakra-ui/react";
import TrainingList, { TrainingData } from "@/components/TrainingList";
import { useRef } from "react";

export default function DashboardMailPage() {
  const trainingListRef = useRef<HTMLDivElement>(null);

  const trainingListData: TrainingData[] = [
    {
      id: 1,
      type: "분류1",
      title: "급여 명세서 사칭 이메일",
      detail: "급여 명세서를 위장한 피싱 이메일을 식별하는 훈련",
    },
    {
      id: 2,
      type: "분류2",
      title: "긴급 송금 요청 메일",
      detail: "상사의 긴급 요청을 사칭한 피싱 공격 대응 훈련",
    },
    {
      id: 3,
      type: "분류1",
      title: "가짜 로그인 페이지 유도",
      detail: "공식 사이트를 위장한 로그인 페이지 피싱 탐지 훈련",
    },
    {
      id: 4,
      type: "분류2",
      title: "악성 PDF 첨부 메일",
      detail: "악성 코드가 포함된 PDF 파일을 식별하는 훈련",
    },
    {
      id: 5,
      type: "분류4",
      title: "택배 사칭 문자 메시지",
      detail: "택배 배송을 가장한 문자 메시지 피싱 탐지 훈련",
    },
  ];
  return (
    <Box h="100%">
      <VStack pt={70} pb={30} px={45} spacing={6} align="flex-start">
        <Text fontSize={32} fontWeight="medium" textStyle="gradient2">
          어떤 훈련을 시작하시겠어요?
        </Text>
        <Text fontSize="m" color="grey.shade2" fontWeight="regular">
          어떤것이든 바로 시작해보세요!
        </Text>
      </VStack>
      <VStack maxW={1280} px={40} spacing={20}>
        <TrainingList
          title="진행 중인 훈련"
          trainingListData={trainingListData.slice(0, 3)}
          showButton={true}
          scrollToRef={trainingListRef}
        />
        <Box ref={trainingListRef}>
          <TrainingList
            title="전체 훈련 목록"
            trainingListData={trainingListData}
            showButton={false}
          />
        </Box>
      </VStack>
    </Box>
  );
}
