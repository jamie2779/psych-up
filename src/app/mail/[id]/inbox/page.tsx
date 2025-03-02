import MailBox from "@/components/mail/MailBox";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function MailInboxPage(props: {
  params?: Promise<{ id?: string }>;
}) {
  const params = await props.params;
  if (!params?.id) {
    return redirect("/404");
  }

  const trainingId = Number(params.id);

  if (Number.isNaN(trainingId)) {
    return redirect("/404");
  }

  const mailListData = await prisma.mailHolder.findMany({
    where: {
      trainingId: trainingId,
      mailBox: { in: ["INBOX", "STARRED"] },
    },
    include: {
      mail: {
        include: {
          mailFiles: {
            include: {
              file: true,
            },
          },
        },
      },
    },
    orderBy: [{ createdDate: "desc" }, { mailHolderId: "desc" }],
  });

  return <MailBox mailListData={mailListData} title="받은 메일함" />;
}
