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
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ky from "ky";

interface AddFileModalProps {
  isDisabled?: boolean;
  addFile?: (newFile: File) => void;
}

export default function AddFileModal({
  addFile,
  isDisabled,
}: AddFileModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!file) {
      setError(true);
      return;
    }

    setError(false);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response: File = await toast.promise(
        ky
          .post("/api/admin/file", {
            body: formData,
          })
          .json(),
        {
          loading: "파일을 업로드 중입니다...",
          success: "파일이 성공적으로 업로드되었습니다!",
          error: "파일 업로드 중 문제가 발생했습니다.",
        }
      );

      addFile && addFile(response);
      onClose();
      router.refresh();
    } catch (error) {
      onClose();
    }
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
          <ModalBody w="100%">
            <FormControl isInvalid={error}>
              <FormLabel px={5} fontSize="m">
                Todo 목표
              </FormLabel>
              <Input
                h={46}
                borderRadius={14}
                px={20}
                py={7}
                fontSize="m"
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
              <FormErrorMessage px={5} fontSize="m">
                파일을 추가해주세요
              </FormErrorMessage>
            </FormControl>
          </ModalBody>

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
