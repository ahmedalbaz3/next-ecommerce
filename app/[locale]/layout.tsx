import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/app/[locale]/components/layout/Header/Header";
import ReduxProvider from "@/app/[locale]/components/reduxProvider";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Commerce",
  description: "Next.js E-commerce store",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const messages = await getMessages();
  const { locale } = await params;

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-amber-400 overflow-x-hidden`}
      >
        <NextIntlClientProvider messages={messages}>
          <ReduxProvider>
            <Header />
            <main className="min-h-dvh">{children}</main>
            <footer className="w-full bg-black p-4 text-center mt-10 text-2xl text-white">
              Copyright © 2025
            </footer>
          </ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
