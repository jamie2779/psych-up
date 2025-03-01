"use client";
import { useState } from "react";
import { Box, Text, Flex, VStack, Button } from "@chakra-ui/react";
import { Mail, MailFile, File } from "@prisma/client";
import FishingModal from "@/components/dashboard/FishingModal";

interface FishingListProps {
  fishingList: (Mail & { mailFiles: (MailFile & { file: File })[] })[];
}

export default function FishingList({ fishingList }: FishingListProps) {
  const [opened, setOpened] = useState(false);
  return (
    <Box w="100%" maxW={1280} px={40} mt={10}>
      <VStack
        w="70%"
        borderRadius={14}
        p={26}
        bg="white"
        align="center"
        spacing={20}
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
              return <FishingModal key={index} fishingMail={mail} />;
            })}
          </VStack>
        )}
      </VStack>
    </Box>
  );
}
