import Link from "next/link";
import { MessageSquare, Bot, FileText, Plus } from "lucide-react";

const cards = [
  { href: "/chat/new", icon: MessageSquare, title: "Mulai Chat", desc: "Percakapan baru dengan asisten AI.", cta: "Buka chat" },
  { href: "/agents", icon: Bot, title: "Agen", desc: "Kelola dan gunakan agen AI.", cta: "Lihat agen" },
  { href: "/documents", icon: FileText, title: "Dokumen", desc: "Knowledge base dan file Anda.", cta: "Lihat dokumen" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
          <p className="text-sm text-muted-foreground">Ringkasan workspace Anda.</p>
        </div>
        <Link href="/chat/new" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus size={16} /> Chat baru
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="group rounded-xl border border-border bg-card p-5 transition hover:border-primary/40 hover:shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <c.icon size={20} />
            </div>
            <h3 className="font-semibold">{c.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
            <span className="mt-4 inline-block text-sm font-medium text-primary">{c.cta} →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}