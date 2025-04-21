import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

import React from "react";

import { Toaster } from "src/components/ui/sonner";
import Providers from "src/providers/queryClientProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AI interview",
  description: "AI interview app",
  icons: {
    icon: "/logo.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster
          toastOptions={{
            classNames: {
              error: "text-red-600 bg-white border-none",
              success: "text-green-400 bg-white border-none",
              warning: "text-yellow-400 bg-white border-none",
              info: "text-blue-400 bg-white border-none",
            },
          }}
        />
      </body>
    </html>
  );
}
