import { cn } from "@/lib/utils"
import type { NetworkMetrics } from "@/types/network"
import { getMetricBorderColor } from "@/lib/metric-colors"
import { formatTime } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface BarsChartProps {
  type: "latency" | "quality"
  metric: NetworkMetrics
  index: number
  isRunning: boolean
  config: any
}

export function BarsChart({ type, metric, index, isRunning, config }: BarsChartProps) {
  if (type === "latency") {
    const pingHeight = `${(metric.ping / config.maxValues.ping) * 100}%`
    const jitterHeight = `${(metric.jitter / config.maxValues.jitter) * 100}%`
    const isNewBar = index === 0
    const animationClass = isNewBar && isRunning ? "animate-slide-right" : ""

    const pingBorderColor = getMetricBorderColor.ping(metric.ping)
    const jitterBorderColor = getMetricBorderColor.jitter(metric.jitter)

    return (
      <div key={`${metric.timestamp}-${index}`}
        className={cn(
          "flex-1 flex justify-center gap-2 transition-transform",
          animationClass
        )}
        style={{
          minWidth: "clamp(12px, 4vw, 24px)",
          maxWidth: "clamp(24px, 6vw, 40px)",
          height: "100%",
          alignItems: "flex-end",
          ['--ping-color' as string]: `${pingBorderColor}95`,
          ['--ping-border' as string]: `${pingBorderColor}`,
          ['--jitter-color' as string]: `${jitterBorderColor}40`,
          ['--jitter-border' as string]: `${jitterBorderColor}`,
        }}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
            <div className={cn(
                "w-[45%] rounded-t-sm transition-all duration-300 relative",
                "bg-[var(--ping-color)] dark:bg-[var(--ping-color)]",
                "border border-foreground/30  dark:border-[var(--ping-border)]",
                metric.ping >= 1000 && "animate-pulse-glow"
              )} 
              style={{ height: pingHeight }} />
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
                "bg-[var(--jitter-color)] dark:bg-[var(--jitter-color)]",
                "border border-foreground/20 ",
                metric.jitter >= 800 && "animate-pulse-glow"
              )} 
              style={{ height: jitterHeight }} />
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

  // Quality chart (Packet Loss)
  const packetLossHeight = `${(metric.packetLoss / config.maxValues.packetLoss) * 100}%`
  const isNewBar = index === 0
  const animationClass = isNewBar && isRunning ? "animate-slide-right" : ""
  const packetLossBorderColor = getMetricBorderColor.packetLoss(metric.packetLoss)

  return (
    <div key={`${metric.timestamp}-${index}`}
      className={cn(
        "flex-1 flex justify-center transition-transform",
        animationClass
      )}
      style={{
        minWidth: "clamp(12px, 4vw, 24px)",
        maxWidth: "clamp(24px, 6vw, 40px)",
        height: "100%",
        alignItems: "flex-end"
      }}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={cn(
              "w-[45%] rounded-t-sm transition-all duration-300 relative",
              "dark:bg-background/80",
              metric.packetLoss >= 5 && "animate-pulse-glow"
            )} 
            style={{ 
              height: packetLossHeight,
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: packetLossBorderColor,
              backgroundColor: `${packetLossBorderColor}30`
            }} />
          </TooltipTrigger>
          <TooltipContent>
            <p>Packet Loss: {metric.packetLoss.toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground">{formatTime(metric.timestamp)}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}