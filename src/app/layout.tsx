import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/hooks/useLanguage";
import { SessionProvider } from "@/components/providers/SessionProvider";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "شركة الرائد العربي | السخانات المركزية وأنظمة المياه في الكويت",
    template: "%s | شركة الرائد العربي",
  },
  description:
    "شركة الرائد العربي للسخانات المركزية وأنظمة المياه - حلول متكاملة للسخانات المركزية، فلاتر المياه، المضخات، والتركيب والصيانة الاحترافية في الكويت.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${inter.variable} bg-white text-[#12304A] antialiased`}
      >
        <LanguageProvider>
        <SessionProvider>{children}</SessionProvider>
      </LanguageProvider>
      </body>
    </html>
  );
}

