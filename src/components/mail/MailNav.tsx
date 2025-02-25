"use client";
import DefaultProfile from "@/assets/nav/DefaultProfile.svg";
import logo from "@/assets/Logo.svg";

import Image from "next/image";
import { Box, Flex, Button, VStack, HStack, Text } from "@chakra-ui/react";
import {
  LogoutIcon,
  InboxIcon,
  StarIcon,
  ProhibitIcon,
  TrashIcon,
} from "@/assets/IconSet";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { User } from "@prisma/client";

import { signOut } from "next-auth/react";

interface MailNavProps {
  user: User;
}

export default function MailNav({ user }: MailNavProps) {
  const router = useRouter();
  const id = usePathname().split("/")[2];

  const menuItems = [
    {
      label: "받은메일함",
      icon: InboxIcon,
      route: `/mail/${id}/inbox`,
      display_number: 0,
    },
    {
      label: "중요메일함",
      icon: StarIcon,
      route: `/mail/${id}/starred`,
      display_number: 0,
    },
    {
      label: "스팸메일함",
      icon: ProhibitIcon,
      route: `/mail/${id}/spam`,
      display_number: 0,
    },
    {
      label: "휴지통",
      icon: TrashIcon,
      route: `/mail/${id}/trash`,
      display_number: 0,
    },
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
      gap={20}
    >
      {/* 로고 */}
      <Image src={logo} alt="logo" />

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
      <VStack width="100%">
        {menuItems.map((item) => (
          <Button
            key={item.label}
            leftIcon={<item.icon boxSize={20} />}
            iconSpacing={14}
            justifyContent="flex-start"
            w="100%"
            h={40}
            p={10}
            color="black"
            fontSize={"s"}
            backgroundColor="transparent"
            _hover={{}}
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
