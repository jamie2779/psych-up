import TrainingDetail from "./page.client";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function TrainingDetailPage(props: {
  params?: Promise<{ id?: string }>;
}) {
  const params = await props.params;
 if (!params?.id) {
    return redirect("/404");
  }

  const scenarioId = Number(params.id);

  if (Number.isNaN(scenarioId)) {
    return redirect("/404");
  }

  const parsedId = parseInt(params.id);
  if (isNaN(parsedId)) {
    return null;
  }
  const scenario = await prisma.scenario.findUnique({
    where: { scenarioId: scenarioId },
    include: {
      todos: true,
      scenarioFiles: {
        include: {
          file: true,
        },
      }
    },
  });

  if (!scenario) {
    return redirect("/404");
  }
  
  return <TrainingDetail scenario = {scenario} />;
}
