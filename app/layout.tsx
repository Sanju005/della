import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DELLA Admin Panel",
  description: "Operational admin panel starter for the DELLA App team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
