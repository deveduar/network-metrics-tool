"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { NetworkMetrics } from "@/types/network"

interface NetworkChartProps {
  metrics: NetworkMetrics[]
  isRunning: boolean
}

export function NetworkChart({ metrics, isRunning }: NetworkChartProps) {
  const [activeTab, setActiveTab] = useState("latency")

  // Format time for display
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  }

  // Simple chart rendering using divs and CSS
  const renderLatencyChart = () => {
    if (metrics.length === 0)
      return (
        <div className="flex items-center justify-center h-[300px] text-muted-foreground">
          No data available. Start measurement to see metrics.
        </div>
      )

    const maxPing = Math.max(...metrics.map((m) => m.ping), 100) // At least 100ms for scale
    const maxJitter = Math.max(...metrics.map((m) => m.jitter), 50) // At least 50ms for scale

    // Get the last 15 metrics and reverse them so newest is on the right
    const displayMetrics = [...metrics].slice(-15)

    return (
      <div className="h-[300px] w-full relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-muted-foreground">
          <span>{maxPing.toFixed(0)}ms</span>
          <span>0ms</span>
        </div>

        {/* Chart area */}
        <div className="absolute left-14 right-0 top-0 bottom-0 border-l border-b border-border">
          {/* Horizontal grid lines */}
          <div className="absolute left-0 right-0 top-1/4 border-t border-dashed border-border/30"></div>
          <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-border/30"></div>
          <div className="absolute left-0 right-0 top-3/4 border-t border-dashed border-border/30"></div>

          {/* Data points */}
          <div className="absolute inset-2 flex items-end">
            {displayMetrics.map((metric, index, array) => {
              const pingHeight = `${(metric.ping / maxPing) * 100}%`
              const jitterHeight = `${(metric.jitter / maxJitter) * 100}%`

              return (
                <div key={metric.timestamp} className="flex-1 flex justify-center" style={{ height: "100%" }}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="w-3 bg-primary/80 rounded-t-sm mx-0.5" style={{ height: pingHeight }}></div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Ping: {metric.ping.toFixed(1)}ms</p>
                        <p className="text-xs text-muted-foreground">{formatTime(metric.timestamp)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="w-3 bg-secondary/80 rounded-t-sm mx-0.5" style={{ height: jitterHeight }}></div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Jitter: {metric.jitter.toFixed(1)}ms</p>
                        <p className="text-xs text-muted-foreground">{formatTime(metric.timestamp)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-[-30px] left-0 right-0 flex justify-center gap-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-primary/80 mr-1"></div>
            <span>Ping</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-secondary/80 mr-1"></div>
            <span>Jitter</span>
          </div>
        </div>
      </div>
    )
  }

  const renderQualityChart = () => {
    if (metrics.length === 0)
      return (
        <div className="flex items-center justify-center h-[300px] text-muted-foreground">
          No data available. Start measurement to see metrics.
        </div>
      )

    const maxPacketLoss = Math.max(...metrics.map((m) => m.packetLoss), 5) // At least 5% for scale

    // Get the last 15 metrics and reverse them so newest is on the right
    const displayMetrics = [...metrics].slice(-15)

    return (
      <div className="h-[300px] w-full relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-muted-foreground">
          <span>{maxPacketLoss.toFixed(1)}%</span>
          <span>0%</span>
        </div>

        {/* Chart area */}
        <div className="absolute left-14 right-0 top-0 bottom-0 border-l border-b border-border">
          {/* Horizontal grid lines */}
          <div className="absolute left-0 right-0 top-1/4 border-t border-dashed border-border/30"></div>
          <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-border/30"></div>
          <div className="absolute left-0 right-0 top-3/4 border-t border-dashed border-border/30"></div>

          {/* Data points */}
          <div className="absolute inset-2 flex items-end">
            {displayMetrics.map((metric, index, array) => {
              const height = `${(metric.packetLoss / maxPacketLoss) * 100}%`

              return (
                <div key={metric.timestamp} className="flex-1 flex justify-center" style={{ height: "100%" }}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="w-6 bg-[hsl(var(--chart-5))] rounded-t-sm" style={{ height }}></div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Packet Loss: {metric.packetLoss.toFixed(2)}%</p>
                        <p className="text-xs text-muted-foreground">{formatTime(metric.timestamp)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-[-30px] left-0 right-0 flex justify-center gap-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[hsl(var(--chart-5))] mr-1"></div>
            <span>Packet Loss</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Tabs defaultValue="latency" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="latency">Latency</TabsTrigger>
        <TabsTrigger value="quality">Quality</TabsTrigger>
      </TabsList>

      <TabsContent value="latency" className="mt-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Ping & Jitter</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="w-full h-[300px] relative mb-8"
              aria-live="polite"
              aria-label="Latency chart showing ping and jitter over time"
            >
              {renderLatencyChart()}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="quality" className="mt-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Packet Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="w-full h-[300px] relative mb-8"
              aria-live="polite"
              aria-label="Quality chart showing packet loss percentage over time"
            >
              {renderQualityChart()}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

