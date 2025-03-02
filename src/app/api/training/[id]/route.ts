import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { TrainingStatus } from "@prisma/client";

export async function DELETE(
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

  const trainingId = parseInt(params.id, 10);
  if (isNaN(trainingId)) {
    return NextResponse.json({ error: "Invalid training ID" }, { status: 400 });
  }

  try {
    const training = await prisma.training.update({
      where: { trainingId, memberId: user.memberId },
      data: { status: TrainingStatus.FAIL },
    });
    return NextResponse.json(training);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to give up training" },
      { status: 500 }
    );
  }
}
