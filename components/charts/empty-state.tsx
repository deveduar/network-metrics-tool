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
      <div className="rounded-lg font-mono transition-colors duration-300 w-full  ">
        <div className="mb-4 p-4">
          {summary ? (
            <>
              <div 
                className="text-lg font-bold uppercase text-center p-2 rounded-md"
                style={{ 
                  color: summary.quality.color,
                  border: `2px solid ${summary.quality.color}`,
                  backgroundColor: `${summary.quality.color}10`
                }}
              >
                {summary.quality.status}
              </div>
              <div className="grid grid-cols-5 gap-4 mx-auto mt-4 text-sm text-black dark:text-white">
              <div className="space-y-2">
                  <p>Ping: <span className="inline-flex items-center gap-1">
                    <span className={`inline-block w-2 h-2 rounded-full`} style={{ backgroundColor: summary.pingColor }} />
                    <span className="font-mono">{summary.avgPing}ms</span>
                  </span></p>
                  <p>Jitter: <span className="inline-flex items-center gap-1">
                    <span className={`inline-block w-2 h-2 rounded-full`} style={{ backgroundColor: summary.jitterColor }} />
                    <span className="font-mono">{summary.avgJitter}ms</span>
                  </span></p>
                  <p>Packet Loss: <span className="inline-flex items-center gap-1">
                    <span className={`inline-block w-2 h-2 rounded-full`} style={{ backgroundColor: summary.packetLossColor }} />
                    <span className="font-mono">{summary.avgPacketLoss}%</span>
                  </span></p>
                </div>
                <div className="space-y-2">
                  <p>Duration: <span className="font-mono text-primary">{summary.duration}</span></p>
                  <p>Samples: <span className="font-mono text-primary">{summary.samples}</span></p>
                </div>
              </div>
              <div className="text-xs mt-4 text-muted-foreground">
                <RetroBlinkText text="PRESS START TEST TO BEGIN NEW MEASUREMENT" />
              </div>
            </>
          ) : (
            <div className="text-xs font-mono text-muted-foreground">
              <RetroBlinkText text="PRESS START TEST TO BEGIN" />
            </div>
          )}
        </div>
      </div>
  )
    }