"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { LayoutDashboard, MessageSquare, Bot, FileText, Settings, Shield, LogOut, Sparkles } from "lucide-react";

const nav = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Chat", href: "/chat/new", icon: MessageSquare },
  { name: "Agen", href: "/agents", icon: Bot },
  { name: "Dokumen", href: "/documents", icon: FileText },
  { name: "Pengaturan", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = (session?.user as any)?.role;
  const isAdmin = role === "SUPER_ADMIN" || role === "ADMIN";

  return (
    <aside className="hidden md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 border-r border-border bg-card">
      <div className="flex h-16 items-center gap-2 px-5 border-b border-border">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Sparkles size={16} />
        </div>
        <span className="font-semibold tracking-tight">Slider AI</span>
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href.split("/").slice(0, 2).join("/")));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors " +
                (active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground")
              }
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
        {isAdmin && (
          <Link
            href="/admin"
            className={
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors " +
              (pathname.startsWith("/admin")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground")
            }
          >
            <Shield size={18} />
            Admin
          </Link>
        )}
      </nav>
      <div className="border-t border-border p-3">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <LogOut size={18} />
          Keluar
        </button>
      </div>
    </aside>
  );
}