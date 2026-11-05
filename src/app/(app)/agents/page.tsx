export default function AgentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Agen</h2>
        <p className="text-sm text-muted-foreground">Buat dan kelola agen AI untuk tugas spesifik.</p>
      </div>
      <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
        <p className="font-medium">Belum ada agen</p>
        <p className="mt-1 text-sm text-muted-foreground">Data agen dimuat dari API. Tambahkan agen melalui fitur manajemen atau database.</p>
      </div>
    </div>
  );
}