import { ProhibitIcon, StarIcon, TrashIcon } from "@/assets/IconSet";
import { Flex } from "@chakra-ui/react";

interface MailQuickActionProps {
  mailID: number;
}

export default function MailQuickAction({ mailID }: MailQuickActionProps) {
  return (
    <Flex gap={16}>
      <StarIcon
        w={24}
        h={24}
        _hover={{
          cursor: "pointer",
          fill: "yellow",
        }}
        // 원래 onClick은 button 같은 상호작용 요소에서 사용해야 하지만, 여기서는 빠른 개발을 위해 사용
        onClick={() => {
          // 여기에 삭제 로직 추가
          confirm(`Delete mail ID: ${mailID}`);
        }}
      />
      <ProhibitIcon
        w={24}
        h={24}
        _hover={{
          cursor: "pointer",
          fill: "danger",
        }}
        onClick={() => {
          confirm(`Delete mail ID: ${mailID}`);
        }}
      />
      <TrashIcon
        w={24}
        h={24}
        _hover={{
          cursor: "pointer",
          fill: "grey",
        }}
        onClick={() => {
          confirm(`Delete mail ID: ${mailID}`);
        }}
      />
    </Flex>
  );
}
