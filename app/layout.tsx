import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Washington Address Map",
  description: "Reads a Washington address from a file and renders it on a map.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
