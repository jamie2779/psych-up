"use client";
import {
  Box,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  Center,
  Divider,
  ModalBody,
  ModalCloseButton,
  VStack,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Mail, MailFile, File } from "@prisma/client";
import MailDisplay from "@/components/mail/MailDisplay";

interface FishingModalProps {
  fishingMail: Mail & { mailFiles: (MailFile & { file: File })[] };
}

export default function FishingModal({ fishingMail }: FishingModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        w="100%"
        px={20}
        py={16}
        borderColor="#E9E9E9"
        borderRadius={14}
        borderWidth={1}
        align="center"
        justify="space-between"
        _hover={{ bg: "#F5F5F5", cursor: "pointer" }}
        onClick={onOpen}
      >
        <Text fontWeight="medium" fontSize="s">
          {fishingMail.title}
        </Text>
        <Text fontWeight="regular" fontSize="xs" color="#A6A6A6">
          {fishingMail.sender} · {fishingMail.from}
        </Text>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          w="70vw"
          maxW="1260px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          margin="auto"
          p={30}
          borderRadius={14}
        >
          <ModalCloseButton m={10} />
          <ModalBody w="100%">
            <Flex gap={30}>
              <Box w="50%" maxH={750}>
                <MailDisplay mailData={fishingMail} />
              </Box>
              <Center height="700">
                <Divider orientation="vertical" />
              </Center>
              <VStack flex="1" align="flex-start" spacing={10}>
                <Text fontWeight="bold" fontSize="xl">
                  피싱 유도 내용
                </Text>
                <Text fontWeight="regular" fontSize="s">
                  {fishingMail.fishingDetail}
                </Text>
              </VStack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
