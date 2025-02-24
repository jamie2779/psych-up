import React, { useState } from "react";
import { Text, Box, Flex, Input, VStack } from "@chakra-ui/react";

interface DynamicFormProps {
  placeholders: string[];
  onChange: (data: Record<string, unknown>) => void;
}

export default function DynamicForm({
  placeholders,
  onChange,
}: DynamicFormProps) {
  const [sampleData, setSampleData] = useState<Record<string, unknown>>({});

  const handleChange = (key: string, value: string) => {
    const updatedData = { ...sampleData, [key]: value };
    setSampleData(updatedData);
    onChange(updatedData);
  };

  if (placeholders.length === 0) {
    return (
      <Box p={5}>
        <Text px={5} fontSize="m" color="gray.500">
          데이터 태그가 없거나 잘못되었습니다.
        </Text>
      </Box>
    );
  }

  return (
    <VStack spacing={4} align="stretch">
      {placeholders.map((key) => (
        <Flex key={key} px={5} gap={10} align="center">
          <Text fontSize="m">{key} :</Text>
          <Input
            flex="1"
            h={32}
            borderRadius={8}
            px={10}
            fontSize="s"
            placeholder={`${key} 샘플데이터 입력`}
            value={(sampleData[key] as string) || ""}
            onChange={(e) => handleChange(key, e.target.value)}
          />
        </Flex>
      ))}
    </VStack>
  );
}
