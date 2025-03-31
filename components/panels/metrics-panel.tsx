"use client"

import type React from "react"

import type { NetworkMetrics } from "@/types/network"
import { Activity, Clock, Wifi } from "lucide-react"

interface MetricsPanelProps {
  metrics: NetworkMetrics[]
}

export function MetricsPanel({ metrics }: MetricsPanelProps) {
  // Use the latest real metrics if available
  const latestMetrics = metrics.length > 0 ? metrics[metrics.length - 1] : null

  const getStatusClass = (value: number, thresholds: { warning: number; critical: number }, inverse = false) => {
    if (!inverse) {
      if (value > thresholds.critical) return "text-destructive border-destructive/50 bg-destructive/5"
      if (value > thresholds.warning) return "text-warning border-warning/50 bg-warning/5"
      return "text-success border-success/50 bg-success/5"
    } else {
      if (value < thresholds.critical) return "text-destructive border-destructive/50 bg-destructive/5"
      if (value < thresholds.warning) return "text-warning border-warning/50 bg-warning/5"
      return "text-success border-success/50 bg-success/5"
    }
  }

  if (!latestMetrics) {
    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-medium">Current Metrics</h3>
        </div>
        <div className="flex items-center justify-center h-32 text-muted-foreground">
          No data available. Start measurement to see metrics.
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-medium">Current Metrics</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <MetricCard
          icon={<Clock className="h-5 w-5" />}
          label="Ping"
          value={`${latestMetrics.ping.toFixed(0)} ms`}
          className={getStatusClass(latestMetrics.ping, { warning: 100, critical: 150 })}
        />

        <MetricCard
          icon={<Activity className="h-5 w-5" />}
          label="Jitter"
          value={`${latestMetrics.jitter.toFixed(0)} ms`}
          className={getStatusClass(latestMetrics.jitter, { warning: 20, critical: 30 })}
        />
      </div>

      <MetricCard
        icon={<Wifi className="h-5 w-5" />}
        label="Packet Loss"
        value={`${latestMetrics.packetLoss.toFixed(1)}%`}
        className={getStatusClass(latestMetrics.packetLoss, { warning: 0.5, critical: 1 })}
      />
    </div>
  )
}

interface MetricCardProps {
  icon: React.ReactNode
  label: string
  value: string
  className?: string
}

function MetricCard({ icon, label, value, className = "" }: MetricCardProps) {
  return (
    <div className={`flex items-center p-3 rounded-lg border backdrop-blur-md ${className}`}>
      <div className="mr-3">{icon}</div>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  )
}

