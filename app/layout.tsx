import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 使用 Next.js 14 经典的 Inter 字体
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DeepSeek AI",
  description: "AI Chat Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}