import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { memoryService } from "@/lib/memory/service";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const workspaceId = searchParams.get("workspaceId");

  const memories = await memoryService.search({
    userId: session.user.id,
    query: query || undefined,
    workspaceId: workspaceId || undefined,
    limit: 10,
  });

  return NextResponse.json(memories);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const memory = await memoryService.create({
    userId: session.user.id,
    ...body,
  });

  return NextResponse.json(memory, { status: 201 });
}
