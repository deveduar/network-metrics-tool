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
      {/* Ping Indicator */}
      <div className="flex items-center">
        <span className={cn(
          "uppercase px-3 py-1 rounded-sm border font-mono  text-sm tracking-wider",
          "bg-background/80 dark:bg-background/40",
          pingStatus === 'Critical' ? "animate-metric-alert" : 
          pingStatus === 'Very High' ? "animate-pulse-glow" : ""
        )}
        style={{
          borderColor: `${getMetricBorderColor.ping(metrics.ping)}40`,
          color: getMetricBorderColor.ping(metrics.ping),
          boxShadow: `inset 0 0 0.5rem ${getMetricBorderColor.ping(metrics.ping)}10`
        }}>
          PING: {metrics.ping.toFixed(0)}ms
        </span>
      </div>

      {/* Jitter Indicator */}
      <div className="flex items-center">
        <span className={cn(
          "uppercase px-3 py-1 rounded-sm border font-mono text-sm tracking-wider",
          "bg-background/80 dark:bg-background/40",
          jitterStatus === 'Critical' ? "animate-metric-alert" : 
          jitterStatus === 'Very High' ? "animate-pulse-glow" : ""
        )}
        style={{
          borderColor: `${getMetricBorderColor.jitter(metrics.jitter)}40`,
          color: getMetricBorderColor.jitter(metrics.jitter),
          boxShadow: `inset 0 0 0.5rem ${getMetricBorderColor.jitter(metrics.jitter)}10`
        }}>
          JITTER: {metrics.jitter.toFixed(0)}ms
        </span>
      </div>

      {/* Packet Loss Indicator */}
      <div className="flex items-center">
        <span className={cn(
          "uppercase px-3 py-1 rounded-sm border font-mono text-sm tracking-wider",
          "bg-background/80 dark:bg-background/40",
          lossStatus === 'Critical' ? "animate-metric-alert" : 
          lossStatus === 'Very High' ? "animate-pulse-glow" : ""
        )}
        style={{
          borderColor: `${getMetricBorderColor.packetLoss(metrics.packetLoss)}40`,
          color: getMetricBorderColor.packetLoss(metrics.packetLoss),
          boxShadow: `inset 0 0 0.5rem ${getMetricBorderColor.packetLoss(metrics.packetLoss)}10`
        }}>
          LOSS: {metrics.packetLoss.toFixed(1)}%
        </span>
      </div>
    </>
  )
}