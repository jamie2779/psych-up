import { List } from "@chakra-ui/react";

import { mailListData } from "@/lib/dummy";
import MailListElement from "@/components/mail/MailListElement";

export default function Mail() {
  return (
    // 임시 리스트 박스
    <List spacing={10} w="full" backgroundColor="#f4f7ff" p={20}>
      {mailListData.map((mailListElementData) => (
        <MailListElement
          key={mailListElementData.mailID}
          mailListElementData={mailListElementData}
        />
      ))}
    </List>
  );
}
