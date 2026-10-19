import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Natürlich gerührt – Rezeptbibliothek",
  description:
    "Naturkosmetik-Rezeptbibliothek mit 267 Einträgen für Gesicht, Haare, Körper, Lippen und Hände. Mit Suche, Zutatennotizen, Basisrezepten und Originalquellen.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
