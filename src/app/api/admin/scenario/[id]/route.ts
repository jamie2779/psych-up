import { auth } from "@/auth";
import { scenarioPutSchema } from "./schema";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Permission } from "@prisma/client";

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
    where: {
      email: session.user.email!,
    },
  });

  if (!user || user.permission !== Permission.admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const scenarioId = parseInt(params.id, 10);
  if (isNaN(scenarioId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    await prisma.scenario.delete({
      where: { scenarioId: scenarioId },
    });

    return NextResponse.json(
      { message: "Scenario deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete scenario" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const session = await auth();

  // 인증 확인
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  });

  // 관리자 권한 확인
  if (!user || user.permission !== Permission.admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const scenarioId = Number(params.id);
  if (Number.isNaN(scenarioId)) {
    return NextResponse.json({ error: "Invalid scenario ID" }, { status: 400 });
  }

  const body = await request.json();
  const parse = scenarioPutSchema.safeParse(body);

  // 입력값 검증 실패 시
  if (!parse.success) {
    return NextResponse.json({ error: parse.error }, { status: 400 });
  }

  const { data } = parse;

  try {
    // 기존 시나리오 확인
    const existingScenario = await prisma.scenario.findUnique({
      where: { scenarioId },
    });

    if (!existingScenario) {
      return NextResponse.json(
        { error: "Scenario not found" },
        { status: 404 }
      );
    }

    // 시나리오 업데이트
    const updatedScenario = await prisma.scenario.update({
      where: { scenarioId },
      data: {
        title: data.title,
        detail: data.detail,
        type: data.type,
        isPublic: data.isPublic,
      },
    });

    // 기존 TODO 삭제 후 새롭게 저장
    await prisma.todo.deleteMany({
      where: { scenarioId },
    });

    await Promise.all(
      data.todoList.map(async (todo) => {
        await prisma.todo.create({
          data: {
            tag: todo.tag,
            target: todo.target,
            scenarioId: updatedScenario.scenarioId,
          },
        });
      })
    );

    // 기존 정보 포멧 삭제 후 새롭게 저장
    await prisma.dataFormat.deleteMany({
      where: { scenarioId },
    });

    await Promise.all(
      data.dataFormatList.map(async (dataFormat) => {
        await prisma.dataFormat.create({
          data: {
            name: dataFormat.name,
            tag: dataFormat.tag,
            placeholder: dataFormat.placeholder,
            scenarioId: updatedScenario.scenarioId,
          },
        });
      })
    );

    // 기존 메일 연결 해제 후 새롭게 연결
    await prisma.scenarioMail.deleteMany({
      where: { scenarioId: scenarioId },
    });

    if (data.mailList.length > 0) {
      await prisma.scenarioMail.createMany({
        data: data.mailList.map((mailId) => ({
          scenarioId: scenarioId,
          mailId: mailId,
        })),
      });
    }

    // 기존 파일 연결 해제 후 새롭게 연결
    await prisma.scenarioFile.deleteMany({
      where: { scenarioId: scenarioId },
    });

    if (data.fileList.length > 0) {
      await prisma.scenarioFile.createMany({
        data: data.fileList.map((fileId) => ({
          scenarioId: scenarioId,
          fileId: fileId,
        })),
      });
    }

    const finalScenario = await prisma.scenario.findUnique({
      where: { scenarioId: scenarioId },
      include: {
        scenarioFiles: true,
      },
    });

    return NextResponse.json(finalScenario);
  } catch (error) {
    console.error("PUT /api/scenario/:id error:", error);
    return NextResponse.json(
      { error: "Failed to update scenario" },
      { status: 500 }
    );
  }
}
