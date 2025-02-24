"use client";
import {
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Todo } from "@prisma/client";
import { CheckIcon } from "@/assets/IconSet";

interface TodoTableMoadlProps {
  scenarioTitle?: string;
  todoList: Todo[];
}

export default function TodoTableMoadl({
  scenarioTitle,
  todoList,
}: TodoTableMoadlProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        bg="none"
        boxSize={30}
        aria-label="Delete Todo"
        icon={<CheckIcon color="grey.shade2" />}
        _hover={{ bg: "grey.shade1" }}
        onClick={onOpen}
      />

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          w="800px"
          maxW="90vw"
          h="auto"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          margin="auto"
          p={20}
          borderRadius={14}
        >
          <ModalHeader w="100%">
            {scenarioTitle ? `"${scenarioTitle}"의 ` : "전체 "}Todo 목록
          </ModalHeader>
          <ModalCloseButton m={10} />
          <ModalBody w="100%">
            <TableContainer>
              <Table size="l" fontSize="m">
                <Thead>
                  <Tr>
                    <Th>No.</Th>
                    <Th>ID</Th>
                    <Th>태그</Th>
                    <Th>목표</Th>
                    <Th>생성일</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {todoList.map((todo, index) => (
                    <Tr key={index}>
                      <Td>{index + 1}</Td>
                      <Td>{todo.todoId}</Td>
                      <Td>{todo.tag}</Td>
                      <Td>{todo.target}</Td>
                      <Td>{new Date(todo.createdDate).toLocaleDateString()}</Td>
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
