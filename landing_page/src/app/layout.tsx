import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/sections/FinalCTA";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

export const metadata: Metadata = {
  title: "MailStride - The Smartest Way to Grow Your Newsletter",
  description: "Create, send, and track your emails with ease. Powerful analytics, automation, and growth tools—all in one platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${dmSans.variable} font-inter`}>
        <Navbar />
        <main>
          {children}
        </main>
        <FinalCTA />
        <Footer />
      </body>
    </html>
  );
}
