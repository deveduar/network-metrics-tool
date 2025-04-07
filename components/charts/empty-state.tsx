import { cn } from "@/lib/utils"
import type { NetworkMetrics } from "@/types/network"
import { getSessionSummary } from "@/lib/utils"
import { RetroBlinkText } from "@/components/retro-blink-text"

import { StartCartoon } from "@/components/icons/start-cartoon"
import { CriticalCartoon } from "@/components/icons/critical"
import { FairCartoon } from "@/components/icons/fair"
import { GoodCartoon } from "@/components/icons/good"
import { OptimalCartoon } from "@/components/icons/optimal"
import { PoorCartoon } from "@/components/icons/poor"
import { UnstableCartoon } from "@/components/icons/unstable"

interface EmptyStateProps {
  isRunning: boolean
  metrics: NetworkMetrics[]
  isPaused?: boolean
  isResetting?: boolean
}

export function EmptyState({ 
  isRunning, 
  metrics, 
  isPaused = false, 
  isResetting = false 
}: EmptyStateProps) {

  const getStatusCartoon = (status: string) => {
    switch (status) {
      case 'Critical Connection':
        return <CriticalCartoon className={`w-[320px] h-[280px] transition-colors duration-300 text-[#ff1744] hover:text-[#ff1744]/70`} />
      case 'Poor Connection':
        return <PoorCartoon className={`w-[320px] h-[280px] transition-colors duration-300 text-[#ff4081] hover:text-[#ff4081]/70`} />
      case 'Unstable Connection':
        return <UnstableCartoon className={`w-[320px] h-[280px] transition-colors duration-300 text-[#ff9100] hover:text-[#ff9100]/70`} />
      case 'Fair Connection':
        return <FairCartoon className={`w-[320px] h-[280px] transition-colors duration-300 text-[#ffea00] hover:text-[#ffea00]/70`} />
      case 'Good Connection':
        return <GoodCartoon className={`w-[320px] h-[280px] transition-colors duration-300 text-[#00e676] hover:text-[#00e676]/70`} />
      case 'Optimal Connection':
        return <OptimalCartoon className={`w-[320px] h-[280px] transition-colors duration-300 text-[#00fff5] hover:text-[#00fff5]/70`} />
      default:
        return null
    }
  }
  // if (isRunning) {
  //   return (
  //     <div className="w-full text-muted-foreground text-center">
  //       <p>No data available.</p>
  //       <p className="text-sm">
  //         <span className="animate-pulse">Collecting metrics...</span>
  //       </p>
  //     </div>
  //   )
  // }
  

// Handle resetting state
if (isResetting) {
  return (
    <div className="rounded-lg font-mono transition-colors duration-300 w-full bg-inherit h-full">
      <div className="mb-4 p-4 flex flex-col justify-center items-center h-full">
        <div className="text-xl font-mono text-blue-500 dark:text-blue-400">
          <p>Resetting measurement...</p>
          <p className="text-sm mt-2">
            <RetroBlinkText text="INITIALIZING NEW TEST SESSION" />
          </p>
        </div>
      </div>
    </div>
  )
}

// Handle running state with no data - but don't show this immediately after reset
if (isRunning && metrics.length === 0) {
  return (
    <div className="rounded-lg font-mono transition-colors duration-300 w-full bg-inherit h-full">
      <div className="mb-4 p-4 flex flex-col justify-center items-center h-full">
        <div className="text-xl font-mono text-primary/70">
          <p>Initializing test...</p>
          <p className="text-sm mt-2">
            <RetroBlinkText text="COLLECTING METRICS..." />
          </p>
        </div>
      </div>
    </div>
  )
}

    const summary = getSessionSummary(metrics)

    return (
      <div className="rounded-lg font-mono transition-colors duration-300 w-full bg-inherit h-full">
        <div className="mb-4 p-4 flex flex-col justify-between h-full">
          {summary ? (
            <div className="flex flex-col justify-center items-center">
              {/* <div 
                className="text-xl font-bold uppercase text-center p-2 rounded-md"
                style={{ 
                  color: summary.quality.color,
                  border: `2px solid ${summary.quality.color}`,
                  backgroundColor: `${summary.quality.color}10`
                }}
              >
                {summary.quality.status}
              </div> */}
              <div 
                className="text-xl font-bold uppercase text-center p-2 rounded-md w-full mb-6"
                style={{ 
                  color: summary.quality.color,
                  border: `2px solid ${summary.quality.color}`,
                  backgroundColor: `${summary.quality.color}10`
                }}
              >
                {summary.quality.status}
              </div>
              {getStatusCartoon(summary.quality.status)}

              <div className="grid grid-cols-2   text-lg text-black dark:text-white gap-6  mt-4">

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
            </div>
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