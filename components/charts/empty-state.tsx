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
        return <CriticalCartoon className={`w-[320px] h-[240px] transition-colors duration-300 text-[#ff1744] hover:text-[#ff1744]/70`} />
      case 'Poor Connection':
        return <PoorCartoon className={`w-[320px] h-[240px] transition-colors duration-300 text-[#ff4081] hover:text-[#ff4081]/70`} />
      case 'Unstable Connection':
        return <UnstableCartoon className={`w-[320px] h-[240px] transition-colors duration-300 text-[#ff9100] hover:text-[#ff9100]/70`} />
      case 'Fair Connection':
        return <FairCartoon className={`w-[320px] h-[240px] transition-colors duration-300 text-[#ffea00] hover:text-[#ffea00]/70`} />
      case 'Good Connection':
        return <GoodCartoon className={`w-[320px] h-[240px] transition-colors duration-300 text-[#00e676] hover:text-[#00e676]/70`} />
      case 'Optimal Connection':
        return <OptimalCartoon className={`w-[320px] h-[240px] transition-colors duration-300 text-[#00fff5] hover:text-[#00fff5]/70`} />
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
            <div className="flex flex-col justify-center items-center h-full">
              <div 
                className="w-full max-w-[600px] p-6 rounded-xl border-2 bg-background/50 dark:bg-background/20"
                style={{ 
                  borderColor: `${summary.quality.color}40`,
                  boxShadow: `0 0 20px ${summary.quality.color}20`
                }}
              >
                <div 
                  className="text-lg font-bold uppercase text-center p-2 rounded-md w-full mb-6"
                  style={{ 
                    color: summary.quality.color,
                    backgroundColor: `${summary.quality.color}15`
                  }}
                >
                  {summary.quality.status}
                </div>
                
                <div className="flex flex-col items-center">
                  {getStatusCartoon(summary.quality.status)}

                  <div className="w-full max-w-[500px] mx-auto mt-4 overflow-x-auto">
                    <table className="w-full text-sm">
                      <tbody className="divide-y divide-primary/10">
                        <tr className="border-t border-primary/10">
                          <td className="py-2 px-4 whitespace-nowrap">Ping</td>
                          <td className="py-2 px-4 font-mono whitespace-nowrap">
                            <span className="inline-flex items-center gap-2">
                              <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: summary.pingColor }} />
                              {summary.avgPing}ms
                            </span>
                          </td>
                          <td className="py-2 px-4 whitespace-nowrap">Duration</td>
                          <td className="py-2 px-4 font-mono whitespace-nowrap">{summary.duration}</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 whitespace-nowrap">Jitter</td>
                          <td className="py-2 px-4 font-mono whitespace-nowrap">
                            <span className="inline-flex items-center gap-2">
                              <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: summary.jitterColor }} />
                              {summary.avgJitter}ms
                            </span>
                          </td>
                          <td className="py-2 px-4 whitespace-nowrap">Samples</td>
                          <td className="py-2 px-4 font-mono whitespace-nowrap">{summary.samples}</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 whitespace-nowrap">Packet Loss</td>
                          <td className="py-2 px-4 font-mono whitespace-nowrap">
                            <span className="inline-flex items-center gap-2">
                              <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: summary.packetLossColor }} />
                              {summary.avgPacketLoss}%
                            </span>
                          </td>
                          <td className="py-2 px-4 whitespace-nowrap"></td>
                          <td className="py-2 px-4 whitespace-nowrap"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* <div className="text-lg mt-6 text-muted-foreground">
                <RetroBlinkText text="PRESS START TEST TO BEGIN NEW MEASUREMENT" />
              </div> */}
            </div>
          ) : (
            // ... rest of the code ...
            <div className="text-xl font-mono text-primary/70 h-full flex flex-col justify-center items-center gap-4">
              <StartCartoon className="w-[320px] h-[280px] text-muted-foreground hover:text-primary transition-colors duration-300" />
              <RetroBlinkText text="PRESS START TEST TO BEGIN" />
            </div>
          )}
        </div>
      </div>
  )
    }