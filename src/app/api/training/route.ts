import { trainingPostSchema } from "./schema";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { TrainingStatus } from "@prisma/client";

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

  const parse = trainingPostSchema.safeParse(body);

  if (!parse.success) {
    return NextResponse.json({ error: parse.error }, { status: 400 });
  }

  const { data } = parse;

  const scenario = await prisma.scenario.findUnique({
    where: {
      scenarioId: data.scenarioId,
      isPublic: true,
    },
  });

  if (!scenario) {
    return NextResponse.json({ error: "Scenario not found" }, { status: 404 });
  }

  const curTraining = await prisma.training.findFirst({
    where: {
      memberId: user.memberId,
      scenarioId: data.scenarioId,
      status: TrainingStatus.ACTIVE,
    },
  });

  if (curTraining) {
    return NextResponse.json(
      { error: "Training already exists" },
      { status: 400 }
    );
  }

  const training = await prisma.training.create({
    data: {
      scenarioId: data.scenarioId,
      memberId: user.memberId,
      limitDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 일주일 후
    },
  });

  return NextResponse.json(training);
}
