import AdminEditMail from "./page.client";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function AdminEditMailPage(props: {
  params?: Promise<{ id?: string }>;
}) {
  const params = await props.params;
  if (!params?.id) {
    return redirect("/404");
  }

  const mailId = Number(params.id);

  if (Number.isNaN(mailId)) {
    return redirect("/404");
  }

  try {
    const mail = await prisma.mail.findFirst({
      where: { mailId },
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

    if (!mail) {
      return redirect("/404");
    }

    return <AdminEditMail mail={mail} />;
  } catch (error) {
    console.error("Database error:", error);
    return redirect("/404");
  }
}
