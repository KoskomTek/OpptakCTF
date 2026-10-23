import type { Metadata, Viewport } from "next";
import { ctfConfig } from "@/config/ctf";
import "./globals.css";

export const metadata: Metadata = {
  title: "Koskom — Kontor- og Sosialkomiteen",
  description:
    "Kaffe, snacks og sosialt samvær for Abakus — under uforholdsmessig streng bevoktning.",
  icons: {
    icon: ctfConfig.koskomTekLogoPath,
    shortcut: ctfConfig.koskomTekLogoPath,
    apple: ctfConfig.koskomTekLogoPath,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f1eb",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nb">
      <body>{children}</body>
    </html>
  );
}
