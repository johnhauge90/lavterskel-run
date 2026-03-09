import type { Metadata } from "next";
import { Geist, Geist_Mono, League_Gothic } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const leagueGothic = League_Gothic({
  variable: "--font-league-gothic",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Morgenbruddet – Trygg start på sykkel i Rogaland",
    template: "%s | Morgenbruddet",
  },
  description:
    "Morgenbruddet er Rogalands lavterskel sykkelfellesskap. No-drop, kaffe og fellesskap. Uansett nivå – kom i gang med sykkelen og sykle Nordsjørittet 2026.",
  keywords: [
    "sykkel nybegynner",
    "sykkel Rogaland",
    "Morgenbruddet",
    "Nordsjørittet",
    "lavterskel sykling",
    "sykle til jobb",
    "sykkelstamveien",
    "pendling sykkel Stavanger",
    "sykkelpendling",
  ],
  openGraph: {
    title: "Morgenbruddet – Trygg start på sykkel i Rogaland",
    description:
      "No-drop sykkelfellesskap med kaffe og fellesskap. Fra nybegynner til Nordsjørittet 2026.",
    url: "https://morgenbruddet.no",
    siteName: "Morgenbruddet",
    locale: "nb_NO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Morgenbruddet – Trygg start på sykkel",
    description: "Lavterskel sykkelfellesskap i Rogaland. No-drop, kaffe, Nordsjørittet 2026.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="nb">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${leagueGothic.variable} antialiased`}
      >
        {measurementId ? <GoogleAnalytics measurementId={measurementId} /> : null}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
