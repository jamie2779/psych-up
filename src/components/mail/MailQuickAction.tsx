import { ProhibitIcon, StarIcon, TrashIcon } from "@/assets/IconSet";
import { Flex, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { MailBox } from "@prisma/client";
import ky from "ky";
import toast from "react-hot-toast";
import { MailData } from "@/components/mail/MailListElement";

interface MailQuickActionProps {
  mailHolderId: number;
  mailBox?: MailBox;
  gap?: number;
  setViewingMail?: (mailData: MailData | null) => void;
}

export default function MailQuickAction({
  mailHolderId,
  gap = 16,
  mailBox,
  setViewingMail,
}: MailQuickActionProps) {
  const router = useRouter();

  const mailBoxHandler = async (
    mailHolderId: number,
    targetMailBox: MailBox
  ) => {
    await toast.promise(
      ky.post("/api/mailbox", {
        json: { mailHolderId: mailHolderId, mailBox: targetMailBox },
      }),
      {
        loading: "이동 중입니다.",
        success: "이동 되었습니다.",
        error: "이동 중 문제가 발생하였습니다.",
      }
    );

    setViewingMail?.(null);
    router.refresh();
  };

  return (
    <Flex gap={gap}>
      <IconButton
        w={24}
        h={24}
        aria-label="Star"
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation();
          if (mailBox !== "STARRED") mailBoxHandler(mailHolderId, "STARRED");
          else mailBoxHandler(mailHolderId, "INBOX");
        }}
        icon={
          <StarIcon
            boxSize="100%"
            fill={mailBox === "STARRED" ? "yellow" : "none"}
            _hover={{
              cursor: "pointer",
              transform: "scale(1.1)",
            }}
          />
        }
      />
      <IconButton
        w={24}
        h={24}
        aria-label="Prohibit"
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation();
          if (mailBox !== "SPAM") mailBoxHandler(mailHolderId, "SPAM");
          else mailBoxHandler(mailHolderId, "INBOX");
        }}
        icon={
          <ProhibitIcon
            boxSize="100%"
            fill={mailBox === "SPAM" ? "danger" : "none"}
            _hover={{
              cursor: "pointer",
              transform: "scale(1.1)",
            }}
          />
        }
      />
      <IconButton
        w={24}
        h={24}
        aria-label="Trash"
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation();
          if (mailBox !== "TRASH") mailBoxHandler(mailHolderId, "TRASH");
          else mailBoxHandler(mailHolderId, "INBOX");
        }}
        icon={
          <TrashIcon
            boxSize="100%"
            fill={mailBox === "TRASH" ? "grey" : "none"}
            _hover={{
              cursor: "pointer",
              transform: "scale(1.1)",
            }}
          />
        }
      />
    </Flex>
  );
}
