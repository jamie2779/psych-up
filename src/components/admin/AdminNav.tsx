"use client";
import DefaultProfile from "@/assets/nav/DefaultProfile.svg";
import logo from "@/assets/Logo.svg";

import Image from "next/image";
import { Box, Flex, Button, VStack, HStack, Text } from "@chakra-ui/react";
import {
  HomeIcon,
  PersonIcon,
  PuzzleIcon,
  MailIcon,
  FileIcon,
  LogoutIcon,
} from "@/assets/IconSet";
import { useRouter, usePathname } from "next/navigation";
import { User } from "@prisma/client";

import { signOut } from "next-auth/react";

interface DashboardNavProps {
  user: User;
}

export default function DashboardNav({ user }: DashboardNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  console.log(user.profileImg);

  const menuItems = [
    { label: "관리 홈", icon: HomeIcon, route: "/admin" },
    { label: "유저 관리", icon: PersonIcon, route: "/admin/user" },
    { label: "시나리오 관리", icon: PuzzleIcon, route: "/admin/scenario" },
    { label: "메일 관리", icon: MailIcon, route: "/admin/mail" },
    { label: "파일 관리", icon: FileIcon, route: "/admin/file" },
  ];

  return (
    <Flex
      direction="column"
      align="center"
      w={250}
      minW={250}
      h="100vh"
      bg="white"
      py={40}
      px={20}
      gap={30}
    >
      {/* 로고 */}
      <Image src={logo} alt="logo" width={210} />
      {/* 대시보드로 이동 버튼 */}
      <Button
        w="100%"
        h={40}
        fontSize="s"
        fontWeight="medium"
        onClick={() => router.push("/dashboard")}
      >
        대시보드로 이동
      </Button>

      {/* 메뉴 리스트 */}
      <VStack width="100%" spacing={4}>
        {menuItems.map((item) => (
          <Button
            key={item.label}
            leftIcon={<item.icon boxSize={20} />}
            iconSpacing={16}
            backgroundColor={pathname === item.route ? "#F5F5F5" : "white"}
            justifyContent="flex-start"
            w="100%"
            color={pathname === item.route ? "black" : "grey"}
            _hover={{ bg: "#F5F5F5", color: "black" }}
            onClick={() => router.push(item.route)}
          >
            {item.label}
          </Button>
        ))}
      </VStack>

      {/* 유저 정보 & 로그아웃 */}
      <VStack mt="auto" spacing={14} w="100%" px={10}>
        <HStack spacing={16}>
          <Box borderRadius="full" overflow="hidden" width={42} height={42}>
            <Image
              src={user.profileImg || DefaultProfile}
              alt="profile"
              width={42}
              height={42}
            />
          </Box>
          <Text fontSize="m" fontWeight="medium">
            {user.name + "님"}
          </Text>
        </HStack>

        <Button
          leftIcon={<LogoutIcon boxSize={24} color="error" />}
          iconSpacing={5}
          w="100%"
          h={36}
          fontSize="xs"
          variant="outline"
          borderColor="danger"
          color="danger"
          _hover={{ bg: "danger", color: "white" }}
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          로그아웃
        </Button>
      </VStack>
    </Flex>
  );
}
