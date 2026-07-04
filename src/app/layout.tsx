import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import Script from "next/script"; // Import the Next.js script optimizer
import "./globals.css";

const bodyFont = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-body" });
const displayFont = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = { 
  title: "Undercurrent", 
  description: "A premium self-reflection and therapy-tracking app for teens." 
};

export default function RootLayout({ 
  children 
}: Readonly<{ children: React.ReactNode }>) { 
  return ( 
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable} dark`}> 
      <body>
        {children}

        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <Script
          src="https://googletagmanager.com"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag()){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8RHRJJFP35');
          `}
        </Script>
      </body> 
    </html> 
  ); 
}
