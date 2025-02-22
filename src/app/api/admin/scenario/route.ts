import { scenarioPostSchema } from "./schema";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Permission } from "@prisma/client";

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

  const parse = scenarioPostSchema.safeParse(body);

  if (!parse.success) {
    return NextResponse.json({ error: parse.error }, { status: 400 });
  }

  const { data } = parse;

  const scenario = await prisma.scenario.create({
    data: {
      title: data.title,
      detail: data.detail,
      type: data.type,
      isPublic: data.isPublic,
      scenarioFiles: {
        create: data.fileList.map((fileId) => ({
          file: { connect: { fileId } },
        })),
      },
    },
  });

  await Promise.all(
    data.todoList.map(async (todo) => {
      await prisma.todo.create({
        data: {
          target: todo,
          scenarioId: scenario.scenarioId,
        },
      });
    })
  );
  return NextResponse.json(scenario);
}
