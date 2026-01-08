import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/app/[locale]/components/layout/Header/Header";
import ReduxProvider from "@/app/[locale]/components/Providers/reduxProvider";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "./components/Providers/ThemeProvider";
import Footer from "./components/layout/Footer/Footer";
import { Toaster } from "sonner";
import Marquee from "./components/ui/Marquee/Marquee";

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
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-amber-400 overflow-x-hidden`}
      >
        <NextIntlClientProvider messages={messages}>
          <ReduxProvider>
            <ThemeProvider>
              <Marquee />
              <Header />
              <Toaster position="top-right" richColors />
              <main className="min-h-dvh">{children}</main>
              <Footer />
            </ThemeProvider>
          </ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
