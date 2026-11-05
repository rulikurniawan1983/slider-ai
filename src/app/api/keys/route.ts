import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/database/client";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKeys = await db.apiKey.findMany({
    where: { userId: session.user.id },
    select: { id: true, name: true, prefix: true, scopes: true, lastUsed: true, isActive: true, createdAt: true },
  });

  return NextResponse.json(apiKeys);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, scopes } = body;

  const { encrypt } = await import("@/lib/utils/encryption");
  const rawKey = `sk_slider_${require("crypto").randomBytes(24).toString("hex")}`;
  const encryptedKey = encrypt(rawKey);

  const apiKey = await db.apiKey.create({
    data: {
      userId: session.user.id,
      name,
      key: encryptedKey,
      prefix: "sk_slider",
      scopes: scopes || ["read"],
    },
  });

  return NextResponse.json({ ...apiKey, key: rawKey }, { status: 201 });
}
