export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Admin</h2>
        <p className="text-sm text-muted-foreground">Panel administrasi (memerlukan peran admin).</p>
      </div>
      <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
        Statistik dan pengelolaan dimuat dari <code className="rounded bg-muted px-1 py-0.5 text-foreground">/api/admin/stats</code>. Pastikan akun memiliki peran <code className="rounded bg-muted px-1 py-0.5 text-foreground">ADMIN</code>/<code className="rounded bg-muted px-1 py-0.5 text-foreground">SUPER_ADMIN</code>.
      </div>
    </div>
  );
}