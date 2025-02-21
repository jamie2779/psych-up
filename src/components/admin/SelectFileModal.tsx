"use client";
import {
  Box,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Checkbox,
  CheckboxGroup,
  FormLabel,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { File } from "@prisma/client";
import { CheckIcon } from "@/assets/IconSet";
import ky from "ky";
import toast from "react-hot-toast";

interface SelectFileModalProps {
  isDisabled?: boolean;
  addFile: (newFile: File) => void;
  fileList: File[];
}

export default function SelectFileModal({
  addFile,
  isDisabled,
  fileList,
}: SelectFileModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const [targetFiles, setTargetFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!isOpen) return;
    const fetchFiles = async () => {
      try {
        const files = await ky.get("/api/admin/file").json<File[]>();
        const unSelectedFiles = files.filter(
          (file) =>
            !fileList.some(
              (existingFile) => existingFile.fileId === file.fileId
            )
        );
        setTargetFiles(unSelectedFiles);
        setIsLoading(false);
      } catch (err) {
        toast.error("파일 목록을 불러오는 중 오류 발생");
        onClose();
      }
    };

    fetchFiles();
  }, [isOpen]);

  const handleSubmit = () => {
    if (selected.length === 0) {
      return;
    }

    const selectedFiles = targetFiles.filter((file) =>
      selected.includes(file.fileId.toString())
    );

    selectedFiles.forEach((file: File) => addFile(file));

    setSelected([]);
    onClose();
  };

  return (
    <>
      <Button h={40} px={20} isDisabled={isDisabled} onClick={onOpen}>
        기존 파일에서 선택
      </Button>

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
          <ModalHeader w="100%">파일 업로드</ModalHeader>
          <ModalCloseButton m={10} />
          <ModalBody w="100%">
            <FormLabel px={5} fontSize="m">
              첨부할 파일 선택
            </FormLabel>
            <Box maxH="500px" overflowY="auto">
              <CheckboxGroup value={selected} onChange={setSelected}>
                <TableContainer bg="white" borderRadius={14} mt={6} p={20}>
                  <Table size="l" fontSize="m">
                    <Thead>
                      <Tr>
                        <Th>No.</Th>
                        <Th>ID</Th>
                        <Th>파일이름</Th>
                        <Th>용량</Th>
                        <Th>생성일</Th>
                        <Th textAlign="center">선택</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {targetFiles.map((file, index) => (
                        <Tr key={index}>
                          <Td>{index + 1}</Td>
                          <Td>{file.fileId}</Td>
                          <Td>{file.name}</Td>
                          <Td>{file.size}</Td>
                          <Td>{new Date(file.createdDate).toLocaleString()}</Td>
                          <Td textAlign="center" py={2}>
                            <Checkbox
                              value={file.fileId.toString()}
                              overflow="hidden"
                              icon={<CheckIcon boxSize={36} />}
                            />
                          </Td>
                        </Tr>
                      ))}
                      {isLoading && (
                        <Tr>
                          <Td colSpan={6} textAlign="center">
                            파일 불러오는 중...
                          </Td>
                        </Tr>
                      )}
                      {!isLoading && targetFiles.length === 0 && (
                        <Tr>
                          <Td colSpan={6} textAlign="center">
                            파일이 없습니다.
                          </Td>
                        </Tr>
                      )}
                    </Tbody>
                  </Table>
                </TableContainer>
              </CheckboxGroup>
            </Box>
            <Flex w="100%" align="center" justify="end">
              <Text fontSize="m" color="grey.shade2" fontWeight="medium">
                파일 수: {targetFiles.length}
              </Text>
            </Flex>
          </ModalBody>

          <ModalFooter w="100%">
            <Button
              w="100%"
              colorScheme="blue"
              onClick={handleSubmit}
              disabled={selected.length === 0}
            >
              {selected.length === 0
                ? "파일을 선택해 주세요"
                : `파일 ${selected.length}개 첨부`}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
