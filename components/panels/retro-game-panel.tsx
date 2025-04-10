"use client"

import { useState, useEffect } from "react"
import { cn, getOverallNetworkQuality } from "@/lib/utils"
import type { NetworkMetrics } from "@/types/network"
import type { AsciiStyle } from "../connection-mood-constants"
import { RETRO_ASCII, getNetworkHealth, getHealthColorClasses, getStatusBar, ANIMATION_SPEEDS } from "../retro-control-constants"
import ConnectionMood from "@/components/connection-mood"
import { StatusIndicators } from "@/components/status-indicator"

import { RetroBlinkText } from "@/components/retro-blink-text"
import { RetroDotText } from "@/components/retro-dots-text"
import { getMetricBorderColor, getMetricStatus } from "@/lib/metric-colors"
import { MetricsIndicators } from "@/components/metrics-indicators"
import { NetworkHealthBar } from "@/components/network-health-bar"
import { NetworkStatusIndicator } from "@/components/network-status-indicator"

interface RetroGamePanelProps {
  metrics: NetworkMetrics[]
  config?: {
    asciiStyle?: AsciiStyle
    animationSpeed?: number
  }
  className?: string
  isRunning?: boolean
  isPaused?: boolean
  isResetting?: boolean  
  onToggle?: () => void
}

