import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { agentService } from "@/lib/agents/service";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const workspaceId = searchParams.get("workspaceId");
  const agents = await agentService.list(workspaceId || undefined);
  return NextResponse.json(agents);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const agent = await agentService.create({
    ...body,
    userId: session.user.id,
  });

  return NextResponse.json(agent, { status: 201 });
}
