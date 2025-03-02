"use client";

import { Box, Text, VStack, Flex, Badge, Button } from "@chakra-ui/react";
import { ArrowIcon } from "@/assets/IconSet";
import { useRouter } from "next/navigation";
import FishingList from "@/components/dashboard/FishingList";
import {
  Scenario,
  Todo,
  TodoHolder,
  ScenarioFile,
  File,
  TrainingStatus,
  Mail,
  MailFile,
} from "@prisma/client";
import toast from "react-hot-toast";
import ky from "ky";

interface TrainingDetailProps {
  scenario: Scenario & { todos: Todo[] } & {
    scenarioFiles: (ScenarioFile & { file: File })[];
  };
  trainingStatus?: TrainingStatus;
  isFailed: boolean;
  todoList?: (TodoHolder & { todo: Todo })[];
  fishingList?: (Mail & { mailFiles: (MailFile & { file: File })[] })[];
}

export default function TrainingDetail({
  scenario,
  trainingStatus,
  isFailed,
  todoList,
  fishingList,
}: TrainingDetailProps) {
  const router = useRouter();

  const scenarioStartHandler = async (scenarioId: number) => {
    if (!confirm("이 시나리오로 훈련을 시작하시겠습니까?")) {
      return;
    }

    await toast.promise(ky.post("/api/training", { json: { scenarioId } }), {
      loading: "훈련을 시작하는 중입니다.",
      success: "훈련이 시작 되었습니다.",
      error: "훈련 시작 도중 문제가 발생하였습니다",
    });

    router.refresh();
  };

  const scenarioFailHandler = async (scenarioId: number) => {
    if (!confirm("이 훈련을 포기하시겠습니까?")) {
      return;
    }

    await toast.promise(ky.delete(`/api/training/${scenarioId}`), {
      loading: "훈련을 포기하는 중입니다",
      success: "훈련을 포기했습니다.",
      error: "훈련 포기 도중 문제가 발생하였습니다",
    });

    router.refresh();
  };

  const downloadHandler = async (fileUUID: string, fileName: string) => {
    try {
      const toastId = toast.loading("파일 불러오는 중...");
      // 서명된 URL 받아오기
      const { url } = await ky
        .get(`/api/file/${fileUUID}`)
        .json<{ url: string }>();

      // 파일을 Blob으로 가져오기
      const response = await fetch(url);
      const blob = await response.blob();

      // Blob URL 생성
      const blobUrl = window.URL.createObjectURL(blob);

      // 임시 a 태그 생성
      const a = document.createElement("a");
      a.href = blobUrl;

      // 파일명 변경
      a.download = fileName;
      document.body.appendChild(a);
      a.click();

      // 임시 URL과 a 태그 정리
      a.remove();
      window.URL.revokeObjectURL(blobUrl);

      // 다운로드 성공 메시지
      toast.success("파일 다운로드가 시작되었습니다.", { id: toastId });
    } catch (error) {
      toast.error("파일 다운로드 중 문제가 발생하였습니다.");
    }
  };

  return (
    <Box h="100%">
      <VStack pt={70} pb={30} px={45} spacing={6} align="flex-start">
        <Text fontSize={32} fontWeight="medium" textStyle="gradient2">
          과연 어떤 시나리오의 훈련일까요?
        </Text>
        <Text fontSize="m" color="grey.shade2" fontWeight="regular">
          언제든지 훈련을 시작할 수 있어요!
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
              {scenario.title}
            </Text>
            <Text fontSize="s" fontWeight="regular">
              {scenario.detail}
            </Text>
          </VStack>
          {/* 중단*/}
          <VStack align="flex-start" spacing={10} py={20}>
            <Flex gap={8}>
              <Text fontSize="s" fontWeight="medium">
                첨부파일 {!todoList && "(훈련 시작 후 확인 가능)"}
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
                {scenario.scenarioFiles.length}
              </Flex>
            </Flex>
            {todoList
              ? scenario.scenarioFiles.map((scenarioFile, index) => (
                  <Text
                    key={index}
                    fontSize="s"
                    fontWeight="regular"
                    userSelect="none"
                    onClick={() =>
                      downloadHandler(
                        scenarioFile.file.uuid,
                        scenarioFile.file.name
                      )
                    }
                    _hover={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    {scenarioFile.file.name}
                  </Text>
                ))
              : scenario.scenarioFiles.map((scenarioFile, index) => (
                  <Text
                    key={index}
                    fontSize="s"
                    fontWeight="regular"
                    filter="blur(5px)"
                    userSelect="none"
                  >
                    {"a".repeat(scenarioFile.file.name.length)}
                  </Text>
                ))}
          </VStack>

          {/* 하단*/}
          <Flex align="end" justify="space-between" w="100%">
            <Flex gap={10} align="center">
              <Badge>{scenario.type}</Badge>
              {/* <Text fontSize="s" fontWeight="regular" color="#B3B3B3">
                이 훈련은 지금까지 2명이 성공했어요
              </Text> */}
            </Flex>
            {(!trainingStatus || trainingStatus === TrainingStatus.FAIL) && (
              <Button
                w={95}
                h={35}
                bg="success"
                fontSize="s"
                fontWeight="medium"
                _hover={{
                  bg: "success",
                  transform: "scale(1.02)",
                }}
                onClick={() => scenarioStartHandler(scenario.scenarioId)}
              >
                수락 및 시작
              </Button>
            )}
            {trainingStatus === TrainingStatus.ACTIVE && (
              <Flex gap={6}>
                <Button
                  w={95}
                  h={35}
                  variant="outline"
                  color="danger"
                  fontSize="s"
                  fontWeight="medium"
                  _hover={{
                    bg: "danger",
                    color: "white",
                  }}
                  onClick={() => scenarioFailHandler(scenario.scenarioId)}
                >
                  훈련 포기
                </Button>
                <Button
                  h={35}
                  fontSize="s"
                  fontWeight="medium"
                  onClick={() => router.push(`/mail/${scenario.scenarioId}`)}
                >
                  이 훈련의 메일함으로 이동
                </Button>
              </Flex>
            )}
            {trainingStatus === TrainingStatus.COMPLETE && (
              <Button
                h={35}
                fontSize="s"
                fontWeight="medium"
                onClick={() => router.push(`/mail/${scenario.scenarioId}`)}
              >
                이 훈련의 메일함으로 이동
              </Button>
            )}
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
            {todoList
              ? todoList.map((todo, index) => (
                  <Text
                    key={index}
                    fontSize="s"
                    fontWeight="regular"
                    textDecoration={todo.isCompleted ? "line-through" : "none"}
                  >
                    {index + 1}. {todo.todo.target}
                  </Text>
                ))
              : scenario.todos.map((todo, index) => (
                  <Text
                    filter="blur(5px)"
                    key={index}
                    fontSize="s"
                    fontWeight="regular"
                    userSelect="none"
                  >
                    {index + 1}. {"a".repeat(todo.target.length)}
                  </Text>
                ))}
          </VStack>
          {todoList ? (
            <Text mt="auto" color="#B3B3B3" fontSize="s" fontWeight="regular">
              {todoList.length}개의 To-Do 중{" "}
              {todoList.filter((todo) => todo.isCompleted).length}개 완료
            </Text>
          ) : (
            <Text mt="auto" color="#B3B3B3" fontSize="s" fontWeight="regular">
              {scenario.todos.length}개의 To-Do (훈련 시작 후 확인 가능)
            </Text>
          )}
        </Flex>
      </Flex>
      {isFailed && (
        <Text px={45} mt={10} fontWeight="regular" fontSize="s" color="danger">
          ※ 이전에 포기했던 훈련이에요!
        </Text>
      )}
      {fishingList && <FishingList fishingList={fishingList} />}
    </Box>
  );
}
