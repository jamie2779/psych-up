"use client";
import {
  Box,
  Flex,
  Button,
  Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
} from "@chakra-ui/react";
import {
  Scenario,
  Todo,
  ScenarioFile,
  File,
  ScenarioMail,
  Mail,
} from "@prisma/client";
import { useRouter } from "next/navigation";
import { EditIcon, TrashIcon } from "@/assets/IconSet";
import toast from "react-hot-toast";
import ky from "ky";

interface AdminScenarioProps {
  scenarioList: (Scenario & { todos: Todo[] } & {
    scenarioFiles: (ScenarioFile & { file: File })[];
  } & {
    scenarioMails: (ScenarioMail & { mail: Mail })[];
  })[];
}

export default function AdminScenario({ scenarioList }: AdminScenarioProps) {
  const router = useRouter();

  const deleteHandler = async (scenarioId: number) => {
    if (
      !confirm(
        "정말 삭제하시겠습니까?\n(연결된 메일과 파일은 자동으로 삭제되지 않습니다.)"
      )
    ) {
      return;
    }
    try {
      await toast.promise(ky.delete(`/api/admin/scenario/${scenarioId}`), {
        loading: "시나리오를 삭제 중입니다.",
        success: "시나리오가 성공적으로 삭제되었습니다.",
        error: "시나리오 삭제 중 문제가 발생하였습니다",
      });

      router.refresh();
    } catch (error) {
      router.refresh();
    }
  };

  return (
    <Box h="100%">
      <VStack pt={70} pb={30} px={45} spacing={6} align="flex-start">
        <Text fontSize={32} fontWeight="medium" textStyle="gradient2">
          시나리오 관리
        </Text>
        <Text fontSize="m" color="grey.shade2" fontWeight="regular">
          시나리오 정보를 관리 할 수 있습니다
        </Text>
      </VStack>

      <Box px={45} maxW={1280}>
        <Flex w="100%" align="center" justify="end">
          <Button
            h={40}
            px={20}
            onClick={() => router.push("/admin/scenario/new")}
          >
            시나리오 추가
          </Button>
        </Flex>
        <TableContainer bg="white" borderRadius={14} mt={6} p={20}>
          <Table size="l" fontSize="m">
            <Thead>
              <Tr>
                <Th>No.</Th>
                <Th>ID</Th>
                <Th>제목</Th>
                <Th>내용</Th>
                <Th>공개여부</Th>
                <Th>생성일</Th>
                <Th>Todo 개수</Th>
                <Th>메일 개수</Th>
                <Th>파일 개수</Th>
                <Th>수정</Th>
                <Th>삭제</Th>
              </Tr>
            </Thead>
            <Tbody>
              {scenarioList.map((scenario, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{scenario.scenarioId}</Td>
                  <Td>{scenario.title}</Td>
                  <Td
                    maxW="200px"
                    pr={40}
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {scenario.detail}
                  </Td>
                  <Td>{scenario.isPublic ? "공개" : "비공개"}</Td>
                  <Td>{new Date(scenario.createdDate).toLocaleDateString()}</Td>
                  <Td>{scenario.todos.length}</Td>
                  <Td>{scenario.scenarioMails.length}</Td>
                  <Td>{scenario.scenarioFiles.length}</Td>
                  <Td>
                    <IconButton
                      bg="none"
                      boxSize={30}
                      aria-label="Delete Todo"
                      icon={<EditIcon color="grey.shade2" />}
                      _hover={{ bg: "grey.shade1" }}
                      onClick={() =>
                        router.push(
                          `/admin/scenario/edit/${scenario.scenarioId}`
                        )
                      }
                    />
                  </Td>
                  <Td>
                    <IconButton
                      bg="none"
                      boxSize={30}
                      aria-label="Delete Todo"
                      icon={<TrashIcon color="grey.shade2" />}
                      _hover={{ bg: "grey.shade1" }}
                      onClick={() => deleteHandler(scenario.scenarioId)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
            {scenarioList.length === 0 && (
              <Tbody>
                <Tr>
                  <Td colSpan={11} textAlign="center">
                    시나리오가 없습니다.
                  </Td>
                </Tr>
              </Tbody>
            )}
          </Table>
          <Flex w="100%" align="center" justify="end">
            <Text fontSize="m" color="grey.shade2" fontWeight="medium">
              시나리오 수: {scenarioList.length}
            </Text>
          </Flex>
        </TableContainer>
      </Box>
    </Box>
  );
}
