"use client";
import { Box, Text, Flex, VStack } from "@chakra-ui/react";
import ScenarioForm from "@/components/admin/ScenarioForm";
import { ArrowIcon } from "@/assets/IconSet";
import { useRouter } from "next/navigation";

export default function AdminNewScenario() {
  const router = useRouter();
  return (
    <Box h="100%">
      <VStack pt={40} pb={30} px={45} spacing={6} align="flex-start">
        {/*돌아가기 버튼 */}
        <Flex
          gap={5}
          align="center"
          onClick={() => router.push("/admin/scenario")}
          _hover={{
            cursor: "pointer",
            transform: "scale(1.02)",
            transition: "0.2s",
          }}
        >
          <ArrowIcon boxSize={24} color="#ABABAB" />
          <Text color="#ABABAB" fontSize="m" fontWeight="regular">
            돌아가기
          </Text>
        </Flex>

        <Text fontSize={32} fontWeight="medium" textStyle="gradient2">
          시나리오 추가
        </Text>
        <Text fontSize="m" color="grey.shade2" fontWeight="regular">
          새로운 시나리오를 추가합니다
        </Text>
      </VStack>

      <Box px={45} pb={40} maxW={1280}>
        <ScenarioForm />
      </Box>
    </Box>
  );
}
