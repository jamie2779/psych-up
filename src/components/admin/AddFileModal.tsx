"use client";
import {
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
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { File as prismaFile } from "@prisma/client";
import toast from "react-hot-toast";
import ky from "ky";

interface AddFileModalProps {
  isDisabled?: boolean;
  addFile?: (newFile: prismaFile) => void;
}

export default function AddFileModal({
  addFile,
  isDisabled,
}: AddFileModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!files) {
      setError(true);
      return;
    }
    if (files.length > 5) {
      toast.error("파일은 한번에 5개까지만 업로드 가능합니다.");
      return;
    }

    setError(false);
    setIsLoading(true);

    try {
      await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);

          // 각 파일 업로드 시 toast 메시지 처리
          const response: prismaFile = await toast.promise(
            ky.post("/api/admin/file", { body: formData }).json(),
            {
              loading: `${file.name} 파일 업로드 중...`,
              success: `${file.name} 업로드 성공!`,
              error: `${file.name} 업로드 실패!`,
            }
          );
          // 업로드된 파일 하나씩 콜백 호출
          if (addFile) {
            addFile(response);
          }
        })
      );
      onClose();
      router.refresh();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
                파일 선택
              </FormLabel>
              <Input
                h={46}
                borderRadius={14}
                px={20}
                py={7}
                fontSize="m"
                type="file"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    setFiles(Array.from(e.target.files));
                  } else {
                    setFiles([]);
                  }
                }}
              />
              <FormLabel color="danger" px={5} fontSize="s">
                각 파일은 50MB 이하여야 합니다
              </FormLabel>
            </FormControl>
          </ModalBody>

          <ModalFooter w="100%">
            <Button
              w="100%"
              colorScheme="blue"
              onClick={handleSubmit}
              isLoading={isLoading}
            >
              업로드
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
