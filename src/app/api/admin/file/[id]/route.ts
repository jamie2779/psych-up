import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Permission } from "@prisma/client";
import { supabaseAdmin } from "@/lib/supabase";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  });

  if (!user || user.permission !== Permission.admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const fileId = parseInt(params.id, 10);
  if (isNaN(fileId)) {
    return NextResponse.json({ error: "Invalid file ID" }, { status: 400 });
  }

  try {
    const file = await prisma.file.findUnique({
      where: { fileId },
    });

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    //Supabase에서 파일 삭제
    const filePath = file.path.split(
      `/${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/`
    )[1];
    const { error: supabaseError } = await supabaseAdmin.storage
      .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
      .remove([filePath]);

    if (supabaseError) {
      return NextResponse.json(
        {
          error: "Failed to delete file from storage",
          details: supabaseError.message,
        },
        { status: 500 }
      );
    }

    //DB에서 파일 삭제
    await prisma.file.delete({ where: { fileId } });

    return NextResponse.json(
      { message: "File deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete file", details: error },
      { status: 500 }
    );
  }
}
