import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// WICHTIG: Import der Navbar
import Navbar from "@/components/layout/Navbar"; 

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "QUITTUNG",
  description: "Politische Transparenz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={inter.className}>
        {/* WICHTIG: Hier wird die Leiste eingefügt */}
        <Navbar /> 
        {children}
      </body>
    </html>
  );
}