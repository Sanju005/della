import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DELLA App",
  description:
    "DELLA services platform for customers, providers, and internal operations teams.",
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
