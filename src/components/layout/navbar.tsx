"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/chat": "Chat",
  "/agents": "Agen",
  "/documents": "Dokumen",
  "/settings": "Pengaturan",
  "/admin": "Admin",
};

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const title = Object.entries(titles).find(([k]) => pathname.startsWith(k))?.[1] ?? "Slider AI";
  const name = session?.user?.name || session?.user?.email || "Pengguna";
  const initial = (name[0] || "U").toUpperCase();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur">
      <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium leading-none">{name}</p>
          <p className="text-xs text-muted-foreground mt-1">{(session?.user as any)?.role || "User"}</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {initial}
        </div>
      </div>
    </header>
  );
}