"use client";
import { useState } from "react";
import { Box, Flex, List, Text } from "@chakra-ui/react";

import MailListElement, { MailData } from "@/components/mail/MailListElement";
import MailDisplay from "@/components/mail/MailDisplay";

interface MailBoxProps {
  mailListData: MailData[];
  title: String;
}

export default function MailBox({ mailListData, title }: MailBoxProps) {
  const [viewing_mail, setViewingMailID] = useState<MailData | null>(null);

  return (
    <Flex flexDirection="row" w="100%">
      <Flex flexDirection="column" w="100%">
        <Text
          pt={30}
          pl={45}
          pb={20}
          fontSize="xl"
          fontWeight={700}
          color="--grey-2"
        >
          {title}
        </Text>
        {/* 임시 리스트 박스 */}
        <List
          spacing={10}
          w="100%"
          maxW={1280}
          backgroundColor="#f4f7ff"
          pl={40}
          pr={40}
        >
          {mailListData.map((mailListElementData) => (
            <MailListElement
              key={mailListElementData.mailHolderId}
              mailListElementData={mailListElementData}
              onClick={() => {
                setViewingMailID(mailListElementData);
              }}
            />
          ))}
          {mailListData.length === 0 && (
            <Box position="relative" w="100%" h="100px">
              <Box
                as="svg"
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                viewBox="0 0 100% 100%"
                pointerEvents="none"
              >
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  rx="14"
                  ry="14"
                  fill="none"
                  stroke="rgba(0, 0, 0, 0.1)"
                  strokeWidth="1"
                  strokeDasharray="8 8"
                />
              </Box>
              <Flex
                w="100%"
                h="100%"
                align="center"
                justify="center"
                bg="#EFF4FC"
                borderRadius={14}
              >
                <Text fontSize="s" fontWeight="medium" color="grey.shade2">
                  이 곳은 텅텅 비었네요...
                </Text>
              </Flex>
            </Box>
          )}
        </List>
      </Flex>
      <Box flex="1" h="100vh">
        <MailDisplay
          mailHolderId={viewing_mail?.mailHolderId}
          mailData={viewing_mail?.mail}
          mailBox={viewing_mail?.mailBox}
        />
      </Box>
    </Flex>
  );
}
