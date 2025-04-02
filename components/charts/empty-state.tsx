import { cn } from "@/lib/utils"
import type { NetworkMetrics } from "@/types/network"
import { getSessionSummary } from "@/lib/utils"
import { RetroBlinkText } from "@/components/retro-blink-text"

interface EmptyStateProps {
  isRunning: boolean
  metrics: NetworkMetrics[]
}

export function EmptyState({ isRunning, metrics }: EmptyStateProps) {
    if (isRunning) {
      return (
        <div className="text-muted-foreground text-center space-y-2">
          <p>No data available.</p>
          <p className="text-sm">
            <span className="animate-pulse">Collecting metrics...</span>
          </p>
        </div>
      )
    }
  
    const summary = getSessionSummary(metrics)

    return (
        <div className="text-muted-foreground text-center space-y-4">
          {summary ? (
            <>
              <div className={cn("text-lg font-medium", summary.quality.color)}>
                {summary.quality.status}
              </div>
              <div className="grid grid-cols-2 gap-4 max-w-[300px] mx-auto text-sm">
                <div className="space-y-2">
                  <p>Ping: <span className={cn("font-mono", summary.pingColor.replace('bg-', 'text-').replace('/80', '').replace('dark:', ''))}>{summary.avgPing}ms</span></p>
                  <p>Jitter: <span className={cn("font-mono", summary.jitterColor.replace('bg-', 'text-').replace('/80', '').replace('dark:', ''))}>{summary.avgJitter}ms</span></p>
                  <p>Packet Loss: <span className={cn("font-mono", summary.packetLossColor.replace('bg-', 'text-').replace('/80', '').replace('dark:', ''))}>{summary.avgPacketLoss}%</span></p>
                </div>
                <div className="space-y-2">
                  <p>Duration: <span className="font-mono text-primary">{summary.duration}</span></p>
                  <p>Samples: <span className="font-mono text-primary">{summary.samples}</span></p>
                </div>
              </div>
              <p className="text-xs mt-4">
                <RetroBlinkText text="Click to start new measurement" />
              </p>
            </>
          ) : (
            <p className="text-sm">
              <RetroBlinkText text="Click here or press START to begin measurement" />
            </p>
          )}
        </div>
      )
    }