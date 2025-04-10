"use client"

import { NetworkDashboard } from "@/components/network-dashboard"
import { AboutSection } from "@/components/about-section"

export default function Home() {
  return (
    <main className="  ">
      <NetworkDashboard />
      
      <div className="my-6 md:my-12">
        <AboutSection />
      </div>
    </main>
  )
}