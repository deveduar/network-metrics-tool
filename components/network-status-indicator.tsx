import { cn } from "@/lib/utils"
import { RetroBlinkText } from "@/components/retro-blink-text"
import type { NetworkMetrics } from "@/types/network"

interface NetworkStatusIndicatorProps {
    metrics: NetworkMetrics[]
    latestMetrics: NetworkMetrics
    networkQuality: { status: string; color: string }
  }
  
  export function NetworkStatusIndicator({ 
    metrics, 
    latestMetrics, 
    networkQuality
  }: NetworkStatusIndicatorProps) {
    // Moved the significant changes detection here
    const hasSignificantChanges = metrics.length > 1 && (
      Math.abs(latestMetrics.ping - metrics[metrics.length - 2].ping) > 50 ||
      Math.abs(latestMetrics.jitter - metrics[metrics.length - 2].jitter) > 15 ||
      Math.abs(latestMetrics.packetLoss - metrics[metrics.length - 2].packetLoss) > 0.5
    );
  
    return (
      <div className="w-fit text-xs font-bold uppercase tracking-wider sm:flex-1 sm:text-center">
        {!hasSignificantChanges ? (
        <span className={cn(
          "text-xs font-bold tracking-widest whitespace-nowrap px-2 py-1 rounded-md",
          "bg-background/80 dark:bg-background/40 border border-primary/20",
          networkQuality.status === 'CRITICAL' ? "animate-metric-alert" : 
          networkQuality.status === 'POOR' ? "animate-pulse-glow" : ""
        )}
        style={{ color: networkQuality.color }}>
          ■ NETWORK STATUS: {networkQuality.status}
        </span>
      ) : (
        <span className="text-xs font-bold tracking-widest whitespace-nowrap px-2 py-1 rounded-md bg-red-50/80 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-500 animate-metric-alert">
          ⚠ ALERT: {" "}
          {Math.abs(latestMetrics.ping - metrics[metrics.length - 2].ping) > 50 ? "PING SPIKE " : ""}
          {Math.abs(latestMetrics.jitter - metrics[metrics.length - 2].jitter) > 15 ? "JITTER CHANGE " : ""}
          {Math.abs(latestMetrics.packetLoss - metrics[metrics.length - 2].packetLoss) > 0.5 ? "PACKET LOSS" : ""}
        </span>
      )}
    </div>
  )
}