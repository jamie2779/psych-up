import AdminMail from "./page.client";
import prisma from "@/lib/prisma";

export default async function AdminMailPage() {
  const mailList = await prisma.mail.findMany({
    include: {
      scenarioMails: true,
      mailFiles: {
        include: {
          file: true,
        },
      },
    },
    orderBy: {
      mailId: "asc",
    },
  });
  return <AdminMail mailList={mailList} />;
}
