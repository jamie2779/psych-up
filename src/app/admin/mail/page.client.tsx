"use client";
import {
  Box,
  Flex,
  Button,
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
import { Mail, ScenarioMail, MailFile, File } from "@prisma/client";
import { useRouter } from "next/navigation";
import { EditIcon, TrashIcon, ProhibitIcon } from "@/assets/IconSet";
import toast from "react-hot-toast";
import ky from "ky";

interface AdminMailProps {
  mailList: (Mail & { scenarioMails: ScenarioMail[] } & {
    mailFiles: (MailFile & { file: File })[];
  })[];
}

export default function AdminMail({ mailList }: AdminMailProps) {
  const router = useRouter();

  const deleteHandler = async (mailId: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }
    try {
      await toast.promise(ky.delete(`/api/admin/mail/${mailId}`), {
        loading: "메일을 삭제 중입니다.",
        success: "메일이 성공적으로 삭제되었습니다.",
        error: "메일 삭제 중 문제가 발생하였습니다",
      });

      router.refresh();
    } catch (error) {
      router.refresh();
    }
  };

  return (
    <Box h="100%">
      <VStack pt={70} pb={30} px={45} spacing={6} align="flex-start">
        <Text fontSize={32} fontWeight="medium" textStyle="gradient2">
          메일 관리
        </Text>
        <Text fontSize="m" color="grey.shade2" fontWeight="regular">
          메일 정보를 관리 할 수 있습니다
        </Text>
      </VStack>

      <Box px={45} maxW={1280}>
        <Flex w="100%" align="center" justify="end">
          <Button h={40} px={20} onClick={() => router.push("/admin/mail/new")}>
            메일 추가
          </Button>
        </Flex>
        <TableContainer bg="white" borderRadius={14} mt={6} p={20}>
          <Table size="l" fontSize="m">
            <Thead>
              <Tr>
                <Th>No.</Th>
                <Th>ID</Th>
                <Th>보낸이</Th>
                <Th>보낸사람 메일</Th>
                <Th>제목</Th>
                <Th>피싱여부</Th>
                <Th>파일 개수</Th>
                <Th>생성일</Th>
                <Th>연결된 시나리오 개수</Th>
                <Th>수정</Th>
                <Th>삭제</Th>
              </Tr>
            </Thead>
            <Tbody>
              {mailList.map((mail, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{mail.mailId}</Td>
                  <Td>{mail.sender}</Td>
                  <Td>{mail.from}</Td>
                  <Td>{mail.title}</Td>
                  <Td>{mail.isFishing ? "피싱" : "일반"}</Td>
                  <Td>{mail.mailFiles.length}</Td>
                  <Td>{new Date(mail.createdDate).toLocaleDateString()}</Td>

                  <Td>{mail.scenarioMails.length}</Td>
                  <Td>
                    <IconButton
                      bg="none"
                      boxSize={30}
                      aria-label="Delete Todo"
                      icon={<EditIcon color="grey.shade2" />}
                      _hover={{ bg: "grey.shade1" }}
                      onClick={() =>
                        router.push(`/admin/mail/edit/${mail.mailId}`)
                      }
                    />
                  </Td>
                  <Td>
                    {mail.scenarioMails.length === 0 ? (
                      <IconButton
                        bg="none"
                        boxSize={30}
                        aria-label="Delete file"
                        icon={<TrashIcon color="grey.shade2" />}
                        _hover={{ bg: "grey.shade1" }}
                        onClick={() => {
                          deleteHandler(mail.mailId);
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
                            `연결된 시나리오가 있어 삭제할 수 없습니다.${
                              mail.scenarioMails.length > 0
                                ? "\n시나리오 ID:"
                                : ""
                            }${mail.scenarioMails.map(
                              (scenario) => ` ${scenario.scenarioId}`
                            )}`
                          );
                        }}
                      />
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
            {mailList.length === 0 && (
              <Tbody>
                <Tr>
                  <Td colSpan={11} textAlign="center">
                    메일이 없습니다.
                  </Td>
                </Tr>
              </Tbody>
            )}
          </Table>
          <Flex w="100%" align="center" justify="end">
            <Text fontSize="m" color="grey.shade2" fontWeight="medium">
              메일 수: {mailList.length}
            </Text>
          </Flex>
        </TableContainer>
      </Box>
    </Box>
  );
}
