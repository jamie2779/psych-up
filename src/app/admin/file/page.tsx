import AdminFile from "./page.client";
import prisma from "@/lib/prisma";

export default async function AdminFilePage() {
  const fileList = await prisma.file.findMany({
    include: {
      scenarioFiles: true,
      mailFiles: true,
    },
    orderBy: {
      fileId: "asc",
    },
  });
  return <AdminFile fileList={fileList} />;
}
