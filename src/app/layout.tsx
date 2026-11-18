import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RouteFocus } from "@/components/site/RouteFocus";
import { getServiceOptions } from "@/lib/server/content";

const sourceSans = localFont({
  src: "../../public/fonts/source-sans-3.ttf",
  variable: "--font-source-sans",
  weight: "200 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://altusmedialabs.com",
  ),
  title: {
    default: "Altus Media Labs — Where strategy meets execution",
    template: "%s — Altus Media Labs",
  },
  description:
    "Strategy, design, development, automation, and marketing. One integrated team building purposeful digital experiences.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Altus Media Labs",
    description: "Where strategy meets execution.",
    type: "website",
    siteName: "Altus Media Labs",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Altus Media Labs",
    description: "Where strategy meets execution.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${sourceSans.variable} font-sans bg-background text-foreground antialiased selection:bg-blue-100 selection:text-foreground`}
      >
        <a
          className="fixed -top-24 left-5 z-[100] rounded-xl border border-border bg-card px-5 py-3 font-semibold text-primary shadow-lg transition-transform focus:top-4"
          href="#main-content"
        >
          Skip to content
        </a>
        <Navbar services={getServiceOptions()} />
        <main
          id="main-content"
          tabIndex={-1}
          className="min-h-[60vh] pt-[76px] md:pt-[84px]"
        >
          {children}
        </main>
        <Footer />
        <RouteFocus />
      </body>
    </html>
  );
}
