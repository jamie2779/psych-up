import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Permission } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
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

  const fileList = await prisma.file.findMany({
    orderBy: {
      fileId: "asc",
    },
  });

  return NextResponse.json(fileList);
}
export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  });

  if (!user || user.permission !== Permission.admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  //FormData로 파일 받기
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });
  }

  //파일 사이즈 제한
  if (file.size > 1024 * 1024 * 50) {
    return NextResponse.json(
      { error: "파일 크기는 50MB 이하여야 합니다." },
      { status: 400 }
    );
  }

  //uuid 생성
  let i = 0;
  let download_uuid: string;
  while (true) {
    download_uuid = crypto.randomUUID();
    const existingFile = await prisma.file.findUnique({
      where: { uuid: download_uuid },
    });

    if (!existingFile) break;
    if (i++ > 3) {
      return NextResponse.json(
        { error: "Failed to generate unique UUID" },
        { status: 500 }
      );
    }
  }

  //Supabase 스토리지에 업로드
  const { data, error } = await supabaseAdmin.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
    .upload(download_uuid, file, { contentType: file.type });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  try {
    //Prisma DB에 파일 정보 저장
    const savedFile = await prisma.file.create({
      data: {
        uuid: download_uuid,
        name: file.name,
        size: file.size,
        path: data.path,
      },
    });

    return NextResponse.json(savedFile);
  } catch (error) {
    //실패 시 스토리지에서 파일 삭제
    await supabaseAdmin.storage
      .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
      .remove([data.path]);

    return NextResponse.json(
      { error: "Failed to save file to database", details: error },
      { status: 500 }
    );
  }
}
