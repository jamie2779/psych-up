import { mailboxPostSchema } from "./schema";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { MailBox } from "@prisma/client";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email!,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parse = mailboxPostSchema.safeParse(body);

  if (!parse.success) {
    return NextResponse.json({ error: parse.error }, { status: 400 });
  }

  const { data } = parse;

  const mailHolder = await prisma.mailHolder.findUnique({
    where: {
      mailHolderId: data.mailHolderId,
    },
    include: {
      training: true,
    },
  });

  if (!mailHolder || mailHolder.training.memberId !== user.memberId) {
    return NextResponse.json({ error: "Mail not found" }, { status: 404 });
  }

  if (!Object.values(MailBox).includes(data.mailBox as MailBox)) {
    return NextResponse.json({ error: "Invalid mailBox" }, { status: 400 });
  }

  await prisma.mailHolder.update({
    where: { mailHolderId: data.mailHolderId },
    data: { mailBox: data.mailBox as MailBox },
  });

  return NextResponse.json({ success: true });
}
