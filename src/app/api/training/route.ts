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
    include: {
      dataFormats: true,
    },
  });

  if (!scenario) {
    return NextResponse.json({ error: "Scenario not found" }, { status: 404 });
  }

  if (
    !scenario.dataFormats.every((df) => Object.keys(data.data).includes(df.tag))
  ) {
    return NextResponse.json(
      { error: "Missing required data fields" },
      { status: 400 }
    );
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

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 훈련 생성
      const training = await tx.training.create({
        data: {
          scenarioId: data.scenarioId,
          memberId: user.memberId,
          data: data.data,
          limitDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 일주일 후
        },
      });

      // 해당 시나리오의 TODO 리스트 가져오기
      const todos = await tx.todo.findMany({
        where: {
          scenarioId: data.scenarioId,
        },
      });

      // TODO 등록
      await tx.todoHolder.createMany({
        data: todos.map((todo) => ({
          trainingId: training.trainingId,
          todoId: todo.todoId,
          uuid: crypto.randomUUID(),
        })),
      });

      // 해당 시나리오의 이메일 가져오기
      const mails = await tx.scenarioMail.findMany({
        where: {
          scenarioId: data.scenarioId,
        },
      });

      // 메일 등록
      await tx.mailHolder.createMany({
        data: mails.map((mail) => ({
          trainingId: training.trainingId,
          mailId: mail.mailId,
          uuid: crypto.randomUUID(),
          createdDate: new Date(
            Date.now() - (Math.floor(Math.random() * 10075) + 5) * 60 * 1000 //일주일 ~ 5분전 랜덤한 시간 빼기
          ),
        })),
      });

      return training;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Transaction failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
