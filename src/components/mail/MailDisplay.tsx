import { MailData } from "./MailListElement";

import { Flex, HStack, Text, VStack } from "@chakra-ui/react";

import MailProfile from "./MailProfile";
import MailQuickAction from "./MailQuickAction";

interface MailDataProps {
  mailData: MailData | null;
}

export default function MailDisplay({ mailData }: MailDataProps) {
  if (mailData === null) {
    return <></>;
  }

  return (
    <Flex w={600} minW={600} h="100vh" flexDirection={"column"}>
      <Flex
        w="100%"
        h={84}
        p={30}
        flexDirection={"row"}
        backgroundColor={"white"}
        borderBottom={"2px solid #f4f7ff"}
      >
        <MailQuickAction mailID={mailData?.mailID} gap={30} />
      </Flex>
      <VStack
        align={"start"}
        w={600}
        minW={600}
        h="100vh"
        backgroundColor="white"
      >
        {/* 메일 제목 */}
        <Text p={20} fontSize="xl" fontWeight="700">
          {mailData?.title}
        </Text>
        {/* 보낸 사람의 프로필 */}
        <Flex
          justify={"space-between"}
          w="100%"
          pl={20}
          pr={20}
          boxSizing="border-box"
        >
          <HStack gap={16}>
            <MailProfile name={mailData?.sender ?? "Unnamed"} />
            <VStack align={"start"} spacing={0}>
              <Text fontSize={"s"} fontWeight={500}>
                {mailData?.sender}
              </Text>
              <Text fontSize={"xs"} color="#acacac">
                From. {mailData?.from}
              </Text>
            </VStack>
          </HStack>
          {/* 수신한 날짜 */}
          <Text fontSize={"xs"} color="#acacac">
            {mailData?.createdAt.toLocaleString("sv-SE", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </Flex>
        {/* 메일 내용 */}
        <Text p={20} fontSize={"s"} lineHeight={"200%"}>
          {mailData?.article}
        </Text>
      </VStack>
    </Flex>
  );
}
