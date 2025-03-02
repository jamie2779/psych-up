import { ProhibitIcon, StarIcon, TrashIcon } from "@/assets/IconSet";
import { Flex, IconButton } from "@chakra-ui/react";
import { MailBox } from "@prisma/client";

interface MailQuickActionProps {
  mailID: number;
  mailBox?: MailBox;
  gap?: number;
}

export default function MailQuickAction({
  mailID,
  gap = 16,
  mailBox,
}: MailQuickActionProps) {
  return (
    <Flex gap={gap}>
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
            fill={mailBox === "STARRED" ? "yellow" : "none"}
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
