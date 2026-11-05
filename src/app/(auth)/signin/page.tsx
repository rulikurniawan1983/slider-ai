"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles } from "lucide-react";

const schema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setError(null);
    setLoading(true);
    const result = await signIn("credentials", { email: data.email, password: data.password, redirect: false });
    setLoading(false);
    if (result?.error) { setError("Email atau password salah."); return; }
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center justify-center gap-2 font-semibold">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground"><Sparkles size={18} /></div>
          Slider AI
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h1 className="text-xl font-semibold">Masuk</h1>
          <p className="mt-1 text-sm text-muted-foreground">Gunakan akun workspace Anda.</p>
          {error && <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</div>}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
            <div>
              <label className="text-sm font-medium" htmlFor="email">Email</label>
              <input {...register("email")} id="email" type="email" autoComplete="email" className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2" placeholder="nama@contoh.com" />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="password">Kata sandi</label>
              <input {...register("password")} id="password" type="password" autoComplete="current-password" className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2" />
              {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>}
            </div>
            <button type="submit" disabled={loading} className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground"><Link href="/" className="hover:text-foreground">← Kembali</Link></p>
      </div>
    </div>
  );
}