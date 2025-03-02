import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  props: { params: Promise<{ uuid: string }> }
) {
  const params = await props.params;
  const session = await auth();
  console.log(params.uuid);

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

  const todoHolder = await prisma.todoHolder.findUnique({
    where: {
      uuid: params.uuid,
    },
    include: {
      training: true,
    },
  });

  if (todoHolder && todoHolder.training.memberId === user.memberId) {
    await prisma.todoHolder.update({
      where: {
        uuid: params.uuid,
      },
      data: {
        isCompleted: true,
        completedDate: new Date(),
      },
    });
    return NextResponse.json({ success: true });
  }

  const mailHolder = await prisma.mailHolder.findUnique({
    where: {
      uuid: params.uuid,
    },
    include: {
      training: true,
    },
  });

  if (mailHolder && mailHolder.training.memberId === user.memberId) {
    await prisma.mailHolder.update({
      where: {
        uuid: params.uuid,
      },
      data: {
        isFooled: true,
      },
    });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "target not found" }, { status: 404 });
}
