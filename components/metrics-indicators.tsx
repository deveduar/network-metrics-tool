import { cn } from "@/lib/utils"
import { getMetricBorderColor, getMetricStatus } from "@/lib/metric-colors"
import type { NetworkMetrics } from "@/types/network"

interface MetricsIndicatorsProps {
  metrics: NetworkMetrics
}

export function MetricsIndicators({ metrics }: MetricsIndicatorsProps) {
  const pingStatus = getMetricStatus.ping(metrics.ping)
  const jitterStatus = getMetricStatus.jitter(metrics.jitter)
  const lossStatus = getMetricStatus.packetLoss(metrics.packetLoss)

  return (
    <>
      <div className="flex items-center">
        <span className={cn(
          "uppercase px-3 py-1 rounded-sm border font-mono text-sm tracking-wider",
          "bg-[var(--metric-bg)] dark:bg-background/40",
          "text-foreground/70 dark:text-[var(--metric-color)]",
          "border-primary/20 dark:border-[var(--metric-border)]",
          pingStatus === 'Critical' ? "animate-metric-alert" : 
          pingStatus === 'Very High' ? "animate-pulse-glow" : ""
        )}
        style={{
          ['--metric-color' as string]: getMetricBorderColor.ping(metrics.ping),
          ['--metric-bg' as string]: `${getMetricBorderColor.ping(metrics.ping)}50`,
          ['--metric-border' as string]: `${getMetricBorderColor.ping(metrics.ping)}40`,
          boxShadow: `inset 0 0 0.5rem ${getMetricBorderColor.ping(metrics.ping)}10`
        } as React.CSSProperties}>
          PING: {metrics.ping.toFixed(0)}ms
        </span>
      </div>

      {/* Jitter Indicator */}
      <div className="flex items-center">
        <span className={cn(
          "uppercase px-3 py-1 rounded-sm border font-mono text-sm tracking-wider",
          "bg-[var(--metric-bg)] dark:bg-background/40",
          "text-foreground/70 dark:text-[var(--metric-color)]",
          "border-primary/20 dark:border-[var(--metric-border)]",
          jitterStatus === 'Critical' ? "animate-metric-alert" : 
          jitterStatus === 'Very High' ? "animate-pulse-glow" : ""
        )}
        style={{
          ['--metric-color' as string]: getMetricBorderColor.jitter(metrics.jitter),
          ['--metric-bg' as string]: `${getMetricBorderColor.jitter(metrics.jitter)}50`,
          ['--metric-border' as string]: `${getMetricBorderColor.jitter(metrics.jitter)}40`,
          boxShadow: `inset 0 0 0.5rem ${getMetricBorderColor.jitter(metrics.jitter)}10`
        } as React.CSSProperties}>
          JITTER: {metrics.jitter.toFixed(0)}ms
        </span>
      </div>

      {/* Packet Loss Indicator */}
      <div className="flex items-center">
        <span className={cn(
          "uppercase px-3 py-1 rounded-sm border font-mono text-sm tracking-wider",
          "bg-[var(--metric-bg)] dark:bg-background/40",
          "text-foreground/70 dark:text-[var(--metric-color)]",
          "border-primary/20 dark:border-[var(--metric-border)]",
          lossStatus === 'Critical' ? "animate-metric-alert" : 
          lossStatus === 'Very High' ? "animate-pulse-glow" : ""
        )}
        style={{
          ['--metric-color' as string]: getMetricBorderColor.packetLoss(metrics.packetLoss),
          ['--metric-bg' as string]: `${getMetricBorderColor.packetLoss(metrics.packetLoss)}50`,
          ['--metric-border' as string]: `${getMetricBorderColor.packetLoss(metrics.packetLoss)}40`,
          boxShadow: `inset 0 0 0.5rem ${getMetricBorderColor.packetLoss(metrics.packetLoss)}10`
        } as React.CSSProperties}>
          LOSS: {metrics.packetLoss.toFixed(1)}%
        </span>
      </div>
    </>
  )
}