import { redirect } from "next/navigation";

export default async function MailIDPage(props: {
  params?: Promise<{ id?: string }>;
}) {
  const params = await props.params;
  if (!params?.id) {
    return redirect("/404");
  }

  const trainingId = Number(params.id);

  if (Number.isNaN(trainingId)) {
    return redirect("/404");
  }

  return redirect(`/mail/${trainingId}/inbox`);
}
