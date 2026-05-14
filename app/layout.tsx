import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ruflo + Next.js",
  description: "Production-ready Next.js 14 app scaffolded with Ruflo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}
