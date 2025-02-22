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

  //파일 중복이름 제거
  let fileCount = 1;
  const originalName = file.name;
  const lastDotIndex = originalName.lastIndexOf(".");
  const baseName =
    lastDotIndex !== -1
      ? originalName.substring(0, lastDotIndex)
      : originalName;
  const extension =
    lastDotIndex !== -1 ? originalName.substring(lastDotIndex) : "";

  let fileName = originalName;

  while (true) {
    const existingFile = await prisma.file.findUnique({
      where: { name: fileName },
    });
    if (!existingFile) break;
    fileName = `${baseName}(${fileCount++})${extension}`;
  }

  //Supabase 스토리지에 업로드
  const { data, error } = await supabaseAdmin.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
    .upload(fileName, file, { contentType: file.type });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  //Prisma DB에 파일 정보 저장
  const savedFile = await prisma.file.create({
    data: {
      uuid: download_uuid,
      name: fileName,
      size: file.size,
      path: data.path,
    },
  });

  return NextResponse.json(savedFile);
}
