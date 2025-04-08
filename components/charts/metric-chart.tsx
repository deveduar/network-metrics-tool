import { cn } from "@/lib/utils"
import type { NetworkMetrics } from "@/types/network"
import { getMetricStatus, getMetricBorderColor } from "@/lib/metric-colors"
import { formatTime } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { EmptyState } from "@/components/charts/empty-state"
import { ChartStatusIndicators } from "@/components/charts/chart-status-indicators"
import { BarsChart } from "@/components/charts/bars-chart"

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
    isResetting?: boolean
    onToggle?: () => void
  }
  
  export function MetricChart({ 
    type, 
    metrics, 
    isRunning, 
    isResetting = false,
    onToggle 
  }: MetricChartProps) {
    // if (metrics.length === 0 || isResetting) {
    //   return (
    //     <div className="h-full w-full flex items-center justify-center">
    //       <p className="text-muted-foreground">
    //         {isResetting ? "Resetting chart data..." : "No data available"}
    //       </p>
    //     </div>
    //   )
    // }

  const latestMetrics = metrics[metrics.length - 1]
  // const displayMetrics = [...metrics.slice(-15)].reverse()
  const displayMetrics = [...metrics].reverse()

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


return (
  <div className="flex flex-col h-full w-full p-4 space-y-6 rounded-lg font-mono 
  aspect-[4/3] sm:aspect-[3/2] md:aspect-[2/1] lg:aspect-[5/2] xl:aspect-[3/1] relative   ">
    <div className="h-full w-full relative rounded-lg backdrop-blur-sm font-mono">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-foreground/70 z-20">
        <span className="bg-background/80 px-2 py-1 rounded-sm border border-primary/20">
          {Object.values(config.maxValues)[0].toFixed(type === "quality" ? 1 : 0)}{config.yAxisLabel}
        </span>
        <span className="bg-background/80 px-2 py-1 rounded-sm border border-primary/20">
          0{config.yAxisLabel}
        </span>
      </div>

      {/* Chart area */}
      <div className="absolute left-14 right-0 top-0 bottom-0 border-l-2 border-b-2 border-primary/30 z-10">
        {/* Grid lines */}
        <div className="absolute left-0 right-0 top-1/4 border-t border-primary/20 border-dashed"></div>
        <div className="absolute left-0 right-0 top-1/2 border-t border-primary/20 border-dashed"></div>
        <div className="absolute left-0 right-0 top-3/4 border-t border-primary/20 border-dashed"></div>

        {/* Data points */}
        <div className="absolute inset-2 flex flex-wrap items-end justify-end gap-[2px] z-20">
          {displayMetrics.map((metric, index) => (
            <BarsChart
              key={`${metric.timestamp}-${index}`}
              type={type}
              metric={metric}
              index={index}
              isRunning={isRunning}
              config={config}
            />
          ))}
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