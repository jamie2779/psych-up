import { ProhibitIcon, StarIcon, TrashIcon } from "@/assets/IconSet";
import { Flex, IconButton } from "@chakra-ui/react";
import { MailBox } from "@prisma/client";
import ky from "ky";
import toast from "react-hot-toast";

interface MailQuickActionProps {
  mailHolderId: number;
  mailBox?: MailBox;
  gap?: number;
}

export default function MailQuickAction({
  mailHolderId,
  gap = 16,
  mailBox,
}: MailQuickActionProps) {
  const mailBoxHandler = async (mailHolderId: number, mailBox: MailBox) => {
    await toast.promise(
      ky.post("/api/mailbox", {
        json: { mailHolderId: mailHolderId, mailBox: mailBox },
      }),
      {
        loading: "처리 중입니다.",
        success: "처리 되었습니다.",
        error: "처리 중 문제가 발생하였습니다.",
      }
    );
  };

  return (
    <Flex gap={gap}>
      <IconButton
        w={24}
        h={24}
        aria-label="Star"
        variant="ghost"
        onClick={() => {
          if (mailBox !== "STARRED") mailBoxHandler(mailHolderId, "STARRED");
          else mailBoxHandler(mailHolderId, "INBOX");
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
          if (mailBox !== "SPAM") mailBoxHandler(mailHolderId, "SPAM");
          else mailBoxHandler(mailHolderId, "INBOX");
        }}
        icon={
          <ProhibitIcon
            boxSize="100%"
            fill={mailBox === "SPAM" ? "danger" : "none"}
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
          if (mailBox !== "TRASH") mailBoxHandler(mailHolderId, "TRASH");
          else mailBoxHandler(mailHolderId, "INBOX");
        }}
        icon={
          <TrashIcon
            boxSize="100%"
            fill={mailBox === "TRASH" ? "grey" : "none"}
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
