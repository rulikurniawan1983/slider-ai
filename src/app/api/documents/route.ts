import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { storageService } from "@/lib/storage/service";
import { db } from "@/lib/database/client";
import { ragService } from "@/lib/rag/service";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const workspaceId = formData.get("workspaceId") as string;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const key = `documents/${session.user.id}/${Date.now()}-${file.name}`;

  const upload = await storageService.uploadFile(key, buffer, file.type);

  const document = await db.document.create({
    data: {
      title: file.name,
      filename: key,
      originalName: file.name,
      filePath: upload.key,
      fileUrl: upload.url,
      mimeType: file.type,
      fileSize: BigInt(buffer.length),
      workspaceId,
      userId: session.user.id,
    },
  });

  // Process document asynchronously
  ragService.processDocument(document.id).catch(console.error);

  return NextResponse.json(document, { status: 201 });
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const workspaceId = searchParams.get("workspaceId");
  const search = searchParams.get("search");

  const documents = await db.document.findMany({
    where: {
      userId: session.user.id,
      workspaceId: workspaceId || undefined,
      ...(search ? { title: { contains: search, mode: "insensitive" } } : {}),
    },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(documents);
}
