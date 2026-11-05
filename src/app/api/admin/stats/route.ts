import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/database/client";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const [
    totalUsers,
    totalDocuments,
    totalConversations,
    totalMessages,
  ] = await Promise.all([
    db.user.count(),
    db.document.count(),
    db.conversation.count(),
    db.message.count(),
  ]);

  return NextResponse.json({
    totalUsers,
    totalDocuments,
    totalConversations,
    totalMessages,
  });
}
