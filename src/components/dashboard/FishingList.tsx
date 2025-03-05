"use client";
import { useState } from "react";
import { Text, Flex, VStack, Button } from "@chakra-ui/react";
import { Mail, MailFile, File } from "@prisma/client";
import FishingModal from "@/components/dashboard/FishingModal";
import { JsonValue } from "@prisma/client/runtime/library";

interface FishingListProps {
  fishingList: (Mail & { mailFiles: (MailFile & { file: File })[] })[];
  articleData: JsonValue;
}

export default function FishingList({
  fishingList,
  articleData,
}: FishingListProps) {
  const [opened, setOpened] = useState(false);
  return (
    <VStack
      w="70%"
      borderRadius={14}
      p={26}
      bg="white"
      align="center"
      spacing={20}
      h="fit-content"
    >
      <Flex w="100%" justify="space-between" align="center">
        <Text fontWeight="semibold" fontSize="l">
          이 훈련에 있었던 스피어피싱들
        </Text>
        <Button
          h={35}
          borderRadius={10}
          textAlign="center"
          variant="outline"
          onClick={() => setOpened(!opened)}
          fontWeight="medium"
          fontSize="s"
          color="secondary"
          _hover={{ bg: "secondary", color: "white" }}
        >
          {opened ? "눌러서 숨기기" : "눌러서 보기"}
        </Button>
      </Flex>
      {opened && (
        <VStack w="100%" spacing={6}>
          {fishingList.map((mail, index) => {
            return (
              <FishingModal
                key={index}
                fishingMail={mail}
                articleData={articleData}
              />
            );
          })}
        </VStack>
      )}
    </VStack>
  );
}
