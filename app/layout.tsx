import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNavigation from "@/components/bottom-navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stay Strong",
  description: "Track your workouts and stay updated with fitness news",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground`}>
        <main className="min-h-screen pb-16">{children}</main>
        <BottomNavigation />
      </body>
    </html>
  );
}

import "./globals.css";
