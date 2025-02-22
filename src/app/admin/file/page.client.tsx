"use client";
import {
  Box,
  Flex,
  Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
} from "@chakra-ui/react";
import { File, ScenarioFile, MailFile } from "@prisma/client";
import { useRouter } from "next/navigation";
import { TrashIcon, InboxIcon, ProhibitIcon } from "@/assets/IconSet";
import AddFileModal from "@/components/admin/AddFileModal";
import toast from "react-hot-toast";
import ky from "ky";

interface AdminFileProps {
  fileList: (File & { scenarioFiles: ScenarioFile[] } & {
    mailFiles: MailFile[];
  })[];
}

export default function AdminFile({ fileList }: AdminFileProps) {
  const router = useRouter();

  const deleteHandler = async (fileId: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }
    try {
      await toast.promise(ky.delete(`/api/admin/file/${fileId}`), {
        loading: "파일을 삭제 중입니다.",
        success: "파일이 성공적으로 삭제되었습니다.",
        error: "파일 삭제 중 문제가 발생하였습니다",
      });

      router.refresh();
    } catch (error) {
      router.refresh();
    }
  };

  const downloadHandler = async (fileUUID: string, fileName: string) => {
    try {
      // 서명된 URL 받아오기
      const { url } = await ky
        .get(`/api/file/${fileUUID}`)
        .json<{ url: string }>();

      // 파일을 Blob으로 가져오기
      const response = await fetch(url);
      const blob = await response.blob();

      // Blob URL 생성
      const blobUrl = window.URL.createObjectURL(blob);

      // 임시 a 태그 생성
      const a = document.createElement("a");
      a.href = blobUrl;

      // 파일명 변경
      a.download = fileName;
      document.body.appendChild(a);
      a.click();

      // 임시 URL과 a 태그 정리
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      toast.error("파일 다운로드 중 문제가 발생하였습니다.");
    }
  };

  function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  return (
    <Box h="100%">
      <VStack pt={70} pb={30} px={45} spacing={6} align="flex-start">
        <Text fontSize={32} fontWeight="medium" textStyle="gradient2">
          파일 관리
        </Text>
        <Text fontSize="m" color="grey.shade2" fontWeight="regular">
          파일을 관리 할 수 있습니다
        </Text>
      </VStack>

      <Box px={45} maxW={1280}>
        <Flex w="100%" align="center" justify="end">
          <AddFileModal />
        </Flex>
        <TableContainer bg="white" borderRadius={14} mt={6} p={20}>
          <Table size="l" fontSize="m">
            <Thead>
              <Tr>
                <Th>No.</Th>
                <Th>Id</Th>
                <Th>파일명</Th>
                <Th>용량</Th>
                <Th>생성일</Th>
                <Th>연결된 시나리오 수</Th>
                <Th>연결된 메일 수</Th>
                <Th textAlign="center">다운로드</Th>
                <Th textAlign="center">삭제</Th>
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
                  <Td>{file.scenarioFiles.length}</Td>
                  <Td>{file.mailFiles.length}</Td>
                  <Td textAlign="center">
                    <IconButton
                      bg="none"
                      boxSize={30}
                      aria-label="Delete file"
                      icon={<InboxIcon color="grey.shade2" />}
                      _hover={{ bg: "grey.shade1" }}
                      onClick={() => {
                        downloadHandler(file.uuid, file.name);
                      }}
                    />
                  </Td>
                  <Td textAlign="center">
                    {file.mailFiles.length === 0 &&
                    file.scenarioFiles.length === 0 ? (
                      <IconButton
                        bg="none"
                        boxSize={30}
                        aria-label="Delete file"
                        icon={<TrashIcon color="grey.shade2" />}
                        _hover={{ bg: "grey.shade1" }}
                        onClick={() => {
                          deleteHandler(file.fileId);
                        }}
                      />
                    ) : (
                      <IconButton
                        bg="none"
                        boxSize={30}
                        aria-label="Cannot Delete"
                        icon={<ProhibitIcon color="grey.shade2" />}
                        _hover={{ bg: "grey.shade1" }}
                        onClick={() => {
                          alert(
                            "연결된 시나리오나 메일이 있어 삭제할 수 없습니다."
                          );
                        }}
                      />
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
            {fileList.length === 0 && (
              <Tbody>
                <Tr>
                  <Td colSpan={9} textAlign="center">
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
    </Box>
  );
}
