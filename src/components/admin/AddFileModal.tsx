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
import { File } from "@prisma/client";

interface AddFileModalProps {
  isDisabled?: boolean;
  addFile?: (newFile: File) => void;
}

export default function AddFileModal({
  addFile,
  isDisabled,
}: AddFileModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [target, setTarget] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    if (!target.trim()) {
      setError(true);
      return;
    }

    setError(false);
    setTarget("");
    onClose();
  };

  return (
    <>
      <Button h={40} px={20} isDisabled={isDisabled} onClick={onOpen}>
        파일 업로드
      </Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          w="400px"
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
          <ModalHeader w="100%">파일 업로드</ModalHeader>
          <ModalCloseButton m={10} />
          <ModalBody w="100%">업로드</ModalBody>

          <ModalFooter w="100%">
            <Button w="100%" colorScheme="blue" onClick={handleSubmit}>
              업로드
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
