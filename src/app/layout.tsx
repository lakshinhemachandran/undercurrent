import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const bodyFont = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-body" });
const displayFont = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Undercurrent",
  description: "A premium self-reflection and therapy-tracking app for teens."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable} dark`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
