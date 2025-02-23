import { mailPostSchema } from "./schema";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Permission } from "@prisma/client";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let user = await prisma.user.findUnique({
    where: {
      email: session.user.email!,
    },
  });

  if (!user || user.permission !== Permission.admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const mailList = await prisma.mail.findMany({
    orderBy: {
      mailId: "asc",
    },
  });

  return NextResponse.json(mailList);
}

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let user = await prisma.user.findUnique({
    where: {
      email: session.user.email!,
    },
  });

  if (!user || user.permission !== Permission.admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const parse = mailPostSchema.safeParse(body);

  if (!parse.success) {
    return NextResponse.json({ error: parse.error }, { status: 400 });
  }

  const { data } = parse;

  const mail = await prisma.mail.create({
    data: {
      sender: data.sender,
      from: data.from,
      title: data.title,
      article: data.article,
      isFishing: data.isFishing,
      fishingDetail: data.fishingDetail,
      mailFiles: {
        create: data.fileList.map((fileId) => ({
          file: { connect: { fileId } },
        })),
      },
    },
    include: {
      mailFiles: true,
    },
  });
  return NextResponse.json(mail);
}
