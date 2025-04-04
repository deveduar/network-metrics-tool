"use client"

import { NetworkDashboard } from "@/components/network-dashboard"

export default function Home() {
  return (
// mx-auto px-4 max-w-5xl
      <main className="container ">
        <div className="">
          {/* <h1 className="text-3xl font-bold mb-6 text-primary">Network Metrics Dashboard</h1> */}
          <NetworkDashboard />
        </div>
      </main>
  )
}

