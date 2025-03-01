"use client";
import { useState } from "react";
import { Flex, List, Text } from "@chakra-ui/react";

import { mailListData } from "@/lib/dummy";
import MailListElement, { MailData } from "@/components/mail/MailListElement";
import MailDisplay from "@/components/mail/MailDisplay";

export default function MailInbox() {
  const [viewing_mail, setViewingMailID] = useState<MailData | null>(null);

  return (
    <Flex flexDirection="row">
      <Flex flexDirection="column">
        <Text
          pt={30}
          pl={45}
          pb={20}
          fontSize="xl"
          fontWeight={700}
          color="--grey-2"
        >
          받은 메일함
        </Text>
        {/* 임시 리스트 박스 */}
        <List spacing={10} w="full" backgroundColor="#f4f7ff" pl={40} pr={40}>
          {mailListData.map((mailListElementData) => (
            <MailListElement
              key={mailListElementData.mailID}
              mailListElementData={mailListElementData}
              onClick={() => {
                setViewingMailID(mailListElementData);
              }}
            />
          ))}
        </List>
      </Flex>
      <MailDisplay mailData={viewing_mail} />
    </Flex>
  );
}
