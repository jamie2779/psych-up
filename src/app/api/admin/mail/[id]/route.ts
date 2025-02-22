import { auth } from "@/auth";
import { mailPutSchema } from "./schema";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Permission } from "@prisma/client";

export async function DELETE(_request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email!,
    },
  });

  if (!user || user.permission !== Permission.admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const mailId = parseInt(params.id, 10);
  if (isNaN(mailId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    await prisma.mail.delete({
      where: { mailId: mailId },
    });

    return NextResponse.json(
      { message: "Mail deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete mail" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  });

  if (!user || user.permission !== Permission.admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const mailId = Number(params.id);
  if (Number.isNaN(mailId)) {
    return NextResponse.json({ error: "Invalid mail ID" }, { status: 400 });
  }

  const body = await request.json();
  const parse = mailPutSchema.safeParse(body);

  if (!parse.success) {
    return NextResponse.json({ error: parse.error }, { status: 400 });
  }

  const { data } = parse;

  try {
    const existingMail = await prisma.mail.findUnique({
      where: { mailId: mailId },
      include: {
        mailFiles: true,
      },
    });

    if (!existingMail) {
      return NextResponse.json({ error: "Mail not found" }, { status: 404 });
    }

    await prisma.mail.update({
      where: { mailId: mailId },
      data: {
        sender: data.sender,
        from: data.from,
        title: data.title,
        article: data.article,
        isFishing: data.isFishing,
        fishingDetail: data.isFishing ? data.fishingDetail : null,
      },
    });

    await prisma.mailFile.deleteMany({
      where: { mailId: mailId },
    });

    if (data.fileList.length > 0) {
      await prisma.mailFile.createMany({
        data: data.fileList.map((fileId) => ({
          mailId: mailId,
          fileId: fileId,
        })),
      });
    }

    const finalMail = await prisma.mail.findUnique({
      where: { mailId: mailId },
      include: {
        mailFiles: true,
      },
    });

    return NextResponse.json(finalMail);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update mail" },
      { status: 500 }
    );
  }
}
