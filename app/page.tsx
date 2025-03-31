"use client"

import { NetworkDashboard } from "@/components/network-dashboard"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="network-metrics-theme">
      <main className="min-h-screen p-4 md:p-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-primary">Network Metrics Dashboard</h1>
          <NetworkDashboard />
        </div>
      </main>
    </ThemeProvider>
  )
}

