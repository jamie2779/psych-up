"use client";
import background from "@/assets/index/background.svg";
import logo from "@/assets/Logo2.svg";

import { Image } from "@chakra-ui/next-js";
import {
  Box,
  Flex,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ky from "ky";

export default function SignUp() {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError(true);
      return;
    }

    setError(false);

    // 회원가입 요청 + toast 적용
    toast
      .promise(
        ky.post("/api/users", {
          json: { name },
        }),
        {
          loading: "회원가입 처리 중입니다...",
          success: "성공적으로 회원가입 처리되었습니다!",
          error: "회원가입 처리 중 문제가 발생했습니다.",
        }
      )
      .then(() => {
        setTimeout(() => {
          router.push("/dashboard"); // 회원가입 성공 후 /dashboard로 이동
        }, 1000);
      });
  };

  return (
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
        width={410}
        backgroundColor="white"
        borderRadius="20px"
        boxShadow="0 0 30px rgba(0, 0, 0, 0.03)"
        padding="30px"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap="40px"
      >
        <Image src={logo} alt="logo" width={160} margin="18px 27px" />

        <Flex width="100%" flexDirection="column" gap="12px">
          {/* 이름 입력 필드 (FormControl 사용) */}
          <FormControl isInvalid={error}>
            <FormLabel fontSize="m">사용자님의 이름을 알려주세요</FormLabel>
            <Input
              height={46}
              borderRadius={10}
              padding={20}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormErrorMessage fontSize="m">
              이름을 입력해주세요.
            </FormErrorMessage>
          </FormControl>

          <Button
            backgroundColor="secondary"
            width="100%"
            mt={4}
            onClick={handleSubmit}
          >
            다음
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
