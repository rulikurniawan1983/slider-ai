"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, LayoutDashboard, MessageSquare, Bot, FileText, Settings, ShieldAlert, LogOut, Home } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Chat", href: "/chat/new", icon: MessageSquare },
  { name: "Agents", href: "/agents", icon: Bot },
  { name: "Documents", href: "/documents", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const isAdmin =
    (session as any)?.user?.role === "SUPER_ADMIN" ||
    (session as any)?.user?.role === "ADMIN";

  const handleLogout = () => {
    router.push("/auth/signin");
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-background border-r border-border">
      <div className="flex items-center justify-between h-16 px-4">
        <Link href="/dashboard">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
              S
            </div>
            <span className="font-semibold text-lg tracking-tight">Slider AI</span>
          </div>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={React.useMemo(
                () =>
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors" +
                  (isActive
                    ? " bg-primary text-primary-foreground"
                    : " text-muted-foreground hover:bg-accent hover:text-accent-foreground"),
                [isActive]
              )}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
        {isAdmin && (
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <ShieldAlert size={18} />
            Admin Panel
          </Link>
        )}
      </nav>
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:bg-accent rounded-md cursor-pointer transition-colors" onClick={handleLogout}>
          <LogOut size={18} />
          Keluar
        </div>
      </div>
    </aside>
  );
}
