"use client"
import { cn } from "@/lib/utils"

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

  const getMetricColor = {
    ping: (value: number) => {
      if (value >= 2000) return 'bg-[#ff1744]/80 dark:bg-[#ff1744]/90'     // Critical: Neon Red
      if (value >= 1000) return 'bg-[#ff4081]/80 dark:bg-[#ff4081]/90'     // Very High: Hot Pink
      if (value >= 500) return 'bg-[#ff9100]/80 dark:bg-[#ff9100]/90'      // High: Neon Orange
      if (value >= 150) return 'bg-[#ffea00]/80 dark:bg-[#ffea00]/90'      // Warning: Arcade Yellow
      if (value >= 50) return 'bg-[#00e676]/80 dark:bg-[#00e676]/90'       // Fair: Neon Green
      return 'bg-[#00fff5]/80 dark:bg-[#00fff5]/90'                        // Good: Cyan
    },
    jitter: (value: number) => {
      if (value >= 1600) return 'bg-[#d500f9]/80 dark:bg-[#d500f9]/90'    // Critical: Neon Purple
      if (value >= 800) return 'bg-[#651fff]/80 dark:bg-[#651fff]/90'      // Very High: Electric Purple
      if (value >= 400) return 'bg-[#3d5afe]/80 dark:bg-[#3d5afe]/90'     // High: Electric Blue
      if (value >= 100) return 'bg-[#00b0ff]/80 dark:bg-[#00b0ff]/90'     // Warning: Light Blue
      if (value >= 30) return 'bg-[#64ffda]/80 dark:bg-[#64ffda]/90'      // Fair: Turquoise
      return 'bg-[#18ffff]/80 dark:bg-[#18ffff]/90'                       // Good: Bright Cyan
    },
    packetLoss: (value: number) => {
      if (value >= 100) return 'bg-[#ff1744]/80 dark:bg-[#ff1744]/90'     // Critical: Neon Red
      if (value >= 1) return 'bg-[#ffea00]/80 dark:bg-[#ffea00]/90'       // Warning: Arcade Yellow
      return 'bg-[#00fff5]/80 dark:bg-[#00fff5]/90'                       // Good: Cyan
    }
  }

  const getMetricStatus = {
    ping: (value: number) => {
      if (value >= 2000) return '🔴 Critical'
      if (value >= 1000) return '🟠 Very High'
      if (value >= 500) return '🟡 High'
      if (value >= 150) return '🟡 Warning'
      if (value >= 50) return '🟢 Fair'
      return '✨ Optimal'
    },
    jitter: (value: number) => {
      if (value >= 1600) return '🔴 Critical'
      if (value >= 800) return '🟠 Very High'
      if (value >= 400) return '🟡 High'
      if (value >= 100) return '🟡 Warning'
      if (value >= 30) return '🟢 Fair'
      return '✨ Optimal'
    },
    packetLoss: (value: number) => {
      if (value >= 100) return '🔴 Critical'
      if (value >= 50) return '🟠 Very High'
      if (value >= 25) return '🟡 High'
      if (value >= 1) return '🟡 Warning'
      return '✨ Optimal'
    }
  }

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
    const displayMetrics = [...metrics.slice(-15)].reverse()

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
          <div className="absolute inset-2 flex items-start justify-end gap-[2px]">
          {displayMetrics.map((metric, index) => {
          const pingHeight = `${(metric.ping / maxPing) * 100}%`
          const jitterHeight = `${(metric.jitter / maxJitter) * 100}%`
          
          const isNewBar = index === 0
          const animationClass = isNewBar && isRunning ? "animate-slide-right" : ""

          return (
            <div 
              key={`${metric.timestamp}-${index}`}
              className={`flex-1 min-w-[20px] max-w-[40px] flex justify-center transition-transform ${animationClass}`} 
              style={{ height: "100%", alignItems: "flex-end" }}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                  <div 
                    className={cn(
                      "w-[45%] rounded-t-sm transition-all duration-300",
                      getMetricColor.ping(metric.ping),
                      metric.ping >= 1000 && "animate-pulse-glow"
                    )}
                    style={{ height: pingHeight }}
                  ></div>
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
                  <div 
                    className={cn(
                      "w-[45%] rounded-t-sm transition-all duration-300",
                      getMetricColor.jitter(metric.jitter),
                      metric.jitter >= 800 && "animate-pulse-glow"
                    )}
                    style={{ height: jitterHeight }}
                  ></div>
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
        <div className="absolute bottom-[-40px] left-0 right-0 flex justify-center gap-6 text-xs">
  <div className="flex flex-col items-center gap-1">
    <div className="flex items-center gap-2">
      <div className={cn(
        "w-3 h-3 mr-1 rounded-sm transition-all duration-300",
        getMetricColor.ping(metrics[metrics.length - 1]?.ping || 0),
        metrics[metrics.length - 1]?.ping >= 1000 && "animate-metric-alert"
      )}></div>
      <span>Ping</span>
    </div>
    <span className="text-[10px] text-muted-foreground">
      {getMetricStatus.ping(metrics[metrics.length - 1]?.ping || 0)}
    </span>
  </div>
  <div className="flex flex-col items-center gap-1">
    <div className="flex items-center gap-2">
      <div className={cn(
        "w-3 h-3 mr-1 rounded-sm transition-all duration-300",
        getMetricColor.jitter(metrics[metrics.length - 1]?.jitter || 0),
        metrics[metrics.length - 1]?.jitter >= 800 && "animate-metric-alert"
      )}></div>
      <span>Jitter</span>
    </div>
    <span className="text-[10px] text-muted-foreground">
      {getMetricStatus.jitter(metrics[metrics.length - 1]?.jitter || 0)}
    </span>
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
    const displayMetrics = [...metrics.slice(-15)].reverse()
  
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
          <div className="absolute inset-2 flex items-start justify-end gap-[2px]">
            {displayMetrics.map((metric, index) => {
              const height = `${(metric.packetLoss / maxPacketLoss) * 100}%`
              const isNewBar = index === 0
              const animationClass = isNewBar && isRunning ? "animate-slide-right" : ""
  
              return (
                <div 
                  key={`${metric.timestamp}-${index}`}
                  className={`flex-1 min-w-[20px] max-w-[40px] flex justify-center transition-transform ${animationClass}`} 
                  style={{ height: "100%", alignItems: "flex-end" }}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                      <div 
                        className={cn(
                          "w-[45%] rounded-t-sm transition-all duration-300",
                          getMetricColor.packetLoss(metric.packetLoss),
                          metric.packetLoss >= 50 && "animate-pulse-glow"
                        )}
                        style={{ height }}
                      ></div>
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
        <div className="absolute bottom-[-40px] left-0 right-0 flex justify-center gap-4 text-xs">
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-3 h-3 mr-1 rounded-sm transition-all duration-300",
                  getMetricColor.packetLoss(metrics[metrics.length - 1]?.packetLoss || 0),
                  metrics[metrics.length - 1]?.packetLoss >= 50 && "animate-metric-alert"
                )}></div>
                <span>Packet Loss</span>
              </div>
              <span className="text-[10px] text-muted-foreground">
                {getMetricStatus.packetLoss(metrics[metrics.length - 1]?.packetLoss || 0)}
              </span>
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

