import MailBox from "@/components/mail/MailBox";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { dataGenerator } from "@/lib/utils";
import { auth } from "@/auth";

export default async function MailStarredPage(props: {
  params?: Promise<{ id?: string }>;
}) {
  const session = await auth();

  if (!session?.user?.email) {
    return redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return redirect("/signup");
  }

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
    orderBy: [{ createdDate: "desc" }, { mailHolderId: "desc" }],
  });

  const training = await prisma.training.findFirst({
    where: {
      memberId: user.memberId,
      trainingId: trainingId,
      status: { not: "FAIL" },
    },
    include: {
      mailHolders: {
        include: {
          mail: true,
        },
      },
      todoHolders: {
        include: {
          todo: true,
        },
      },
    },
  });

  if (!training) {
    return redirect("/404");
  }

  const articleData = dataGenerator(
    user,
    training?.data,
    training.mailHolders,
    training.todoHolders
  );

  return (
    <MailBox
      mailListData={mailListData}
      title="중요 메일함"
      articleData={articleData}
    />
  );
}