export function RetroGamePanel({ 
  metrics, 
  config = {}, 
  className,
  isRunning = false,
  isPaused = false,
  isResetting = false,  
  onToggle
}: RetroGamePanelProps) {
  // const { asciiStyle = "boxed", animationSpeed = 400 } = config

  // const [frame, setFrame] = useState(0)
  const latestMetrics = metrics.length > 0 ? metrics[metrics.length - 1] : null

  // Animation for the ASCII art
  // useEffect(() => {
  //   if (!latestMetrics) return

  //   const interval = setInterval(() => {
  //     setFrame((prev) => (prev + 1) % 4)
  //   }, animationSpeed)

  //   return () => clearInterval(interval)
  // }, [latestMetrics, animationSpeed])

  // useEffect(() => {
  //   if (isResetting) {
  //     // Reset frame to 0 to restart animations
  //     setFrame(0)
  //   }
  // }, [isResetting])

 // Get status colors based on health
//  const health = latestMetrics ? getNetworkHealth(latestMetrics.ping, latestMetrics.jitter, latestMetrics.packetLoss) : 'fair'
//  const healthColor = getHealthColorClasses(health)
 


 // Calculate health percentage more sensitively
 const getHealthPercentage = () => {
  if (!latestMetrics) return 50;
  
  // Get health percentage based on network quality status
  const quality = getOverallNetworkQuality(pingStatus, jitterStatus, lossStatus);
  
  // Map network status to percentage values
  switch (quality.status) {
    case 'CRITICAL':
      return 10; // Very low health
    case 'POOR':
      return 25; // Low health
    case 'UNSTABLE':
      return 40; // Below average health
    case 'FAIR':
      return 60; // Average health
    case 'GOOD':
      return 80; // Good health
    case 'OPTIMAL':
      return 95; // Excellent health
    default:
      return 50; // Default value
  }
};

// Define segment widths based on health thresholds
const segmentWidths = {
  critical: '10%',
  poor: '15%',
  unstable: '15%',
  fair: '20%',
  good: '20%',
  optimal: '20%'
};

// Get segment boundaries for positioning
// const segmentBoundaries = {
//   critical: { start: 0, end: 10 },
//   poor: { start: 10, end: 25 },
//   unstable: { start: 25, end: 40 },
//   fair: { start: 40, end: 60 },
//   good: { start: 60, end: 80 },
//   optimal: { start: 80, end: 100 }
// };
 
 // Get metric colors from our color utility
//  const pingColor = latestMetrics ? getMetricBorderColor.ping(latestMetrics.ping) : '#00fff5';
//  const jitterColor = latestMetrics ? getMetricBorderColor.jitter(latestMetrics.jitter) : '#18ffff';
//  const lossColor = latestMetrics ? getMetricBorderColor.packetLoss(latestMetrics.packetLoss) : '#00fff5';
 
 // Get metric statuses
 const pingStatus = latestMetrics ? getMetricStatus.ping(latestMetrics.ping) : 'Optimal';
 const jitterStatus = latestMetrics ? getMetricStatus.jitter(latestMetrics.jitter) : 'Optimal';
 const lossStatus = latestMetrics ? getMetricStatus.packetLoss(latestMetrics.packetLoss) : 'Optimal';

 const networkQuality = latestMetrics 
   ? getOverallNetworkQuality(pingStatus, jitterStatus, lossStatus)
   : { status: 'Waiting...', color: '#00e676' };

  // Get the appropriate ASCII art
  // const getAsciiArt = () => {
  //   if (health === "good") {
  //     return RETRO_ASCII.gameGood[frame % 2]
  //   } else if (health === "fair") {
  //     return RETRO_ASCII.gameFair[frame % 2]
  //   } else {
  //     // For poor health, show pacman being chased
  //     return RETRO_ASCII.gamePoor[frame % 4]
  //   }
  // }

  // Get the appropriate ASCII art
  // const asciiArt = getAsciiArt()



  return (
    <div className={cn(
      "rounded-lg font-mono transition-colors duration-300 bg-accent dark:bg-muted/40 [inset_0_0_8px_rgba(139,69,19,0.1)]", className)}>
      <div className={cn(
                "border rounded-xl w-full p-4 border-primary/30 max-h-[130px] flex flex-col justify-between",
                isResetting ? "text-blue-600 dark:text-blue-400" :
                !isRunning ? "text-gray-600 dark:text-gray-400" :
                isPaused 
                  ? "text-yellow-600 dark:text-yellow-400" 
                  : "text-green-600 dark:text-green-400"
              )}>
    
          <div className="flex flex-row justify-between items-center">
            {isRunning && !isPaused && !isResetting && latestMetrics ? (
              <NetworkStatusIndicator 
                metrics={metrics}
                latestMetrics={latestMetrics}
                networkQuality={networkQuality}
              />
            ) : isRunning && !latestMetrics ? (
              <div className="h-[32px] inline-flex items-center text-sm tracking-widest whitespace-nowrap px-2 py-1 rounded-md border border-blue-300/50 dark:border-blue-500/30 bg-blue-50/50 dark:bg-blue-900/10 text-blue-600/70 dark:text-blue-400/70">
                <RetroDotText text="LOADING DATA" />
              </div>
            ) : (
              <div className={cn(
                "h-[32px] inline-flex items-center text-sm tracking-widest whitespace-nowrap px-2 py-1 rounded-md",
                "border text-foreground/70 min-w-[120px] justify-center",
                "bg-blue-50/90 border-blue-400/50 dark:bg-background/40 dark:border-primary/20",
                isResetting ? "bg-blue-100 border-blue-400/50 dark:text-blue-400 dark:border-blue-300/30" :
                !isRunning ? "bg-zinc-100 border-zinc-400/50 dark:text-gray-400 dark:border-zinc-300/20" :
                isPaused 
                  ? "bg-yellow-100 border-yellow-400/50 dark:text-yellow-400 dark:border-yellow-300/30" 
                  : ""
              )}>
                <div className="text-center w-full">
                  {isResetting ? <RetroDotText text="RESETTING TEST" /> : 
                   !isRunning ? <RetroBlinkText text="TEST IDLE" /> : 
                   <RetroBlinkText text="TEST PAUSED" />}
                </div>
              </div>
            )}
            <div className="flex justify-end text-black dark:text-white">
              <StatusIndicators 
                metrics={latestMetrics ? { packetLoss: latestMetrics.packetLoss } : undefined}
                retro={true}
              />
            </div>
          </div>
 
          {isRunning && latestMetrics && !isResetting ? (
            <NetworkHealthBar 
              networkQuality={networkQuality}
              healthPercentage={getHealthPercentage()}
              segmentWidths={segmentWidths}
            />
          ) : null}

          {/* <div className=" ">
          {isRunning && latestMetrics && !isResetting ? (
            <NetworkHealthBar 
              networkQuality={networkQuality}
              healthPercentage={getHealthPercentage()}
              segmentWidths={segmentWidths}
            />
          ) : isRunning && !latestMetrics && !isResetting ? (
            <div className=" flex items-center justify-center">
              <div className="w-full h-4 rounded-full overflow-hidden relative ">
                <div className="h-full  animate-pulse rounded-full"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-mono text-blue-600/70 dark:text-blue-400/70 tracking-widest">
                    <RetroDotText text="LOADING METRICS" />
                  </span>
                </div>
              </div>
            </div>
          ) : isResetting ? (
            <div className="text-xs font-mono text-blue-600 dark:text-blue-400 text-center">
              <RetroDotText text="INITIALIZING NEW TEST SESSION" />
            </div>
          ) : !isRunning ? (
            <div className="text-xs font-mono text-muted-foreground text-center">
              <RetroBlinkText text="PRESS START TEST TO BEGIN" />
            </div>
          ) : (
            <div className="text-xs font-mono text-yellow-600 dark:text-yellow-400 text-center">
              <RetroDotText text="TEST PAUSED - PRESS RESUME TO CONTINUE" />
            </div>
          )}
        </div> */}
      </div>
    </div>
  )
}

