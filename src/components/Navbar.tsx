"use client";
import logo from "@/assets/Logo.svg";

import { Image } from "@chakra-ui/next-js";
import { Box, Flex, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <Box
      as="nav"
      position="fixed"
      top="0"
      left="0"
      right="0"
      height={80}
      backgroundColor="white"
      zIndex="1000"
    >
      <Flex
        height="100%"
        margin="0 auto"
        paddingX="180px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Image
          src={logo}
          alt="logo"
          width={205}
          height={80}
          draggable="false"
        />
        <Button
          colorScheme="primary"
          width={100}
          height={46}
          onClick={() => router.push("/login")}
        >
          로그인
        </Button>
      </Flex>
    </Box>
  );
}
