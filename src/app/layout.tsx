import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers/session-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Slider AI",
  description: "AI workspace — chat, agen, knowledge base, dan dokumen.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}