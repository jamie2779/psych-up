import AdminEditScenario from "./page.client";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function AdminEditScenarioPage(props: {
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

  try {
    const scenario = await prisma.scenario.findFirst({
      where: { scenarioId },
      include: {
        todos: true,
        scenarioFiles: {
          include: {
            file: true,
          },
        },
        scenarioMails: {
          include: {
            mail: true,
          },
        },
      },
    });

    if (!scenario) {
      return redirect("/404");
    }

    return <AdminEditScenario scenario={scenario} />;
  } catch (error) {
    console.error("Database error:", error);
    return redirect("/404");
  }
}
