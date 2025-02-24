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
  Tooltip,
} from "@chakra-ui/react";
import { TrashIcon } from "@/assets/IconSet";
import SelectMailModal from "@/components/admin/SelectMailModal";
import { Mail } from "@prisma/client";

interface MailListModalProps {
  isDisabled?: boolean;
  mailList: Mail[];
  setMailList: React.Dispatch<React.SetStateAction<Mail[]>>;
}

export default function MailList({
  isDisabled,
  mailList,
  setMailList,
}: MailListModalProps) {
  const addMail = async (newMail: Mail) => {
    setMailList((prev) => [...prev, newMail]);
  };

  return (
    <Box w="100%" bg="white" borderRadius={14} p={20}>
      <TableContainer>
        <Flex w="100%" align="center" justify="space-between">
          <Text fontSize="l" fontWeight="semibold">
            메일 목록
          </Text>
          <Flex gap={10}>
            <SelectMailModal
              isDisabled={isDisabled}
              addMail={addMail}
              mailList={mailList}
            />
          </Flex>
        </Flex>
        <Table size="l" fontSize="m">
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>Id</Th>
              <Th>보낸이</Th>
              <Th>이메일</Th>
              <Th>제목</Th>
              <Th>피싱여부</Th>
              <Th>생성일</Th>
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
                <Td>
                  <Tooltip
                    closeOnClick={false}
                    px={10}
                    py={4}
                    borderRadius={8}
                    label={mail.title}
                    placement="top"
                    fontSize="s"
                    fontWeight="regular"
                    hasArrow
                    sx={{
                      minWidth: "fit-content",
                      maxWidth: "500px",
                      textAlign: "center",
                    }}
                  >
                    <Box maxW={500} isTruncated>
                      {mail.title}
                    </Box>
                  </Tooltip>
                </Td>
                <Td>{mail.isFishing ? "피싱" : "일반"}</Td>
                <Td>{new Date(mail.createdDate).toLocaleString()}</Td>
                <Td>
                  <IconButton
                    bg="none"
                    boxSize={30}
                    aria-label="Delete mail"
                    icon={<TrashIcon color="grey.shade2" />}
                    _hover={{ bg: "grey.shade1" }}
                    onClick={() => {
                      setMailList((prev) =>
                        prev.filter((_, idx) => idx !== index)
                      );
                    }}
                    isDisabled={isDisabled}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
          {mailList.length === 0 && (
            <Tbody>
              <Tr>
                <Td colSpan={8} textAlign="center">
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
  );
}
