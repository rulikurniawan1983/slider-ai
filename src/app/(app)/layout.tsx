import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />
      <div className="md:pl-60 flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}