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
  Tooltip,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Mail } from "@prisma/client";
import { CheckIcon } from "@/assets/IconSet";
import ky from "ky";
import toast from "react-hot-toast";

interface SelectMailModalProps {
  isDisabled?: boolean;
  addMail: (newMail: Mail) => void;
  mailList: Mail[];
}

export default function SelectMailModal({
  addMail,
  isDisabled,
  mailList,
}: SelectMailModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const [targetMails, setTargetMails] = useState<Mail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!isOpen) return;
    const fetchMails = async () => {
      try {
        const mails = await ky.get("/api/admin/mail").json<Mail[]>();
        const unSelectedMails = mails.filter(
          (mail) =>
            !mailList.some(
              (existingMail) => existingMail.mailId === mail.mailId
            )
        );
        setTargetMails(unSelectedMails);
        setIsLoading(false);
      } catch (err) {
        toast.error("메일 목록을 불러오는 중 오류 발생");
        onClose();
      }
    };

    fetchMails();
  }, [isOpen]);

  const handleSubmit = () => {
    if (selected.length === 0) {
      return;
    }

    const selectedMails = targetMails.filter((mail) =>
      selected.includes(mail.mailId.toString())
    );

    selectedMails.forEach((mail: Mail) => addMail(mail));

    setSelected([]);
    onClose();
  };

  return (
    <>
      <Button h={40} px={20} isDisabled={isDisabled} onClick={onOpen}>
        메일 연결
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
          <ModalHeader w="100%">메일 연결</ModalHeader>
          <ModalCloseButton m={10} />
          <ModalBody w="100%">
            <FormLabel px={5} fontSize="m">
              연결할 메일 선택
            </FormLabel>
            <Box maxH="500px" overflowY="auto">
              <CheckboxGroup value={selected} onChange={setSelected}>
                <TableContainer bg="white" borderRadius={14} mt={6} p={20}>
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
                        <Th textAlign="center">선택</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {targetMails.map((mail, index) => (
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
                          <Td textAlign="center" py={2}>
                            <Checkbox
                              value={mail.mailId.toString()}
                              overflow="hidden"
                              icon={<CheckIcon boxSize={36} />}
                              isInvalid={false}
                            />
                          </Td>
                        </Tr>
                      ))}
                      {isLoading && (
                        <Tr>
                          <Td colSpan={8} textAlign="center">
                            메일 불러오는 중...
                          </Td>
                        </Tr>
                      )}
                      {!isLoading && targetMails.length === 0 && (
                        <Tr>
                          <Td colSpan={8} textAlign="center">
                            메일이 없습니다.
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
                메일 수: {targetMails.length}
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
                ? "메일을 선택해 주세요"
                : `메일 ${selected.length}개 첨부`}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
