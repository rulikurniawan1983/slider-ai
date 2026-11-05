"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";

export default function NewChatPage() {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/conversations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title || "New Conversation" }),
    });
    const data = await res.json();
    router.push(`/chat/${data.id}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Percakapan Baru</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Judul Percakapan</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="New Conversation"
              />
            </div>
            <Button type="submit" className="w-full">
              Buat Percakapan
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
