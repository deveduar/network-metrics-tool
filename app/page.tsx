"use client"

import { NetworkDashboard } from "@/components/network-dashboard"

export default function Home() {
  return (

      <main className="container mx-auto px-4 max-w-5xl">
        <div className="">
          {/* <h1 className="text-3xl font-bold mb-6 text-primary">Network Metrics Dashboard</h1> */}
          <NetworkDashboard />
        </div>
      </main>
  )
}

