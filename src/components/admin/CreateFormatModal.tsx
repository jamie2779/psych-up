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
  Select,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { DataType } from "@prisma/client";
import { ArrowAltIcon } from "@/assets/IconSet";

export interface DataFormatItem {
  tag: string;
  name: string;
  type: DataType;
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
  const [type, setType] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    if (!tag.trim() || !name.trim() || !type.trim()) {
      setError(true);
      return;
    }

    setError(false);
    CreateFormat({ name, tag, type: type as DataType });
    setTag("");
    setName("");
    setType("");
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
            <FormControl isInvalid={error && !tag.trim()}>
              <FormLabel px={5} fontSize="m">
                데이터 이름
              </FormLabel>
              <Input
                h={46}
                borderRadius={14}
                px={20}
                fontSize="m"
                value={tag}
                placeholder="이름을 입력해주세요"
                onChange={(e) => setTag(e.target.value)}
              />
              <FormErrorMessage px={5} fontSize="m">
                이름을 입력해주세요
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={error && !name.trim()}>
              <FormLabel px={5} fontSize="m">
                데이터 태그
              </FormLabel>
              <Input
                h={46}
                borderRadius={14}
                px={20}
                fontSize="m"
                value={name}
                placeholder="태그를 입력해주세요."
                onChange={(e) => setName(e.target.value)}
              />
              <FormErrorMessage px={5} fontSize="m">
                태그를 입력해주세요
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={error && !type.trim()}>
              <FormLabel px={5} fontSize="m">
                데이터 타입
              </FormLabel>
              <Select
                h={46}
                borderRadius={14}
                fontSize="m"
                value={type}
                placeholder="타입을 선택해주세요"
                onChange={(e) => setType(e.target.value)}
                icon={<ArrowAltIcon mr={25} />}
              >
                {Object.values(DataType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
              <FormErrorMessage px={5} fontSize="m">
                타입을 선택해주세요
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
