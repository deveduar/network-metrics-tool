import { cn } from "@/lib/utils"
import type { NetworkMetrics } from "@/types/network"
import { getMetricColor, getMetricStatus, getMetricBorderColor } from "@/lib/metric-colors"
import { formatTime } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { EmptyState } from "@/components/charts/empty-state"
import { ChartStatusIndicators } from "@/components/charts/chart-status-indicators"

type ChartType = "latency" | "quality"

type LatencyConfig = {
    maxValues: {
      ping: number;
      jitter: number;
    };
    statuses: {
      ping: string | null;
      jitter: string | null;
      packetLoss: string | null;
    };
    yAxisLabel: "ms";
}
  
  type QualityConfig = {
    maxValues: {
      packetLoss: number;
    };
    statuses: {
      packetLoss: string | null;
    };
    yAxisLabel: "%";
  }
  
  type ChartConfig = LatencyConfig | QualityConfig;

interface MetricChartProps {
  type: ChartType
  metrics: NetworkMetrics[]
  isRunning: boolean
  onToggle?: () => void
}

export function MetricChart({ type, metrics, isRunning, onToggle }: MetricChartProps) {
  if (metrics.length === 0 || (!isRunning && metrics.length > 0)) {
    return (
      <div className="h-full w-full flex items-center cursor-pointer" onClick={onToggle}>
        <EmptyState metrics={metrics} isRunning={isRunning} />
      </div>
    )
  }

  const latestMetrics = metrics[metrics.length - 1]
  const displayMetrics = [...metrics.slice(-15)].reverse()

  const getChartConfig = (): ChartConfig => {
    if (type === "latency") {
      const maxPing = Math.max(...metrics.map((m) => m.ping), 100)
      const maxJitter = Math.max(...metrics.map((m) => m.jitter), 50)
      const pingStatus = latestMetrics ? getMetricStatus.ping(latestMetrics.ping) : null
      const jitterStatus = latestMetrics ? getMetricStatus.jitter(latestMetrics.jitter) : null
      const packetLossStatus = latestMetrics ? getMetricStatus.packetLoss(latestMetrics.packetLoss) : null
  
      return {
        maxValues: { ping: maxPing, jitter: maxJitter },
        statuses: { ping: pingStatus, jitter: jitterStatus, packetLoss: packetLossStatus },
        yAxisLabel: "ms"
      } as LatencyConfig
    } else {
      const maxPacketLoss = Math.max(...metrics.map((m) => m.packetLoss), 5)
      const packetLossStatus = latestMetrics ? getMetricStatus.packetLoss(latestMetrics.packetLoss) : null
  
      return {
        maxValues: { packetLoss: maxPacketLoss },
        statuses: { packetLoss: packetLossStatus },
        yAxisLabel: "%"
      } as QualityConfig
    }
  }

  const config = getChartConfig()

  const renderBars = (metric: NetworkMetrics, index: number) => {
    if (type === "latency") {
      const config = getChartConfig() as LatencyConfig
      const pingHeight = `${(metric.ping / config.maxValues.ping) * 100}%`
      const jitterHeight = `${(metric.jitter / config.maxValues.jitter) * 100}%`
      const isNewBar = index === 0
      const animationClass = isNewBar && isRunning ? "animate-slide-right" : ""

      const pingBorderColor = getMetricBorderColor.ping(metric.ping)
      const jitterBorderColor = getMetricBorderColor.jitter(metric.jitter)

      return (
        <div key={`${metric.timestamp}-${index}`}
          className={`flex-1 min-w-[24px] max-w-[40px] flex justify-center gap-2 transition-transform ${animationClass}`}
          style={{ height: "100%", alignItems: "flex-end" }}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={cn(
                  "w-[45%] rounded-t-sm transition-all duration-300 relative",
                  "bg-background/80",
                  metric.ping >= 1000 && "animate-pulse-glow"
                )} 
                style={{ 
                  height: pingHeight,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: pingBorderColor
                }} />
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
                <div className={cn(
                  "w-[45%] rounded-t-sm transition-all duration-300 relative",
                  "bg-background/80",
                  metric.jitter >= 800 && "animate-pulse-glow"
                )} 
                style={{ 
                  height: jitterHeight,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: jitterBorderColor
                }} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Jitter: {metric.jitter.toFixed(1)}ms</p>
                <p className="text-xs text-muted-foreground">{formatTime(metric.timestamp)}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )
    }
}

  return (
    <div className="flex flex-col h-full w-full p-4 space-y-6">
      {latestMetrics && (
        <ChartStatusIndicators 
          statuses={config.statuses}
          metrics={latestMetrics}
        />
      )}
    <div className="h-full w-full relative rounded-lg  backdrop-blur-sm font-mono">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-foreground/70">
        <span className="bg-background/80 px-2 py-1 rounded-sm border border-primary/20">
          {Object.values(config.maxValues)[0].toFixed(type === "quality" ? 1 : 0)}{config.yAxisLabel}
        </span>
        <span className="bg-background/80 px-2 py-1 rounded-sm border border-primary/20">
          0{config.yAxisLabel}
        </span>
      </div>

      {/* Chart area */}
      <div className="absolute left-14 right-0 top-0 bottom-0 border-l-2 border-b-2 border-primary/30">
        {/* Grid lines */}
        <div className="absolute left-0 right-0 top-1/4 border-t border-primary/20 border-dashed"></div>
        <div className="absolute left-0 right-0 top-1/2 border-t border-primary/20 border-dashed"></div>
        <div className="absolute left-0 right-0 top-3/4 border-t border-primary/20 border-dashed"></div>

        {/* Data points */}
        <div className="absolute inset-2 flex items-start justify-end gap-[2px]">
          {displayMetrics.map((metric, index) => renderBars(metric, index))}
        </div>
      </div>


    </div>
          {/* Legend */}
          <div className="flex justify-center gap-4 text-xs ">
        {type === "latency" ? (
          <>
            <div className="flex items-center gap-2 bg-background/80 px-3 py-1 rounded-sm border border-primary/20">
              <div 
                className={cn(
                  "w-3 h-3 mr-1 rounded-sm transition-all duration-300",
                  latestMetrics?.ping >= 1000 && "animate-metric-alert"
                )}
                style={{
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  borderColor: getMetricBorderColor.ping(latestMetrics?.ping || 0)
                }}
              ></div>
              <span className="uppercase tracking-wider">Ping</span>
            </div>
            <div className="flex items-center gap-2 bg-background/80 px-3 py-1 rounded-sm border border-primary/20">
              <div 
                className={cn(
                  "w-3 h-3 mr-1 rounded-sm transition-all duration-300",
                  latestMetrics?.jitter >= 800 && "animate-metric-alert"
                )}
                style={{
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  borderColor: getMetricBorderColor.jitter(latestMetrics?.jitter || 0)
                }}
              ></div>
              <span className="uppercase tracking-wider">Jitter</span>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2 bg-background/80 px-3 py-1 rounded-sm border border-primary/20">
            <div 
              className={cn(
                "w-3 h-3 mr-1 rounded-sm transition-all duration-300",
                latestMetrics?.packetLoss >= 50 && "animate-metric-alert"
              )}
              style={{
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: getMetricBorderColor.packetLoss(latestMetrics?.packetLoss || 0)
              }}
            ></div>
            <span className="uppercase tracking-wider">Packet Loss</span>
          </div>
        )}
      </div>
    </div>
  )
}