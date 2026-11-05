import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { createConversation } from "@/lib/ai/chat";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, agentId, workspaceId } = body;

  const conversation = await createConversation({
    userId: session.user.id,
    title,
    agentId,
    workspaceId,
  });

  return NextResponse.json(conversation);
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const workspaceId = searchParams.get("workspaceId");
  const isArchived = searchParams.get("isArchived") === "true";

  const conversations = await db.conversation.findMany({
    where: {
      userId: session.user.id,
      workspaceId: workspaceId || undefined,
      isArchived,
    },
    include: { messages: { take: 1, orderBy: { createdAt: "desc" } }, agent: true },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(conversations);
}

import { db } from "@/lib/database/client";
