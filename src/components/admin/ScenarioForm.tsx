"use client";
import {
  Box,
  Text,
  Flex,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  Textarea,
  Switch,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
} from "@chakra-ui/react";
import { TrashIcon } from "@/assets/IconSet";
import CreateTodoModal from "@/components/admin/CreateTodoModal";
import FileList from "@/components/admin/FileList";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Scenario,
  Todo,
  ScenarioFile,
  File,
  ScenarioMail,
  Mail,
} from "@prisma/client";
import toast from "react-hot-toast";
import ky from "ky";

interface ScenarioFormProps {
  scenario?: Scenario & { todos: Todo[] } & {
    scenarioFiles: (ScenarioFile & { file: File })[];
  } & {
    scenarioMails: (ScenarioMail & { mail: Mail })[];
  };
}

export default function ScenarioForm({ scenario }: ScenarioFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(scenario?.title || "");
  const [type, setType] = useState(scenario?.type || "");
  const [detail, setDetail] = useState(scenario?.detail || "");
  const [isPublic, setIsPublic] = useState(scenario?.isPublic || false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [todoList, setTodoList] = useState<String[]>(
    scenario?.todos.map((todo) => todo.target) || []
  );
  const [fileList, setFileList] = useState<File[]>(
    scenario?.scenarioFiles.map((scenarioFile) => scenarioFile.file) || []
  );
  const createTodo = async (newTarget: string) => {
    setTodoList((prev) => [...prev, newTarget]); // 기존 목록에 추가
  };

  const putScenario = async (scenario: Scenario & { todos: Todo[] }) => {
    return toast.promise(
      ky.put(`/api/admin/scenario/${scenario.scenarioId}`, {
        json: {
          title: title,
          type: type,
          detail: detail,
          isPublic: isPublic,
          todoList: todoList,
          fileList: fileList.map((file) => file.fileId),
        },
      }),
      {
        loading: "시나리오를 수정 중입니다.",
        success: "시나리오가 성공적으로 수정되었습니다.",
        error: "시나리오 수정 중 문제가 발생하였습니다",
      }
    );
  };

  const postScenario = async () => {
    return toast.promise(
      ky.post("/api/admin/scenario", {
        json: {
          title: title,
          type: type,
          detail: detail,
          isPublic: isPublic,
          todoList: todoList,
          fileList: fileList.map((file) => file.fileId),
        },
      }),
      {
        loading: "시나리오를 등록 중입니다.",
        success: "시나리오가 성공적으로 등록되었습니다.",
        error: "시나리오 등록 중 문제가 발생하였습니다",
      }
    );
  };

  const handleSubmit = async () => {
    if (
      !title.trim() ||
      !detail.trim() ||
      !type.trim() ||
      todoList.length === 0
    ) {
      setError(true);
      return;
    }

    setError(false);
    setIsLoading(true);

    try {
      if (scenario) {
        await putScenario(scenario);
      } else {
        await postScenario();
      }

      await setTimeout(() => {
        router.push("/admin/scenario");
      }, 1000);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <VStack spacing={6} align="flex-start">
      <FormControl isInvalid={error && !title.trim()}>
        <FormLabel px={5} fontSize="m">
          시나리오 제목
        </FormLabel>
        <Input
          h={46}
          borderRadius={14}
          px={20}
          fontSize="m"
          value={title}
          placeholder="시나리오 제목을 입력해주세요."
          onChange={(e) => setTitle(e.target.value)}
          isDisabled={isLoading}
        />
        <FormErrorMessage px={5} fontSize="m">
          제목을 입력해주세요.
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={error && !type.trim()}>
        <FormLabel px={5} fontSize="m">
          시나리오 분류
        </FormLabel>
        <Input
          h={46}
          borderRadius={14}
          px={20}
          fontSize="m"
          value={type}
          placeholder="시나리오 분류를 입력해주세요."
          onChange={(e) => setType(e.target.value)}
          isDisabled={isLoading}
        />
        <FormErrorMessage px={5} fontSize="m">
          분류를 입력해주세요.
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={error && !detail.trim()}>
        <FormLabel px={5} fontSize="m">
          시나리오 설명
        </FormLabel>
        <Textarea
          minH={100}
          h={200}
          borderRadius={14}
          px={20}
          py={10}
          value={detail}
          size="xl"
          fontSize="m"
          placeholder="시나리오 설명을 입력해주세요."
          onChange={(e) => setDetail(e.target.value)}
          isDisabled={isLoading}
        />
        <FormErrorMessage px={5} fontSize="m">
          설명을 입력해주세요.
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={error && todoList.length === 0}>
        {/*Todo 목록 */}
        <Box
          w="100%"
          bg="white"
          borderRadius={14}
          mt={6}
          p={20}
          borderColor={
            error && todoList.length === 0 ? "danger" : "transparent"
          }
          borderWidth={2}
        >
          <TableContainer>
            <Flex w="100%" align="center" justify="space-between">
              <Text fontSize="l" fontWeight="semibold">
                Todo 목록
              </Text>
              <CreateTodoModal isDisabled={isLoading} createTodo={createTodo} />
            </Flex>
            <Table size="l" fontSize="m">
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>목표</Th>
                  <Th>삭제</Th>
                </Tr>
              </Thead>
              <Tbody>
                {todoList.map((todo, index) => (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{todo}</Td>
                    <Td>
                      <IconButton
                        bg="none"
                        boxSize={30}
                        aria-label="Delete Todo"
                        icon={<TrashIcon color="grey.shade2" />}
                        _hover={{ bg: "grey.shade1" }}
                        onClick={() => {
                          setTodoList((prev) =>
                            prev.filter((_, idx) => idx !== index)
                          );
                        }}
                        isDisabled={isLoading}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              {todoList.length === 0 && (
                <Tbody>
                  <Tr>
                    <Td colSpan={5} textAlign="center">
                      Todo가 없습니다.
                    </Td>
                  </Tr>
                </Tbody>
              )}
            </Table>
            <Flex w="100%" align="center" justify="end">
              <Text fontSize="m" color="grey.shade2" fontWeight="medium">
                Todo 수: {todoList.length}
              </Text>
            </Flex>
          </TableContainer>
        </Box>
        <FormErrorMessage px={5} fontSize="m">
          1개 이상의 Todo가 필요합니다
        </FormErrorMessage>
      </FormControl>

      <FormControl>
        <FileList fileList={fileList} setFileList={setFileList} />
      </FormControl>

      {/*공개여부 */}
      <FormControl display="flex" alignItems="center">
        <FormLabel px={5} fontSize="m">
          시나리오 공개
        </FormLabel>
        <Switch
          isDisabled={isLoading}
          isChecked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
      </FormControl>
      <Button
        bg="secondary"
        width="100%"
        mt={4}
        onClick={handleSubmit}
        isLoading={isLoading}
        isDisabled={isLoading}
      >
        저장
      </Button>
    </VStack>
  );
}
