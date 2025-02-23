"use client";
import DefaultProfile from "@/assets/nav/DefaultProfile.svg";
import logo from "@/assets/Logo2.svg";

import Image from "next/image";
import { Box, Flex, Button, VStack, HStack, Text } from "@chakra-ui/react";
import {
  HomeIcon,
  PuzzleIcon,
  MailIcon,
  PersonIcon,
  LogoutIcon,
} from "@/assets/IconSet";
import { useRouter, usePathname } from "next/navigation";
import { User, Permission } from "@prisma/client";

import { signOut } from "next-auth/react";

interface DashboardNavProps {
  user: User;
}

export default function DashboardNav({ user }: DashboardNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { label: "홈", icon: HomeIcon, route: "/dashboard" },
    { label: "훈련", icon: PuzzleIcon, route: "/dashboard/training" },
    { label: "메일함", icon: MailIcon, route: "/dashboard/mail" },
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
      <Image src={logo} alt="logo" width={130} />

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
        {user.permission === Permission.admin && (
          <Button
            leftIcon={<PersonIcon boxSize={24} color="error" />}
            iconSpacing={5}
            w="100%"
            h={36}
            fontSize="xs"
            variant="outline"
            borderColor="grey.shade2"
            color="grey.shade2"
            _hover={{ bg: "grey.shade2", color: "white" }}
            onClick={() => router.push("/admin")}
          >
            관리자 페이지
          </Button>
        )}
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
