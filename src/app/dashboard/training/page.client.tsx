"use client";
import { Box, Text, VStack } from "@chakra-ui/react";
import TrainingList from "@/components/dashboard/TrainingList";
import { useRef } from "react";
import { Scenario } from "@prisma/client";

interface DashboardTrainingPageProps {
  currentScenarioList: Scenario[];
  completedScenarioList: Scenario[];
  newScenarioList: Scenario[];
}

export default function DashboardTrainingPage({
  currentScenarioList,
  completedScenarioList,
  newScenarioList,
}: DashboardTrainingPageProps) {
  const trainingListRef = useRef<HTMLDivElement>(null);
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
          scenarioList={currentScenarioList}
          showButton={true}
          scrollToRef={trainingListRef}
        />
        {completedScenarioList.length > 0 && (
          <Box w="100%">
            <TrainingList
              title="완료한 훈련"
              scenarioList={completedScenarioList}
              showButton={false}
            />
          </Box>
        )}

        <Box w="100%" ref={trainingListRef}>
          <TrainingList
            title="미완료 훈련"
            scenarioList={newScenarioList}
            showButton={false}
          />
        </Box>
      </VStack>
    </Box>
  );
}
