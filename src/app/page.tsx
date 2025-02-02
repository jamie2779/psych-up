"use client";

import Navbar from "@/components/Navbar";
import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Navbar />
      <Box
        height="100vh"
        width="100%"
        backgroundColor="body"
        position="relative"
      >
        {/* 배경 이미지 */}
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          backgroundImage="url('/index/background.svg')"
          backgroundSize="cover"
          backgroundPosition="center"
          opacity="0.15"
        />

        {/* 배경 원 1 */}
        <Box
          position="absolute"
          top="-810px"
          left="-407px"
          width="1173px"
          height="1173px"
          zIndex="0"
        >
          <svg width="100%" height="100%" viewBox="0 0 1200 1200" fill="none">
            <circle
              opacity="0.15"
              cx="50%"
              cy="50%"
              r="49%"
              stroke="#0984E3"
              strokeWidth="6"
              strokeDasharray="50 50"
            />
          </svg>
        </Box>

        {/* 배경 원 2 */}
        <Box
          position="absolute"
          top="411px"
          left="1267px"
          width="846px"
          height="846px"
          zIndex="0"
        >
          <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
            <circle opacity="0.15" cx="50%" cy="50%" r="50%" fill="#0984E3" />
          </svg>
        </Box>

        {/* 메인 컨텐츠 */}
        <Flex
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          alignItems="center"
          justifyContent="center"
          flexDirection="row"
          gap="70px"
        >
          <Box width="540px">
            <Text
              fontSize="64px"
              marginBottom="60px"
              fontWeight="regular"
              textStyle="gradient"
              userSelect="none"
            >
              Psych-up
            </Text>
            <Text
              fontSize="l"
              marginBottom="60px"
              maxWidth="600px"
              userSelect="none"
            >
              여기에 사이크-업에 대한 목표나 간단한 서비스를 소개하는 곳입니다
              <br />이 내용은 나중에 회의를 통해 정하도록 하겠습니다!
              <br />
              <br />
              지금 바로 사이크업을 시작해보세요
            </Text>
            <Button
              variant="outline"
              borderColor="primary"
              color="primary"
              _hover={{ bg: "primary", color: "white" }}
            >
              사이크업 시작하기
            </Button>
          </Box>
          <Flex
            backgroundColor="rgba(255, 255, 255, 0.5)"
            borderRadius="30px"
            width="420px"
            height="420px"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              src="/Icon.svg"
              alt="Training Illustration"
              boxSize="300px"
              draggable="false"
            />
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
