"use client";
import Plus from "@/assets/dashboard/Plus.svg";
import { Image } from "@chakra-ui/next-js";
import { Box, Text, Flex } from "@chakra-ui/react";

interface NewTrainingCellProps {
  scrollToRef: React.RefObject<HTMLDivElement | null>;
}

export default function NewTrainingCell({ scrollToRef }: NewTrainingCellProps) {
  return (
    <Box
      position="relative"
      h={200}
      borderRadius={14}
      onClick={() => {
        if (scrollToRef?.current) {
          scrollToRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }}
      _hover={{
        cursor: "pointer",
        boxShadow: "0px 4px 20px rgba(0, 31, 99, 0.05)",
        transform: "scale(1.02)",
      }}
    >
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
        gap={14}
        flexDirection="column"
      >
        <Image src={Plus} alt="Plus" boxSize={64} />
        <Text fontSize="s" fontWeight="medium" color="grey.shade2">
          새로운 훈련을 시작해보세요
        </Text>
      </Flex>
    </Box>
  );
}
