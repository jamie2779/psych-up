import MailBox from "@/components/mail/MailBox";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function MailSpamPage(props: {
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
      mailBox: "SPAM",
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
  });

  return <MailBox mailListData={mailListData} title="스팸 메일함" />;
}
