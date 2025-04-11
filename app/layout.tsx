import { ThemeProvider } from "@/components/theme-provider"
import { RetroNavBar } from "@/components/retro-nav-bar"
import { RetroFooter } from "@/components/retro-footer"
import "./globals.css";
import Head from 'next/head';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ping Test Tool | Real-Time Internet Quality Analyzer",
  description:
    "Measure your internet connection quality in real-time. Track latency, jitter, and packet loss with a retro-inspired dashboard.",
    keywords: [
      "internet speed test",
      "ping test online",
      "check internet latency",
      "real-time network monitoring",
      "jitter test",
      "packet loss checker",
      "how to check my internet connection",
      "network quality test",
      "latency monitor",
      "internet diagnostics tool",
      "slow internet troubleshooting",
      "online network analyzer",
      "wifi performance test",
      "connection stability test",
      "web-based network tool"
    ],
    
  openGraph: {
    title: "Ping Test Tool | Real-Time Internet Quality Analyzer",
    description:
      "Analyze your connection in real time with detailed metrics like latency, jitter, and packet loss. Retro-style UI",
    url: "https://network-metrics.vercel.app",
    siteName: "Ping Test Tool",
    images: [
      {
        url: "https://i.postimg.cc/XYZ123/network-metrics-og.webp",
        width: 1200,
        height: 630,
        alt: "Ping Test Tool - Real-Time Network Monitoring Dashboard",
      },
    ],
    type: "website",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Network Metrics | Internet Monitoring Tool",
  //   description:
  //     "Check your internet speed, jitter, and packet loss with this real-time tool. Retro vibes, modern tech.",
  //   images: ["https://i.postimg.cc/XYZ123/network-metrics-og.webp"],
  // },
  // verification: {
  //   google: 'your-google-verification-code',
  //   yandex: 'your-yandex-code',
  //   yahoo: 'your-yahoo-code',
  //   other: {
  //     me: ['you@example.com', 'https://your-portfolio-or-github.com'],
  //   },
  // },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
          {/* <meta key="fb-app-id" property="fb:app_id" content="" /> */}

          <meta name="apple-mobile-web-app-title" content="Ping Test" />

        </Head>
      <body className="min-h-screen bg-background antialiased " >
      <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          storageKey="network-metrics-theme"
        >
          <RetroNavBar />
          <div className="md:container">
          {children}

          </div>
          <RetroFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}