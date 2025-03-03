import { Box, Flex, HStack, Text, VStack, Divider } from "@chakra-ui/react";

import MailProfile from "./MailProfile";
import MailQuickAction from "./MailQuickAction";
import { Mail, MailFile, File, MailBox } from "@prisma/client";
import ArticleViewer from "../ArticleViewer";
import FileList from "../FileList";
import { MailData } from "@/components/mail/MailListElement";
import { JsonValue } from "@prisma/client/runtime/library";

interface MailDataProps {
  mailHolderId?: number;
  mailBox?: MailBox;
  mailData?: Mail & { mailFiles: (MailFile & { file: File })[] };
  articleData?: JsonValue;
  setViewingMail?: (mailData: MailData | null) => void;
}

export default function MailDisplay({
  mailData,
  mailHolderId,
  mailBox,
  articleData,
  setViewingMail,
}: MailDataProps) {
  if (!mailData) {
    return <></>;
  }

  return (
    <Flex
      w={600}
      minW={600}
      h="100%"
      flexDirection={"column"}
      backgroundColor={"white"}
    >
      {mailHolderId && (
        <Flex
          w="100%"
          h={84}
          p={30}
          flexDirection={"row"}
          borderBottom={"2px solid #f4f7ff"}
        >
          <MailQuickAction
            mailHolderId={mailHolderId}
            mailBox={mailBox}
            gap={30}
            setViewingMail={setViewingMail}
          />
        </Flex>
      )}
      <VStack
        align={"start"}
        w={600}
        minW={600}
        pb={10}
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
            {mailData?.createdDate.toLocaleString("sv-SE", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </Flex>
        {/* 첨부파일 */}
        {mailData?.mailFiles.length > 0 && (
          <VStack w="100%" mt={10} px={20} boxSizing="border-box" align="start">
            <Text fontSize="s" fontWeight="medium">
              첨부파일 ({mailData.mailFiles.length})
            </Text>
            <FileList
              fileList={mailData.mailFiles.map((mailFile) => mailFile.file)}
              mailHolderId={mailHolderId}
            />
          </VStack>
        )}
        <Box px={20} pt={10} boxSizing="border-box" w="100%">
          <Divider />
        </Box>
      </VStack>
      {/* 메일 내용 */}
      <Box w={600} minW={600} px={20} overflow="auto" flex="1">
        <ArticleViewer content={mailData?.article} data={articleData || {}} />
      </Box>
    </Flex>
  );
}
