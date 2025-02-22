"use client";
import {
  Box,
  Flex,
  Text,
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
import AddFileModal from "@/components/admin/AddFileModal";
import SelectFileModal from "@/components/admin/SelectFileModal";
import { File } from "@prisma/client";
import { formatBytes } from "@/lib/utils";

interface FileListModalProps {
  isDisabled?: boolean;
  fileList: File[];
  setFileList: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function FileList({
  isDisabled,
  fileList,
  setFileList,
}: FileListModalProps) {
  const addFile = async (newFile: File) => {
    setFileList((prev) => [...prev, newFile]);
  };

  return (
    <Box w="100%" bg="white" borderRadius={14} mt={6} p={20}>
      <TableContainer>
        <Flex w="100%" align="center" justify="space-between">
          <Text fontSize="l" fontWeight="semibold">
            첨부파일
          </Text>
          <Flex gap={10}>
            <SelectFileModal
              isDisabled={isDisabled}
              addFile={addFile}
              fileList={fileList}
            />
            <AddFileModal isDisabled={isDisabled} addFile={addFile} />
          </Flex>
        </Flex>
        <Table size="l" fontSize="m">
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>Id</Th>
              <Th>파일명</Th>
              <Th>용량</Th>
              <Th>생성일</Th>
              <Th>삭제</Th>
            </Tr>
          </Thead>
          <Tbody>
            {fileList.map((file, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{file.fileId}</Td>
                <Td>{file.name}</Td>
                <Td>{formatBytes(file.size)}</Td>
                <Td>{new Date(file.createdDate).toLocaleString()}</Td>
                <Td>
                  <IconButton
                    bg="none"
                    boxSize={30}
                    aria-label="Delete file"
                    icon={<TrashIcon color="grey.shade2" />}
                    _hover={{ bg: "grey.shade1" }}
                    onClick={() => {
                      setFileList((prev) =>
                        prev.filter((_, idx) => idx !== index)
                      );
                    }}
                    isDisabled={isDisabled}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
          {fileList.length === 0 && (
            <Tbody>
              <Tr>
                <Td colSpan={6} textAlign="center">
                  파일이 없습니다.
                </Td>
              </Tr>
            </Tbody>
          )}
        </Table>
        <Flex w="100%" align="center" justify="end">
          <Text fontSize="m" color="grey.shade2" fontWeight="medium">
            파일 수: {fileList.length}
          </Text>
        </Flex>
      </TableContainer>
    </Box>
  );
}
