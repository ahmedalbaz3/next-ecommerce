import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MSWProvider } from "@/mocks/MSWProvider";
import "./globals.css";
import Header from "@/app/[locale]/components/layout/Header/Header";
import { Providers } from "@/app/[locale]/components/provider";

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
  params: { locale: string };
}) {
  const { locale } = await params;

  // URL remains the master source for the server-side render
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-amber-400 overflow-x-hidden`}
      >
        <MSWProvider>
          <Providers>
            <Header />
            <main className="min-h-dvh">{children}</main>
            <footer className="w-full bg-black p-4 text-center mt-10 text-2xl text-white">
              Copyright © 2025
            </footer>
          </Providers>
        </MSWProvider>
      </body>
    </html>
  );
}
