"use client"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import type { NetworkMetrics } from "@/types/network"
import { MetricChart } from "@/components/charts/metric-chart"
import { ChartStatusIndicators } from "@/components/charts/chart-status-indicators"
import { getMetricStatus } from "@/lib/metric-colors"
import { EmptyState } from "@/components/charts/empty-state"
import { RetroBlinkText } from "@/components/retro-blink-text"
import { MetricsIndicators } from "@/components/metrics-indicators"
import { getOverallNetworkQuality } from "@/lib/utils"
import { NetworkStatusIndicator } from "@/components/network-status-indicator"
interface NetworkChartProps {
  metrics: NetworkMetrics[]
  isRunning: boolean
  isPaused?: boolean
  isResetting?: boolean
  onToggle?: () => void
  onPause?: () => void  // Add this line
}

export function NetworkChart({ 
  metrics, 
  isRunning, 
  isPaused = false, 
  isResetting = false,
  onToggle,
  onPause  
}: NetworkChartProps) {
  const [activeTab, setActiveTab] = useState("latency")
  const [visibleCount, setVisibleCount] = useState(15)
  const latestMetrics = metrics.length > 0 ? metrics[metrics.length - 1] : null

  const pingStatus = latestMetrics ? getMetricStatus.ping(latestMetrics.ping) : 'Optimal';
  const jitterStatus = latestMetrics ? getMetricStatus.jitter(latestMetrics.jitter) : 'Optimal';
  const lossStatus = latestMetrics ? getMetricStatus.packetLoss(latestMetrics.packetLoss) : 'Optimal';

  const networkQuality = latestMetrics 
    ? getOverallNetworkQuality(pingStatus, jitterStatus, lossStatus)
    : { status: 'Waiting...', color: '#00e676' }

  const getVisibleMetricsCount = () => {
    const width = window.innerWidth
    
    // Pantallas grandes (monitores de escritorio)
    if (width >= 1800) return 40
    if (width >= 1600) return 35
    if (width >= 1400) return 30
    
    // Pantallas medianas (laptops y tablets horizontales)
    if (width >= 1200) return 26
    if (width >= 1024) return 22
    
    // Tablets y móviles grandes en horizontal
    if (width >= 900) return 20
    if (width >= 768) return 16
    
    // Móviles en horizontal o tablets en vertical
    if (width >= 640) return 14
    
    // Móviles en vertical
    if (width >= 480) return 10
    
    // Pantallas muy pequeñas
    return 8
  }
    
  // Efecto para actualizar el número de métricas visibles al cambiar el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleMetricsCount())
    
    // Establecer el valor inicial
    setVisibleCount(getVisibleMetricsCount())
    
    // Agregar listener para cambios de tamaño
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

    // Add a reset animation effect
    useEffect(() => {
      if (isResetting) {
        // Reset the visible count to initial value
        setVisibleCount(getVisibleMetricsCount())
        // Could also reset activeTab if needed
        setActiveTab("latency")
      }
    }, [isResetting])
  
  
  // Filtrar las métricas para mostrar solo las más recientes según visibleCount
  const visibleMetrics = metrics.slice(-visibleCount)

  // Simplify the condition for showing EmptyState
  const shouldShowEmptyState = isResetting || metrics.length === 0 || !isRunning;
  
  if (shouldShowEmptyState) {
    return (
      // "h-[565px]  h-[609px]
      <div className="h-[625px] border d border-primary/30 rounded-lg bg-accent dark:bg-muted/40 flex flex-col relative">
        <div className="flex-1 flex items-center justify-center cursor-pointer" onClick={!isRunning && !isResetting ? onToggle : undefined}>
          <EmptyState 
            metrics={metrics} 
            isRunning={isRunning} 
            isPaused={isPaused}
            isResetting={isResetting} 
          />
        </div>
      </div>
    )
  }
    return (
      <div className="h-[565px] border border-primary/30 rounded-lg bg-accent dark:bg-muted/40 flex flex-col relative">
        {/* Add pause overlay */}
        {isPaused && (
          <div 
            className="absolute inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center cursor-pointer" 
            onClick={onPause}
          >
            <div className="bg-background/90 dark:bg-background/80 p-4 rounded-lg shadow-lg border-2 border-yellow-400/50 dark:border-yellow-400/30">
              <div className="text-center">
                <h3 className="text-xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                  <RetroBlinkText text="TEST PAUSED" />
                </h3>
                <p className="text-sm text-muted-foreground">
                  Click anywhere to resume
                </p>
              </div>
            </div>
          </div>
        )}
      <div className="flex flex-col sm:flex-row p-4 gap-4 items-center">
        {isRunning && (
          <>
          {latestMetrics && 
            <div className="flex-1 flex flex-col gap-2">
              {/* NetworkStatusIndicator se muestra ahora en RetroGamePanel */}
              <div className="flex gap-2 flex-wrap justify-start">
                <MetricsIndicators metrics={latestMetrics} />
              </div>
            </div>
          }
                    
            <div className="flex gap-2 shrink-0 self-start">
              <button
                onClick={() => setActiveTab("latency")}
                className={cn(
                  " px-3 py-1 text-xs font-bold tracking-wider uppercase transition-all duration-300",
                  "rounded-md border-2",
                  "flex items-center gap-1",
                  activeTab === "latency" 
                    ? [
                        "border-blue-400/50 dark:border-blue-300/30",
                        "bg-blue-50/80 dark:bg-blue-900/20",
                        "translate-y-[2px]",
                        "shadow-none",
                        "text-blue-700 dark:text-blue-300",
                      ]
                    : [
                        "border-zinc-400/30 dark:border-zinc-300/20",
                        "bg-zinc-50/50 dark:bg-zinc-900/10",
                        "shadow-[inset_0_-2px_0_rgba(161,161,170,0.3),0_2px_0_rgba(161,161,170,0.3)]",
                        "dark:shadow-[inset_0_-2px_0_rgba(161,161,170,0.2),0_2px_0_rgba(161,161,170,0.2)]",
                        "hover:translate-y-[1px]",
                        "hover:shadow-[inset_0_-1px_0_rgba(161,161,170,0.3),0_1px_0_rgba(161,161,170,0.3)]",
                        "dark:hover:shadow-[inset_0_-1px_0_rgba(161,161,170,0.2),0_1px_0_rgba(161,161,170,0.2)]",
                        "active:translate-y-[2px] active:shadow-none",
                        "text-zinc-600 dark:text-zinc-400",
                      ]
                )}
              >
                LATENCY
              </button>
              <button
                onClick={() => setActiveTab("quality")}
                className={cn(
                  "px-3 py-1 text-xs font-bold tracking-wider uppercase transition-all duration-300",
                  "rounded-md border-2",
                  "flex items-center gap-1",
                  activeTab === "quality" 
                    ? [
                        "border-blue-400/50 dark:border-blue-300/30",
                        "bg-blue-50/80 dark:bg-blue-900/20",
                        "translate-y-[2px]",
                        "shadow-none",
                        "text-blue-700 dark:text-blue-300",
                      ]
                    : [
                        "border-zinc-400/30 dark:border-zinc-300/20",
                        "bg-zinc-50/50 dark:bg-zinc-900/10",
                        "shadow-[inset_0_-2px_0_rgba(161,161,170,0.3),0_2px_0_rgba(161,161,170,0.3)]",
                        "dark:shadow-[inset_0_-2px_0_rgba(161,161,170,0.2),0_2px_0_rgba(161,161,170,0.2)]",
                        "hover:translate-y-[1px]",
                        "hover:shadow-[inset_0_-1px_0_rgba(161,161,170,0.3),0_1px_0_rgba(161,161,170,0.3)]",
                        "dark:hover:shadow-[inset_0_-1px_0_rgba(161,161,170,0.2),0_1px_0_rgba(161,161,170,0.2)]",
                        "active:translate-y-[2px] active:shadow-none",
                        "text-zinc-600 dark:text-zinc-400",
                      ]
                )}
              >
                QUALITY
              </button>
              </div>
          </>

          
        )}

      </div>
      
      <div className="flex-1 flex">
        {activeTab === "latency" && (
          <MetricChart 
            type="latency" 
            metrics={visibleMetrics} 
            isRunning={isRunning} 
            isResetting={isResetting}
            onToggle={onToggle} 
          />
        )}
        
        {activeTab === "quality" && (
          <MetricChart 
            type="quality" 
            metrics={visibleMetrics} 
            isRunning={isRunning} 
            isResetting={isResetting}
            onToggle={onToggle} 
          />
        )}
      </div>
    </div>
  )
}