import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(
  _request: NextRequest,
  { params }: { params: { uuid: string } }
) {
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

  const file = await prisma.file.findUnique({ where: { uuid: params.uuid } });

  if (!file) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  // ✅ Supabase에서 파일 다운로드 URL 가져오기
  const { data, error } = await supabaseAdmin.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
    .createSignedUrl(file.path, 60); // 60초 유효한 URL

  if (error) {
    return NextResponse.json(
      { error: "Failed to generate download link" },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: data.signedUrl });
}
