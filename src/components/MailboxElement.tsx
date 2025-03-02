"use client";
import { Box, Text, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export interface MailboxData {
  type: string;
  title: string;
  isCompleted: boolean;
  progress: number;
  trainingId: number;
}

interface MailboxDataProps {
  mailboxData: MailboxData;
}

export default function MailboxElement({ mailboxData }: MailboxDataProps) {
  const router = useRouter();
  return (
    <Flex
      w="100%"
      bg="white"
      p={26}
      borderRadius={14}
      align="center"
      onClick={() => router.push(`/mail/${mailboxData.trainingId}`)}
      _hover={{
        cursor: "pointer",
        transform: "scale(1.01)",
        transition: "0.2s",
      }}
    >
      <Text
        w={90}
        fontSize="s"
        fontWeight="regular"
        color="white"
        bg="primary"
        px={14}
        py={6}
        borderRadius={24}
        textAlign="center"
      >
        {mailboxData.type}
      </Text>
      <Text fontSize="m" fontWeight="regular" ml={14}>
        {mailboxData.title}
      </Text>
      <Text fontSize="xs" fontWeight="medium" color="#8C8C8C" ml="auto" mr={7}>
        {mailboxData.progress}% 완료
      </Text>
      <Box
        w={200}
        h={20}
        borderColor="grey.shade1"
        borderWidth={1}
        borderRadius={20}
        position="relative"
      >
        <Box
          w={`${mailboxData.progress}%`}
          h="100%"
          bg={mailboxData.progress === 100 ? "success" : "secondary"}
          borderRadius={20}
          position="absolute"
        ></Box>
      </Box>
    </Flex>
  );
}
