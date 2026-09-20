import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "KisanMitra — Smarter Decisions. Healthier Farms.",
  description:
    "AI-powered agricultural decision-support platform for Indian farmers. Unified crop health, soil insights, weather intelligence, mandi prices, and government schemes.",
  keywords: [
    "KisanMitra",
    "agriculture",
    "farmer assistant",
    "crop disease",
    "soil health",
    "weather advisory",
    "mandi prices",
    "government schemes",
    "Indian agriculture",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&family=Noto+Sans+Tamil:wght@400;500;600;700;800&family=Noto+Sans+Telugu:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full font-sans antialiased bg-brand-bg text-brand-text">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
