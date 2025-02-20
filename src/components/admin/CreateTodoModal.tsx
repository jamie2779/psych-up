"use client";
import {
  Box,
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

interface CreateTodoModalProps {
  isDisabled?: boolean;
  createTodo: (newTodo: string) => void;
}

export default function CreateTodoModal({
  createTodo,
  isDisabled,
}: CreateTodoModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [target, setTarget] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    if (!target.trim()) {
      setError(true);
      return;
    }

    setError(false);
    createTodo(target);
    setTarget("");
    onClose();
  };

  return (
    <>
      <Button h={40} px={20} isDisabled={isDisabled} onClick={onOpen}>
        Todo 추가
      </Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          w="400px" // ✅ 모달 너비 고정 (내용에 따라 늘어나지 않음)
          maxW="90vw" // ✅ 화면이 작아지면 자동 조정
          h="auto" // ✅ 높이는 내용에 따라 유동적으로 설정
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          margin="auto"
          p={20}
          borderRadius={14}
        >
          <ModalHeader w="100%">Todo 추가</ModalHeader>
          <ModalCloseButton m={10} />
          <ModalBody w="100%">
            <FormControl isInvalid={error}>
              <FormLabel px={5} fontSize="m">
                Todo 목표
              </FormLabel>
              <Input
                h={46}
                borderRadius={14}
                px={20}
                fontSize="m"
                value={target}
                placeholder="Todo 목표를 입력해주세요."
                onChange={(e) => setTarget(e.target.value)}
              />
              <FormErrorMessage px={5} fontSize="m">
                목표를 입력해주세요
              </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter w="100%">
            <Button w="100%" colorScheme="blue" onClick={handleSubmit}>
              추가
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
