"use client";
import { Box, Text, VStack } from "@chakra-ui/react";

export default function AdminHome() {
  return (
    <Box h="100%">
      <VStack pt={70} pb={30} px={45} spacing={6} align="flex-start">
        <Text fontSize={32} fontWeight="medium" textStyle="gradient2">
          Psych-Up 관리자 페이지
        </Text>
        <Text fontSize="m" color="grey.shade2" fontWeight="regular">
          시나리오 관리 및 메일 관리를 위한 관리자 페이지입니다.
        </Text>
      </VStack>
    </Box>
  );
}
