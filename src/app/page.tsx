import Link from "next/link";
import { MessageSquare, Bot, FileText, ArrowRight, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-2 font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles size={16} />
          </div>
          Slider AI
        </div>
        <nav className="flex items-center gap-3">
          <Link href="/signin" className="text-sm font-medium text-muted-foreground hover:text-foreground">Masuk</Link>
          <Link href="/signin" className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Mulai</Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-20 md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
            AI Workspace
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Satu ruang kerja untuk <span className="text-primary">chat, agen, dan knowledge</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Kelola percakapan AI, agen kustom, dokumen, dan basis pengetahuan dalam satu platform.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link href="/signin" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Buka Workspace <ArrowRight size={16} />
            </Link>
            <Link href="/dashboard" className="inline-flex items-center rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-accent">
              Dashboard
            </Link>
          </div>
        </div>

        <div className="mt-20 grid gap-4 sm:grid-cols-3">
          {[
            { icon: MessageSquare, title: "AI Chat", desc: "Percakapan dengan riwayat, konteks, dan rendering markdown." },
            { icon: Bot, title: "AI Agents", desc: "Agen dengan prompt dan konfigurasi sesuai kebutuhan." },
            { icon: FileText, title: "Knowledge Base", desc: "Unggah dokumen dan cari dengan RAG/vektor." },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-border bg-card p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <f.icon size={20} />
              </div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}