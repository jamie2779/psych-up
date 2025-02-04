"use client";
import background from "@/assets/index/background.svg";
import logo from "@/assets/Logo2.svg";
import google from "@/assets/login/google.svg";

import { Image } from "@chakra-ui/next-js";
import { Box, Flex, Text, Button } from "@chakra-ui/react";

export default function Login() {
  return (
    <>
      <Box
        height="100vh"
        width="100%"
        backgroundColor="body"
        position="relative"
        overflow="hidden"
      >
        {/* 배경 이미지 */}
        <Image
          src={background}
          alt="background"
          position="absolute"
          top="0"
          left="0"
          opacity="0.15"
          fill
        />

        {/* 배경 원 1 */}
        <Box
          position="absolute"
          top={-810}
          left={-407}
          width={1173}
          height={1173}
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
          bottom={-297}
          right={-193}
          width={846}
          height={846}
          zIndex="0"
        >
          <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
            <circle opacity="0.15" cx="50%" cy="50%" r="50%" fill="#0984E3" />
          </svg>
        </Box>

        {/* 배경 블러 */}
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          backgroundColor="rgba(255, 255, 255, 0.6)"
          backdropFilter="blur(10px)"
        />

        {/* 메인 컨텐츠 */}
        <Flex
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width={670}
          backgroundColor="white"
          borderRadius="20px"
          boxShadow="0 0 30px rgba(0, 0, 0, 0.03)"
          padding="30px"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          gap="20px"
        >
          <Image src={logo} alt="logo" width={160} margin="18px 27px" />
          <Button
            variant="outline"
            width={400}
            height={56}
            borderRadius="100px"
            borderColor="#747775"
            borderWidth="1px"
          >
            <Image
              src={google}
              alt="google"
              width={28}
              height={28}
              marginRight="10px"
            />
            <Text fontSize="s" fontWeight="midium">
              Google로 로그인
            </Text>
          </Button>
        </Flex>
      </Box>
    </>
  );
}
