import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { generateChatResponse } from "@/lib/ai/chat";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { message, conversationId, agentId, model, temperature } = body;

  if (!message || !conversationId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const result = await generateChatResponse({
    message,
    conversationId,
    agentId,
    model,
    temperature,
    userId: session.user.id,
  });

  return NextResponse.json(result);
}
