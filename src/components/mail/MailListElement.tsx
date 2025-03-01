"use client";

import { Box, Flex, Text, VStack, HStack } from "@chakra-ui/react";
import { useState } from "react";
import MailQuickAction from "./MailQuickAction";

export interface MailData {
  mailID: number;
  sender: string;
  from: string;
  to: string;
  title: string;
  article: string;
  files: string[];
  isRead: boolean;
  isDownloaded: boolean;
  status: string;
  createdAt: Date;
  modifiedAt: Date;
}

interface MailListElementDataProps {
  mailListElementData: MailData;
  onClick?: () => void;
}

export default function MailListElement({
  mailListElementData,
  onClick,
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
        pointer: "cursor",
      }}
      onClick={onClick}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <HStack spacing={12}>
        {/* isRead 태그 */}
        <Box
          w={8}
          h={8}
          borderRadius={"100%"}
          backgroundColor={
            mailListElementData.isRead ? "transparent" : "secondary"
          }
        />
        {/* 메일의 내용 (세로 방향 스택) */}
        <VStack align={"start"} spacing={0}>
          <Text mb={3} fontSize={"m"} fontWeight={"600"}>
            {mailListElementData.title}
          </Text>
          <Text fontSize={"s"} color={"#a6a6a6"}>
            {mailListElementData.sender}ㆍ{mailListElementData.from}
          </Text>
          <Text
            fontSize={"s"}
            color={"#a6a6a6"}
            noOfLines={1}
            textOverflow={"ellipsis"}
          >
            {mailListElementData.article.replaceAll("\n", " ")}
          </Text>
        </VStack>
      </HStack>
      {/* hover가 아닐 땐 시간이 뜹니다 */}
      {!isHover && (
        <Text
          fontSize={"xs"}
          color={"#a6a6a6"}
          noOfLines={1}
          minW={"fit-content"}
        >
          {mailListElementData.createdAt.toLocaleString("sv-SE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      )}
      {/* hover중일 땐 퀵메뉴가 뜹니다 */}
      {isHover && <MailQuickAction mailID={mailListElementData.mailID} />}
    </Flex>
  );
}
