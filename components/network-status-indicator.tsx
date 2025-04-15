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
  
    const alertTexts = [];
    if (metrics.length > 1) {
      if (Math.abs(latestMetrics.ping - metrics[metrics.length - 2].ping) > 50) {
        alertTexts.push("PING SPIKE");
      }
      if (Math.abs(latestMetrics.jitter - metrics[metrics.length - 2].jitter) > 15) {
        alertTexts.push("JITTER CHANGE");
      }
      if (Math.abs(latestMetrics.packetLoss - metrics[metrics.length - 2].packetLoss) > 0.5) {
        alertTexts.push("PACKET LOSS");
      }
    }

    return (
      <div className="h-[32px] flex items-center">
        {!hasSignificantChanges ? (
        <span className={cn(
          "h-[32px] inline-flex items-center tracking-widest whitespace-nowrap rounded-md",
          "text-[10px] sm:text-xs md:text-sm px-1.5 sm:px-2 py-0.5 sm:py-1",
          "bg-[var(--metric-bg)] dark:bg-background/40",
          "text-foreground/70 dark:text-[var(--metric-color)]",
          "border border-primary/20 dark:border-[var(--metric-border)]",
          networkQuality.status === 'CRITICAL' ? "animate-metric-alert" : 
          networkQuality.status === 'POOR' ? "animate-pulse-glow" : ""
        )}
        style={{
          ['--metric-color' as string]: networkQuality.color,
          ['--metric-bg' as string]: `${networkQuality.color}70`,
          ['--metric-border' as string]: `${networkQuality.color}40`,
          boxShadow: `inset 0 0 0.5rem ${networkQuality.color}10`
        } as React.CSSProperties}>
          <span>NETWORK STATUS: {networkQuality.status}</span>
        </span>
      ) : (
        <span className={cn(
          "h-[32px] inline-flex items-center tracking-widest whitespace-nowrap rounded-md",
          "text-[10px] sm:text-xs md:text-sm font-bold px-1.5 sm:px-2 py-0.5 sm:py-1",
          "bg-red-50/80 dark:bg-red-900/20 border border-red-200 dark:border-red-800",
          "text-red-500 animate-metric-alert"
        )}>
          <span>⚠ ALERT: {alertTexts.join(" ")}</span>
         
        </span>
      )}
    </div>
  )
}