"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Sun, Moon, Settings, Bell } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 h-16 border-b border-background bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground">
            <span className="sr-only">Open sidebar</span>
            <div className="w-6 h-0.5 bg-current rounded-sm" />
            <div className="w-6 h-0.5 bg-current rounded-sm mt-1.5" />
            <div className="w-6 h-0.5 bg-current rounded-sm mt-1.5" />
          </button>
          <span className="hidden md:block text-sm font-medium text-muted-foreground">
            {pathname.split("/")[1] || "Dashboard"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground">
            <Bell size={20} />
            <span className="sr-only">Notifications</span>
          </button>
          <button className="p-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground">
            <Sun size={20} className="hidden" />
            <Moon size={20} className="block" />
            <span className="sr-only">Toggle theme</span>
          </button>
          <div className="flex items-center gap-2 pl-4 border-l border-border">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-xs font-medium text-primary-foreground">
              {(session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0) || "U").toUpperCase()}
            </div>
            <div className="hidden md:flex flex-col">
              <p className="text-sm font-medium text-foreground">{session?.user?.name || "Pengguna"}</p>
              <p className="text-xs text-muted-foreground">
              {(session as any)?.user?.role || "User"}
            </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
