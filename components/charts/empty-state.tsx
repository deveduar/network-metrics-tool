import { cn } from "@/lib/utils"
import type { NetworkMetrics } from "@/types/network"
import { getSessionSummary } from "@/lib/utils"
import { RetroBlinkText } from "@/components/retro-blink-text"
import Image from "next/image"
import { StartCartoon } from "@/components/icons/start-cartoon"

interface EmptyStateProps {
  isRunning: boolean
  metrics: NetworkMetrics[]
}

export function EmptyState({ isRunning, metrics }: EmptyStateProps) {
  if (isRunning) {
    return (
      <div className="w-full text-muted-foreground text-center">
        <p>No data available.</p>
        <p className="text-sm">
          <span className="animate-pulse">Collecting metrics...</span>
        </p>
      </div>
    )
  }
  
    const summary = getSessionSummary(metrics)

    return (
      <div className="rounded-lg font-mono transition-colors duration-300 w-full bg-inherit h-full">
        <div className="mb-4 p-4 flex flex-col justify-between h-full">
          {summary ? (
            <>
              <div 
                className="text-xl font-bold uppercase text-center p-2 rounded-md"
                style={{ 
                  color: summary.quality.color,
                  border: `2px solid ${summary.quality.color}`,
                  backgroundColor: `${summary.quality.color}10`
                }}
              >
                {summary.quality.status}
              </div>
              <div className="grid grid-cols-2 gap-8 mx-auto mt-4 text-lg text-black dark:text-white place-content-center w-fit">
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
              <div className="text-lg mt-4 text-muted-foreground">
                <RetroBlinkText text="PRESS START TEST TO BEGIN NEW MEASUREMENT" />
              </div>
            </>
          ) : (
            <div className="text-xl font-mono text-primary/70 h-full flex flex-col justify-center items-center gap-4">
              <StartCartoon className="w-[320px] h-[280px] text-muted-foreground hover:text-primary transition-colors duration-300" />
              <RetroBlinkText text="PRESS START TEST TO BEGIN" />
            </div>
          )}
        </div>
      </div>
  )
    }