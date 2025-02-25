import { Flex, Text } from "@chakra-ui/react";

import stringToHex from "@/lib/stringToHex";
import textColorByBackground from "@/lib/textColorByBackground";

import React from "react";

interface MailProfileProps {
  name: string;
}

export default function MailProfile({ name }: MailProfileProps) {
  // 이름을 HEX 컬러로 변환
  const color = stringToHex(name);
  const textColor = textColorByBackground(color);

  return (
    <Flex
      w={40}
      h={40}
      borderRadius="100%"
      backgroundColor={color}
      justifyContent="center"
      alignItems="center"
    >
      <Text color={textColor}>{name[0]}</Text>
    </Flex>
  );
}
