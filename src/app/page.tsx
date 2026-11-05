"use client";

import Link from "next/link";
import { ArrowRight, Bot, Sparkles, FileText, Shield, Users } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            AI Workspace
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Workspace Cerdas<span className="text-primary"> untuk Tim Anda</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Platform AI Workspace modern yang menggabungkan AI Assistant, AI Agent, Knowledge Base,
            dan Workflow Automation dalam satu platform terintegrasi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register" className="flex-1 sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors">
              Mulai Gratis
            </Link>
            <Link href="/auth/signin" className="flex-1 sm:w-auto px-8 py-4 rounded-xl font-semibold border border-input bg-background hover:bg-secondary transition-colors">
              Masuk
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Fitur Unggulan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Semua yang Anda butuhkan untuk bekerja lebih cepat dengan AI</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[{
              icon: Bot,
              title: "AI Chat",
              desc: "Percakapan AI dengan streaming, markdown, dan code highlighting."
            }, {
              icon: Sparkles,
              title: "AI Agents",
              desc: "Multi-agent system dengan tool access dan prompt kustom."
            }, {
              icon: FileText,
              title: "Knowledge Base",
              desc: "Upload dokumen, ekstraksi, dan vektor pencarian dengan RAG."
            }].map((feature, i) => (
              <div key={i} className="p-6 rounded-xl border border-border bg-card hover:bg-secondary/50 transition-colors">
                <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto rounded-2xl bg-primary p-12 text-primary-foreground text-center">
          <h2 className="text-3xl font-bold mb-4">Siap mengubah cara Anda bekerja?</h2>
          <p className="text-primary-foreground/90 mb-8">Gabungkan ribuan pengguna Slider AI hari ini.</p>
          <Link href="/auth/register" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary-foreground text-primary font-semibold hover:bg-primary-foreground/90 transition-colors">
            Mulai Sekarang <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
