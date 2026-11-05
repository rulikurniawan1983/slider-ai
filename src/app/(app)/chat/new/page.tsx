"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewChatPage() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title || "Percakapan Baru" }),
      });
      const data = await res.json();
      if (data?.id) router.push(`/chat/${data.id}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg">
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold">Percakapan Baru</h2>
        <p className="mt-1 text-sm text-muted-foreground">Mulai chat baru di workspace.</p>
        <form onSubmit={handleCreate} className="mt-5 space-y-4">
          <div>
            <label className="text-sm font-medium">Judul (opsional)</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
              placeholder="Percakapan Baru"
            />
          </div>
          <button type="submit" disabled={loading} className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
            {loading ? "Membuat..." : "Buat percakapan"}
          </button>
        </form>
      </div>
    </div>
  );
}