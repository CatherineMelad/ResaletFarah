import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/layout/app/navbar";
import FooterSection from "@/components/layout/app/footer";
import AppProviders from "@/components/providers/app";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Resalet Farah",
  description:
    "Resalet Farah is a nonprofit organization. Explore our news, services, photo gallery, success stories, and ways to volunteer or get in touch.",
  openGraph: {
    title: "Resalet Farah",
    description:
      "Resalet Farah is a nonprofit organization. Explore our news, services, photo gallery, success stories, and ways to volunteer or get in touch.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProviders>
          <Navbar />
          {children} <Toaster />
          <FooterSection />
        </AppProviders>
      </body>
    </html>
  );
}
