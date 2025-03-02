import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  });

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const mailHolderId = parseInt(params.id, 10);
  if (isNaN(mailHolderId)) {
    return NextResponse.json({ error: "Invalid file ID" }, { status: 400 });
  }

  const mailHolder = await prisma.mailHolder.findUnique({
    where: { mailHolderId: mailHolderId },
    include: { training: true },
  });

  if (!mailHolder || mailHolder.training.memberId !== user.memberId) {
    return NextResponse.json({ error: "Mail not found" }, { status: 404 });
  }

  try {
    await prisma.mailHolder.update({
      where: { mailHolderId: mailHolderId },
      data: { isDownloaded: true },
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to update mail" },
      { status: 500 }
    );
  }
}
