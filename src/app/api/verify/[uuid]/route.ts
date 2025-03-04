import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Mail, MailHolder, TodoHolder, Training } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  props: { params: Promise<{ uuid: string }> }
) {
  const params = await props.params;
  const session = await auth();

  const finishHandler = async (
    todoHolder: TodoHolder & {
      training: Training & { todoHolders: TodoHolder[] } & {
        mailHolders: (MailHolder & { mail: Mail })[];
      };
    }
  ) => {
    if (todoHolder.training.todoHolders.every((holder) => holder.isCompleted)) {
      const training = todoHolder.training;
      const fishingCount = training.mailHolders.reduce((acc, holder) => {
        return acc + (holder.mail.isFishing ? 1 : 0);
      }, 0);

      const fooledCount = training.mailHolders.reduce((acc, holder) => {
        return (
          acc +
          (holder.mail.isFishing && (holder.isFooled || holder.isDownloaded)
            ? 1
            : 0)
        );
      }, 0);

      const fooledRate = (fishingCount - fooledCount) / fishingCount;

      const score = Math.round(
        fooledRate *
          10 *
          (training.todoHolders.length + training.mailHolders.length)
      );

      await prisma.training.update({
        where: {
          trainingId: todoHolder.training.trainingId,
        },
        data: {
          status: "COMPLETE",
          score: score,
          fishingCount: fishingCount,
          fooledCount: fooledCount,
          completedDate: new Date(),
        },
      });
      return true;
    } else {
      return false;
    }
  };

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
      training: {
        include: {
          todoHolders: true,
          mailHolders: {
            include: {
              mail: true,
            },
          },
        },
      },
    },
  });

  if (
    todoHolder &&
    todoHolder.training.memberId === user.memberId &&
    todoHolder.training.status !== "ACTIVE"
  ) {
    return new NextResponse(
      `<script>alert("종료된 훈련입니다."); window.close();</script>`,
      { headers: { "Content-Type": "text/html; charset=UTF-8" } }
    );
  }

  if (
    todoHolder &&
    todoHolder.training.memberId === user.memberId &&
    todoHolder.isCompleted
  ) {
    if (await finishHandler(todoHolder)) {
      return new NextResponse(
        `<script>alert("마지막 Todo를 완료했습니다. 훈련을 종료합니다"); window.close();</script>`,
        { headers: { "Content-Type": "text/html; charset=UTF-8" } }
      );
    }

    return new NextResponse(
      `<script>alert("이미 확인된 요청입니다."); window.close();</script>`,
      { headers: { "Content-Type": "text/html; charset=UTF-8" } }
    );
  }

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

    const todoHolder = await prisma.todoHolder.findUnique({
      where: {
        uuid: params.uuid,
      },
      include: {
        training: {
          include: {
            todoHolders: true,
            mailHolders: {
              include: {
                mail: true,
              },
            },
          },
        },
      },
    });

    if (todoHolder && (await finishHandler(todoHolder))) {
      return new NextResponse(
        `<script>alert("마지막 Todo를 완료했습니다. 훈련을 종료합니다"); window.close();</script>`,
        { headers: { "Content-Type": "text/html; charset=UTF-8" } }
      );
    }

    return new NextResponse(
      `<script>alert("확인되었습니다."); window.close();</script>`,
      { headers: { "Content-Type": "text/html; charset=UTF-8" } }
    );
  }

  const mailHolder = await prisma.mailHolder.findUnique({
    where: {
      uuid: params.uuid,
    },
    include: {
      training: true,
    },
  });

  if (
    mailHolder &&
    mailHolder.training.memberId === user.memberId &&
    mailHolder.training.status !== "ACTIVE"
  ) {
    return new NextResponse(
      `<script>alert("종료된 훈련입니다."); window.close();</script>`,
      { headers: { "Content-Type": "text/html; charset=UTF-8" } }
    );
  }

  if (
    mailHolder &&
    mailHolder.training.memberId === user.memberId &&
    mailHolder.isFooled
  ) {
    return new NextResponse(
      `<script>alert("이미 확인된 요청입니다."); window.close();</script>`,
      { headers: { "Content-Type": "text/html; charset=UTF-8" } }
    );
  }

  if (mailHolder && mailHolder.training.memberId === user.memberId) {
    await prisma.mailHolder.update({
      where: {
        uuid: params.uuid,
      },
      data: {
        isFooled: true,
      },
    });
    return new NextResponse(
      `<script>alert("확인되었습니다."); window.close();</script>`,
      { headers: { "Content-Type": "text/html; charset=UTF-8" } }
    );
  }

  return NextResponse.json({ error: "target not found" }, { status: 404 });
}
