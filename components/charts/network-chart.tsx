"use client"
import { cn } from "@/lib/utils"
import { useState } from "react"
import type { NetworkMetrics } from "@/types/network"
import { MetricChart } from "@/components/charts/metric-chart"
import { RetroGamePanel } from "@/components/panels/retro-game-panel"

interface NetworkChartProps {
  metrics: NetworkMetrics[]
  isRunning: boolean
  onToggle?: () => void
}


export function NetworkChart({ metrics, isRunning, onToggle }: NetworkChartProps) {
  const [activeTab, setActiveTab] = useState("latency")

  return (
    <div className="h-[565px] border-2 border-dashed border-primary/30 rounded-lg bg-accent dark:bg-muted/40 flex flex-col">
        {isRunning && (
        <div className="flex gap-2 p-4">
          <button
            onClick={() => setActiveTab("latency")}
            className={cn(
              "flex-1 px-4 py-2 text-sm font-bold tracking-wider uppercase transition-all duration-300",
              "border-2 dark:border-primary/30 border-primary/20",
              "shadow-[inset_0_-2px_0_rgba(0,0,0,0.2)] dark:shadow-[inset_0_-2px_0_rgba(0,0,0,0.4)]",
              "hover:translate-y-[1px] hover:shadow-[inset_0_-1px_0_rgba(0,0,0,0.2)]",
              "active:translate-y-[2px] active:shadow-none",
              activeTab === "latency" 
                ? "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary"
                : "bg-muted/50 hover:bg-muted/70 dark:bg-muted/20 dark:hover:bg-muted/30"
            )}
          >
            LATENCY
          </button>
        <button
          onClick={() => setActiveTab("quality")}
          className={cn(
            "flex-1 px-4 py-2 text-sm font-bold tracking-wider uppercase transition-all duration-300",
            "border-2 dark:border-primary/30 border-primary/20",
            "shadow-[inset_0_-2px_0_rgba(0,0,0,0.2)] dark:shadow-[inset_0_-2px_0_rgba(0,0,0,0.4)]",
            "hover:translate-y-[1px] hover:shadow-[inset_0_-1px_0_rgba(0,0,0,0.2)]",
            "active:translate-y-[2px] active:shadow-none",
            activeTab === "quality" 
              ? "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary"
              : "bg-muted/50 hover:bg-muted/70 dark:bg-muted/20 dark:hover:bg-muted/30"
          )}
        >
          QUALITY
        </button>
        </div>
      )}
      <div className="flex-1 flex">
        {activeTab === "latency" && (
          <MetricChart type="latency" metrics={metrics} isRunning={isRunning} onToggle={onToggle} />
        )}
        
        {activeTab === "quality" && (
          <MetricChart type="quality" metrics={metrics} isRunning={isRunning} onToggle={onToggle} />
        )}
      </div>
      {/* <RetroGamePanel 
          metrics={metrics}
          isRunning={isRunning}
          config={{
            asciiStyle: "rpg",
            animationSpeed: 400
          }}
        /> */}

    </div>
  )
}

