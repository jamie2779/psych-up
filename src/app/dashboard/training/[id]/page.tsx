import { auth } from "@/auth";
import TrainingDetail from "./page.client";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function TrainingDetailPage(props: {
  params?: Promise<{ id?: string }>;
}) {
  const session = await auth();

  if (!session?.user?.email) {
    return redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return redirect("/signup");
  }

  const params = await props.params;
  if (!params?.id) {
    return redirect("/404");
  }

  //시나리오 찾기
  const scenarioId = Number(params.id);

  if (Number.isNaN(scenarioId)) {
    return redirect("/404");
  }

  const scenario = await prisma.scenario.findUnique({
    where: { scenarioId: scenarioId },
    include: {
      todos: true,
      scenarioFiles: {
        include: {
          file: true,
        },
      },
    },
  });

  if (!scenario) {
    return redirect("/404");
  }

  //이미 진행중인 훈련인지 확인
  const training = await prisma.training.findFirst({
    where: {
      memberId: user.memberId,
      scenarioId: scenarioId,
      status: {
        not: "FAIL",
      },
    },
  });

  if (training) {
    const todos = await prisma.todoHolder.findMany({
      where: {
        trainingId: training.trainingId,
      },
      include: {
        todo: true,
      },
    });

    if (training.status === "COMPLETE") {
      const fishingList = await prisma.scenarioMail.findMany({
        where: {
          scenarioId: scenarioId,
        },
        include: {
          mail: {
            include: {
              mailFiles: {
                include: {
                  file: true,
                },
              },
            },
          },
        },
      });

      return (
        <TrainingDetail
          scenario={scenario}
          trainingStatus={training.status}
          isFailed={false}
          todoList={todos}
          fishingList={fishingList.map((fishing) => fishing.mail)}
        />
      );
    } else {
      return (
        <TrainingDetail
          scenario={scenario}
          trainingStatus={training.status}
          isFailed={false}
          todoList={todos}
        />
      );
    }
  } else {
    //이전에 실패 한 훈련인지 확인
    const failedTraining = await prisma.training.findFirst({
      where: {
        memberId: user.memberId,
        scenarioId: scenarioId,
        status: "FAIL",
      },
    });

    return (
      <TrainingDetail
        scenario={scenario}
        isFailed={failedTraining ? true : false}
      />
    );
  }
}
