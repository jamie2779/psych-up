"use client";
import { useState } from "react";
import {
  Text,
  Flex,
  VStack,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
} from "@chakra-ui/react";
import { BackIcon, SearchIcon } from "@/assets/IconSet";
import TrainingCell from "./TrainingCell";
import NewTrainingCell from "./NewTrainingCell";

export interface TrainingData {
  id: number;
  type: string;
  title: string;
  detail: string;
}

interface TrainingListProps {
  title: string;
  trainingListData: TrainingData[];
  showButton: boolean;
  scrollToRef?: React.RefObject<HTMLDivElement | null>; // 스크롤할 ref 추가
}

export default function TrainingList({
  title,
  trainingListData,
  scrollToRef,
}: TrainingListProps) {
  // 중복되지 않는 type 추출
  const uniqueTypes = Array.from(
    new Set(trainingListData.map((item) => item.type))
  );

  // 상태 관리
  const [selectedType, setSelectedType] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 필터링 로직
  const filteredData = trainingListData.filter((data) => {
    const matchesType = selectedType ? data.type === selectedType : true;
    const matchesSearch =
      searchQuery === "" ||
      data.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.detail.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });

  return (
    <VStack w="100%" spacing={10} align="flex-start" mb={50}>
      <Flex w="100%" justify="space-between" align="center">
        <Text px={5} fontSize="l" fontWeight="medium" color="grey.shade2">
          {title}
        </Text>
        <Flex gap={10}>
          {/* Select 필터링 */}
          <Select
            w={200}
            h={36}
            bg="white"
            color="#ADADAD"
            border="none"
            borderRadius={14}
            fontSize="xs"
            fontWeight="regular"
            placeholder="분류 선택"
            textIndent="11px"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            icon={
              <BackIcon
                transform="rotate(-90deg)"
                boxSize={18}
                sx={{ position: "absolute", right: "8px" }}
              />
            }
          >
            {uniqueTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </Select>

          {/* 검색 기능 */}
          <InputGroup w={250} h={36} borderRadius={14}>
            <InputLeftElement
              pointerEvents="none"
              display="flex"
              alignItems="center"
              h="100%"
              w={36}
            >
              <SearchIcon boxSize={18} color="#ADADAD" />
            </InputLeftElement>
            <Input
              w={250}
              h={36}
              pl={36}
              borderRadius={14}
              bg="white"
              border="none"
              fontSize="xs"
              fontWeight="regular"
              placeholder="리스트에서 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </Flex>
      </Flex>

      {/* 필터링된 결과 출력 */}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={20}>
        {filteredData.length > 0 ? (
          <>
            {filteredData.map((data, index) => (
              <TrainingCell key={index} {...data} />
            ))}
            {scrollToRef && <NewTrainingCell scrollToRef={scrollToRef} />}
          </>
        ) : (
          <Text color="grey.shade2">일치하는 항목이 없습니다.</Text>
        )}
      </SimpleGrid>
    </VStack>
  );
}
