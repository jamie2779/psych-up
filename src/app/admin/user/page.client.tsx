"use client";
import {
  Box,
  Flex,
  Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/next-js";
import DefaultProfile from "@/assets/nav/DefaultProfile.svg";
import { User } from "@prisma/client";

interface AdminUserProps {
  users: User[];
}

export default function AdminUser({ users }: AdminUserProps) {
  return (
    <Box h="100%">
      <VStack pt={70} pb={30} px={45} spacing={6} align="flex-start">
        <Text fontSize={32} fontWeight="medium" textStyle="gradient2">
          유저 관리
        </Text>
        <Text fontSize="m" color="grey.shade2" fontWeight="regular">
          유저 정보를 확인할 수 있습니다
        </Text>
      </VStack>

      <Box maxW={1280} px={45}>
        <TableContainer bg="white" borderRadius={14} mt={6} p={20}>
          <Table size="l" fontSize="m">
            <Thead>
              <Tr>
                <Th>No.</Th>
                <Th>ID</Th>
                <Th>프로필</Th>
                <Th>이름</Th>
                <Th>이메일</Th>
                <Th>권한</Th>
                <Th>가입일</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{user.memberId}</Td>
                  <Td>
                    <Image
                      width={40}
                      height={40}
                      borderRadius="full"
                      src={user.profileImg || DefaultProfile}
                      alt="프로필 이미지"
                    />
                  </Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.permission}</Td>
                  <Td>{new Date(user.createdDate).toLocaleDateString()}</Td>
                </Tr>
              ))}
            </Tbody>
            {users.length === 0 && (
              <Tbody>
                <Tr>
                  <Td colSpan={7} textAlign="center">
                    유저가 없습니다.
                  </Td>
                </Tr>
              </Tbody>
            )}
          </Table>
          <Flex w="100%" align="center" justify="end">
            <Text fontSize="m" color="grey.shade2" fontWeight="medium">
              유저 수: {users.length}
            </Text>
          </Flex>
        </TableContainer>
      </Box>
    </Box>
  );
}
