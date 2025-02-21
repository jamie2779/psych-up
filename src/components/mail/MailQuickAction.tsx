import { ProhibitIcon, StarIcon, TrashIcon } from "@/assets/IconSet";
import { Flex, IconButton } from "@chakra-ui/react";

interface MailQuickActionProps {
  mailID: number;
}

export default function MailQuickAction({ mailID }: MailQuickActionProps) {
  return (
    <Flex gap={16}>
      <IconButton
        w={24}
        h={24}
        aria-label="Star"
        variant="ghost"
        onClick={() => {
          confirm(`Delete mail ID: ${mailID}`);
        }}
        icon={
          <StarIcon
            boxSize="100%"
            _hover={{
              cursor: "pointer",
              fill: "yellow",
            }}
          />
        }
      />
      <IconButton
        w={24}
        h={24}
        aria-label="Prohibit"
        variant="ghost"
        onClick={() => {
          confirm(`Delete mail ID: ${mailID}`);
        }}
        icon={
          <ProhibitIcon
            boxSize="100%"
            _hover={{
              cursor: "pointer",
              fill: "danger",
            }}
          />
        }
      />
      <IconButton
        w={24}
        h={24}
        aria-label="Trash"
        variant="ghost"
        onClick={() => {
          confirm(`Delete mail ID: ${mailID}`);
        }}
        icon={
          <TrashIcon
            boxSize="100%"
            _hover={{
              cursor: "pointer",
              fill: "grey",
            }}
          />
        }
      />
    </Flex>
  );
}
