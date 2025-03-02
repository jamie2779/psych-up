"use client";
import { useEffect, useState } from "react";
import { Box, Flex, List, Text } from "@chakra-ui/react";

import MailListElement, { MailData } from "@/components/mail/MailListElement";
import MailDisplay from "@/components/mail/MailDisplay";
import ky from "ky";

interface MailBoxProps {
  mailListData: MailData[];
  title: string;
}

export default function MailBox({
  mailListData: initialMailListData,
  title,
}: MailBoxProps) {
  const [mailListData, setMailListData] =
    useState<MailData[]>(initialMailListData);
  const [viewing_mail, setViewingMail] = useState<MailData | null>(null);

  useEffect(() => {
    if (viewing_mail?.isRead === false) {
      ky.get(`/api/mail/${viewing_mail.mailHolderId}/read`);

      setMailListData((prev) =>
        prev.map((mail) =>
          mail.mailHolderId === viewing_mail.mailHolderId
            ? { ...mail, isRead: true }
            : mail
        )
      );

      setViewingMail((prev) => (prev ? { ...prev, isRead: true } : prev));
    }
  }, [viewing_mail]);

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
        {/* 메일 리스트 */}
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
              onClick={() => setViewingMail(mailListElementData)}
              setViewingMail={setViewingMail}
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
          setViewingMail={setViewingMail}
        />
      </Box>
    </Flex>
  );
}
