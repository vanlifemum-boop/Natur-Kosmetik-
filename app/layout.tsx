import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Natürlich gerührt – Vegane Naturkosmetik",
  description:
    "Vegane Naturkosmetik selbst machen: verständliche Rezeptideen, Rohstoffwissen und klare Sicherheitshinweise.",
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
