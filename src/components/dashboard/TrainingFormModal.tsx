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
import { Scenario, Todo, DataFormat, ScenarioFile, File } from "@prisma/client";
import toast from "react-hot-toast";
import ky from "ky";
import { useRouter } from "next/navigation";

interface TrainingFormModalProps {
  scenario: Scenario & { todos: Todo[] } & { dataFormats: DataFormat[] } & {
    scenarioFiles: (ScenarioFile & { file: File })[];
  };
}

export default function TrainingFormModal({
  scenario,
}: TrainingFormModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState(false);
  const router = useRouter();

  const scenarioStartHandler = async (scenarioId: number) => {
    const isValid = scenario.dataFormats.every(
      (dataFormat) => data[dataFormat.tag] && data[dataFormat.tag].trim() !== ""
    );

    if (!isValid) {
      setError(true);
      return;
    }
    setError(false);

    if (!confirm("이 시나리오로 훈련을 시작하시겠습니까?")) {
      return;
    }

    await toast.promise(
      ky.post("/api/training", { json: { scenarioId, data } }),
      {
        loading: "훈련을 시작하는 중입니다.",
        success: "훈련이 시작되었습니다.",
        error: "훈련 시작 도중 문제가 발생하였습니다",
      }
    );
    onClose();

    router.refresh();
  };

  return (
    <>
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
        onClick={() => {
          if (scenario.dataFormats.length === 0) {
            scenarioStartHandler(scenario.scenarioId);
            return;
          }
          onOpen();
        }}
      >
        훈련 시작
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
          <ModalHeader w="100%">훈련에 사용될 정보 입력</ModalHeader>
          <ModalCloseButton m={10} />
          <ModalBody w="100%">
            {scenario.dataFormats.map((dataFormat) => (
              <FormControl
                key={dataFormat.dataFormatId}
                isInvalid={error && !data[dataFormat.tag]?.trim()}
              >
                <FormLabel px={5} fontSize="m">
                  {dataFormat.name}
                </FormLabel>
                <Input
                  h={46}
                  borderRadius={14}
                  px={20}
                  fontSize="m"
                  placeholder={dataFormat.placeholder}
                  value={data[dataFormat.tag] || ""}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      [dataFormat.tag]: e.target.value,
                    }))
                  }
                />
                <FormErrorMessage px={5} fontSize="m">
                  {dataFormat.name}을 입력해주세요
                </FormErrorMessage>
              </FormControl>
            ))}
          </ModalBody>

          <ModalFooter w="100%">
            <Button
              w="100%"
              colorScheme="blue"
              onClick={() => scenarioStartHandler(scenario.scenarioId)}
            >
              추가
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
