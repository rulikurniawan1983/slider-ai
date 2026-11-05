export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Pengaturan</h2>
        <p className="text-sm text-muted-foreground">Preferensi akun dan workspace.</p>
      </div>
      <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
        Pengaturan tambahan dapat dikonfigurasi di sini.
      </div>
    </div>
  );
}