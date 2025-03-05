"use client";

import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import MailQuickAction from "./MailQuickAction";
import { MailHolder, Mail, MailFile, File } from "@prisma/client";
import { renderTemplate } from "@/lib/utils";
import { JsonValue } from "@prisma/client/runtime/library";

export type MailData = MailHolder & {
  mail: Mail & { mailFiles: (MailFile & { file: File })[] };
};

interface MailListElementDataProps {
  mailListElementData: MailData;
  onClick?: () => void;
  setViewingMail?: (mailData: MailData | null) => void;
  articleData?: JsonValue;
}

export default function MailListElement({
  mailListElementData,
  onClick,
  setViewingMail,
  articleData,
}: MailListElementDataProps) {
  const [isHover, setHover] = useState(false);

  return (
    <Flex
      h={90}
      justifyContent={"space-between"}
      alignItems={"center"}
      px={26}
      bg={"white"}
      borderRadius={14}
      pl={12}
      pr={36}
      _hover={{
        cursor: "pointer",
      }}
      onClick={onClick}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <Flex gap={12} align="center">
        {/* isRead 태그 */}
        <Box
          w={8}
          h={8}
          borderRadius="full"
          backgroundColor={
            mailListElementData.isRead ? "transparent" : "secondary"
          }
        />
        {/* 메일의 내용 (세로 방향 스택) */}
        <VStack flex="1" align={"start"} spacing={0}>
          <Text mb={3} fontSize={"m"} fontWeight={"600"}>
            {renderTemplate(mailListElementData.mail.title, articleData || {})}
          </Text>
          <Text fontSize={"s"} color={"#a6a6a6"}>
            {renderTemplate(mailListElementData.mail.sender, articleData || {})}
            ㆍ{renderTemplate(mailListElementData.mail.from, articleData || {})}
          </Text>
          {/* <Text
            fontSize={"s"}
            color={"#a6a6a6"}
            noOfLines={1}
            textOverflow={"ellipsis"}
          >
            {mailListElementData.mail.article.replaceAll("\n", " ")}
          </Text> */}
        </VStack>
      </Flex>
      {/* hover가 아닐 땐 시간이 뜹니다 */}
      {!isHover && (
        <Text
          fontSize={"xs"}
          color={"#a6a6a6"}
          noOfLines={1}
          minW={"fit-content"}
        >
          {mailListElementData.createdDate.toLocaleString("sv-SE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      )}
      {/* hover중일 땐 퀵메뉴가 뜹니다 */}
      {isHover && (
        <MailQuickAction
          mailHolderId={mailListElementData.mailHolderId}
          mailBox={mailListElementData.mailBox}
          setViewingMail={setViewingMail}
        />
      )}
    </Flex>
  );
}
