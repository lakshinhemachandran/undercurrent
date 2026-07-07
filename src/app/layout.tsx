/* 
 * Copyright © 2026 Lakshin Hemachandran. All Rights Reserved.
 * This file is part of the "Undercurrent" project.
 * Unauthorized copying, modification, or redistribution of this file 
 * via any me dium is strictly prohibited. Restructured under the terms 
 * of the proprietary LICENSE file located in the root repository.
 */


import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { Providers } from "./providers";
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
      <body className="antialiased">
        <Providers>{children}</Providers>

        {/* Google Analytics (gtag.js) */}
        <Script src="https://googletagmanager.com" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8RHRJJFP35');
          `}
        </Script>

        {/* Umami Analytics */}
        <Script src="https://umami.is" data-website-id="d854d6b1-e098-434d-b1c1-b7fe9c02f1fe" strategy="afterInteractive" />
        {/* Simple Analytics */}
        <Script src="https://scripts.simpleanalyticscdn.com/latest.js"  />
      </body>
    </html>
  );
}
