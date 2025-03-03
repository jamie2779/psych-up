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
  FormErrorMessage,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

export interface DataFormatItem {
  tag: string;
  name: string;
  placeholder: string;
}

interface CreateFormatModalProps {
  isDisabled?: boolean;
  CreateFormat: (newFormat: DataFormatItem) => void;
}

export default function CreateFormatModal({
  CreateFormat,
  isDisabled,
}: CreateFormatModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    if (!tag.trim() || !name.trim() || !placeholder.trim()) {
      setError(true);
      return;
    }

    setError(false);
    CreateFormat({ name, tag, placeholder });
    setTag("");
    setName("");
    setPlaceholder("");
    onClose();
  };

  return (
    <>
      <Button h={40} px={20} isDisabled={isDisabled} onClick={onOpen}>
        정보 형식 추가
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
          <ModalHeader w="100%">정보 형식 추가</ModalHeader>
          <ModalCloseButton m={10} />
          <ModalBody w="100%">
            <FormControl isInvalid={error && !name.trim()}>
              <FormLabel px={5} fontSize="m">
                데이터 이름
              </FormLabel>
              <Input
                h={46}
                borderRadius={14}
                px={20}
                fontSize="m"
                value={name}
                placeholder="이름을 입력해주세요"
                onChange={(e) => setName(e.target.value)}
              />
              <FormErrorMessage px={5} fontSize="m">
                이름을 입력해주세요
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={error && !tag.trim()}>
              <FormLabel px={5} fontSize="m">
                데이터 태그
              </FormLabel>
              <Input
                h={46}
                borderRadius={14}
                px={20}
                fontSize="m"
                value={tag}
                placeholder="태그를 입력해주세요."
                onChange={(e) => setTag(e.target.value)}
              />
              <FormErrorMessage px={5} fontSize="m">
                태그를 입력해주세요
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={error && !placeholder.trim()}>
              <FormLabel px={5} fontSize="m">
                입력예시(플레이스홀더)
              </FormLabel>
              <Input
                h={46}
                borderRadius={14}
                px={20}
                fontSize="m"
                value={placeholder}
                placeholder="예시를 입력해주세요."
                onChange={(e) => setPlaceholder(e.target.value)}
              />
              <FormErrorMessage px={5} fontSize="m">
                예시를 입력해주세요
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
