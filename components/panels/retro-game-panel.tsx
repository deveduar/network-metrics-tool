"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import type { NetworkMetrics } from "@/types/network"
import type { AsciiStyle } from "../connection-mood-constants"
import { RETRO_ASCII, getNetworkHealth, getHealthColorClasses, getStatusBar, ANIMATION_SPEEDS } from "../retro-control-constants"
import ConnectionMood from "@/components/connection-mood"
import { StatusIndicators } from "@/components/status-indicator"

import { RetroBlinkText } from "@/components/retro-blink-text"
import { getMetricBorderColor, getMetricStatus } from "@/lib/metric-colors"

interface RetroGamePanelProps {
  metrics: NetworkMetrics[]
  config?: {
    asciiStyle?: AsciiStyle
    animationSpeed?: number
  }
  className?: string
  isRunning?: boolean
  isPaused?: boolean
  isResetting?: boolean  // Add isResetting prop
  onToggle?: () => void
}

export function RetroGamePanel({ 
  metrics, 
  config = {}, 
  className,
  isRunning = false,
  isPaused = false,
  isResetting = false,  // Add default value
  onToggle
}: RetroGamePanelProps) {
  const { asciiStyle = "boxed", animationSpeed = 400 } = config

  const [frame, setFrame] = useState(0)
  const latestMetrics = metrics.length > 0 ? metrics[metrics.length - 1] : null

  // Animation for the ASCII art
  useEffect(() => {
    if (!latestMetrics) return

    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 4)
    }, animationSpeed)

    return () => clearInterval(interval)
  }, [latestMetrics, animationSpeed])

  useEffect(() => {
    if (isResetting) {
      // Reset frame to 0 to restart animations
      setFrame(0)
    }
  }, [isResetting])

 // Get status colors based on health
 const health = latestMetrics ? getNetworkHealth(latestMetrics.ping, latestMetrics.jitter, latestMetrics.packetLoss) : 'fair'
 const healthColor = getHealthColorClasses(health)
 


 // Calculate health percentage more sensitively
 const getHealthPercentage = () => {
  if (!latestMetrics) return 50;
  
  // Get health percentage based on network quality status
  const quality = getOverallNetworkQuality();
  
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
const segmentBoundaries = {
  critical: { start: 0, end: 10 },
  poor: { start: 10, end: 25 },
  unstable: { start: 25, end: 40 },
  fair: { start: 40, end: 60 },
  good: { start: 60, end: 80 },
  optimal: { start: 80, end: 100 }
};
 
 // Get metric colors from our color utility
 const pingColor = latestMetrics ? getMetricBorderColor.ping(latestMetrics.ping) : '#00fff5';
 const jitterColor = latestMetrics ? getMetricBorderColor.jitter(latestMetrics.jitter) : '#18ffff';
 const lossColor = latestMetrics ? getMetricBorderColor.packetLoss(latestMetrics.packetLoss) : '#00fff5';
 
 // Get metric statuses
 const pingStatus = latestMetrics ? getMetricStatus.ping(latestMetrics.ping) : 'Optimal';
 const jitterStatus = latestMetrics ? getMetricStatus.jitter(latestMetrics.jitter) : 'Optimal';
 const lossStatus = latestMetrics ? getMetricStatus.packetLoss(latestMetrics.packetLoss) : 'Optimal';
 
 // Detect significant changes
 const hasSignificantChanges = metrics.length > 1 && latestMetrics && (
   Math.abs(latestMetrics.ping - metrics[metrics.length - 2].ping) > 50 ||
   Math.abs(latestMetrics.jitter - metrics[metrics.length - 2].jitter) > 15 ||
   Math.abs(latestMetrics.packetLoss - metrics[metrics.length - 2].packetLoss) > 0.5
 );

 const getOverallNetworkQuality = () => {
  if (!latestMetrics) return { status: 'Waiting...', color: '#00e676' };
  
  if (pingStatus === 'Critical' || jitterStatus === 'Critical' || lossStatus === 'Critical') {
    return { status: 'CRITICAL', color: '#ff1744' };
  }
  if (pingStatus === 'Very High' || jitterStatus === 'Very High' || lossStatus === 'Very High') {
    return { status: 'POOR', color: '#ff4081' };
  }
  if (pingStatus === 'High' || jitterStatus === 'High' || lossStatus === 'High') {
    return { status: 'UNSTABLE', color: '#ff9100' };
  }
  if (pingStatus === 'Warning' || jitterStatus === 'Warning' || lossStatus === 'Warning') {
    return { status: 'FAIR', color: '#ffea00' };
  }
  if (pingStatus === 'Fair' || jitterStatus === 'Fair') {
    return { status: 'GOOD', color: '#00e676' };
  }
  return { status: 'OPTIMAL', color: '#00fff5' };
};

const networkQuality = getOverallNetworkQuality()

  // Get the appropriate ASCII art
  const getAsciiArt = () => {
    if (health === "good") {
      return RETRO_ASCII.gameGood[frame % 2]
    } else if (health === "fair") {
      return RETRO_ASCII.gameFair[frame % 2]
    } else {
      // For poor health, show pacman being chased
      return RETRO_ASCII.gamePoor[frame % 4]
    }
  }

  // Get the appropriate ASCII art
  const asciiArt = getAsciiArt()



 return (
    <div className={cn("rounded-lg font-mono transition-colors duration-300 bg-accent dark:bg-muted/40 dark:border-primary/30 border-primary/20 [inset_0_0_8px_rgba(139,69,19,0.1)]", className)}>
      <div className="mb-4 border-2 border-dashed border-primary/30 rounded-lg p-4 ">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-black dark:text-white flex-wrap">
            {isResetting ? (
              <span className="text-sm font-bold px-2 py-0.5 border rounded-sm text-blue-600 dark:text-blue-400 border-blue-400 bg-blue-100/30 dark:bg-blue-900/30">
                <RetroBlinkText text="RESETTING TEST..." />
              </span>
            ) : isRunning ? (
              <>
                <span className={cn(
                  "text-sm font-bold px-2 py-0.5 border rounded-sm",
                  isPaused 
                    ? "text-yellow-600 dark:text-yellow-400 border-yellow-400 bg-yellow-100/30 dark:bg-yellow-900/30" 
                    : "text-green-600 dark:text-green-400 border-green-400 bg-green-100/30 dark:bg-green-900/30"
                )}>
                  <RetroBlinkText text={isPaused ? "TEST PAUSED" : "TEST ACTIVE"} />
                </span>
                
                {latestMetrics && !isResetting && (
                  <div className="flex gap-2 flex-wrap">
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-sm border",
                      latestMetrics.ping > 150 ? "border-yellow-400 bg-yellow-100/30 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" : 
                      "border-green-400 bg-green-100/30 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    )}>
                      PING: {latestMetrics.ping.toFixed(0)}ms
                    </span>
                    
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-sm border",
                      latestMetrics.jitter > 30 ? "border-yellow-400 bg-yellow-100/30 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" : 
                      "border-green-400 bg-green-100/30 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    )}>
                      JITTER: {latestMetrics.jitter.toFixed(0)}ms
                    </span>
                    
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-sm border",
                      latestMetrics.packetLoss > 1 ? "border-red-400 bg-red-100/30 dark:bg-red-900/30 text-red-700 dark:text-red-400" : 
                      "border-green-400 bg-green-100/30 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    )}>
                      LOSS: {latestMetrics.packetLoss.toFixed(1)}%
                    </span>
                    
                    {hasSignificantChanges && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-sm border border-red-400 bg-red-100/30 dark:bg-red-900/30 text-red-700 dark:text-red-400 animate-pulse-slow">
                        {Math.abs(latestMetrics.ping - metrics[metrics.length - 2].ping) > 50 ? "PING SPIKE! " : ""}
                        {Math.abs(latestMetrics.jitter - metrics[metrics.length - 2].jitter) > 15 ? "JITTER CHANGE! " : ""}
                        {Math.abs(latestMetrics.packetLoss - metrics[metrics.length - 2].packetLoss) > 0.5 ? "PACKET LOSS! " : ""}
                      </span>
                    )}
                    
                    {!hasSignificantChanges && (
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-sm border",
                        networkQuality.status === 'CRITICAL' || networkQuality.status === 'POOR' ? 
                          "border-red-400 bg-red-100/30 dark:bg-red-900/30 text-red-700 dark:text-red-400" :
                        networkQuality.status === 'UNSTABLE' || networkQuality.status === 'FAIR' ? 
                          "border-yellow-400 bg-yellow-100/30 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" :
                          "border-green-400 bg-green-100/30 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      )}>
                        {networkQuality.status}
                      </span>
                    )}
                  </div>
                )}
              </>
            ) : (
              <span className="text-sm px-2 py-0.5 border border-gray-400 bg-gray-100/30 dark:bg-gray-900/30 rounded-sm">
                TEST IDLE
              </span>
            )}
          </div>
          <StatusIndicators 
            metrics={latestMetrics ? { packetLoss: latestMetrics.packetLoss } : undefined}
            retro={true}
          />
        </div>
        
        {/* Status Bar and Alerts */}
        {isRunning && latestMetrics && !isResetting && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-4">
              {/* Health Label */}
              <div className="w-32 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <span className="animate-pulse-slow">Network Health</span>
              </div>
              
              {/* Enhanced Progress Bar Container */}
              <div className="flex-1">
                <div 
                  className="w-full h-6 bg-background/50 rounded-md overflow-hidden relative shadow-inner"
                  style={{
                    border: `1px solid ${networkQuality.color}30`,
                    boxShadow: `inset 0 2px 4px ${networkQuality.color}10`
                  }}
                >
                  {/* Main Health Bar */}
                  <div 
                    className="h-full transition-all duration-300"
                    style={{ 
                      width: `${getHealthPercentage()}%`,
                      background: `linear-gradient(90deg, 
                        ${networkQuality.color}90 0%, 
                        ${networkQuality.color}70 100%
                      )`,
                      boxShadow: `0 0 10px ${networkQuality.color}50`
                    }}
                  >
                    {/* Scanline Effect */}
                    <div className="absolute inset-0 bg-scanline opacity-10"></div>
                  </div>

                  {/* Segment Markers */}
                  <div className="absolute inset-0 flex">
                    {Object.entries(segmentWidths).map(([key, width], index) => (
                      <div 
                        key={key}
                        className="h-full border-r last:border-r-0" 
                        style={{ 
                          width,
                          borderColor: `${networkQuality.color}30`
                        }}
                      />
                    ))}
                  </div>

                  {/* Current Status Text */}
                  {/* <div className="absolute inset-0 flex items-center justify-center">
                    <div className="font-mono text-xs font-bold tracking-wider uppercase">
                      <span 
                        className="animate-pulse-slow drop-shadow-glow"
                        style={{ color: networkQuality.color }}
                      >
                        {networkQuality.status}
                      </span>
                    </div>
                  </div> */}
                </div>

                {/* Segment Labels with Status Text */}
                <div className="flex text-[10px] mt-1 text-muted-foreground/70">
                  {Object.entries(segmentWidths).map(([key, width]) => (
                    <div 
                      key={key}
                      className="flex items-center justify-end font-mono font-bold tracking-wider uppercase"
                      style={{ 
                        width,
                        opacity: networkQuality.status.toLowerCase() === key.toLowerCase() ? 1 : 0.4,
                        color: networkQuality.status.toLowerCase() === key.toLowerCase() ? networkQuality.color : 'currentColor',
                      }}
                    >
                      <span className={cn(
                        "drop-shadow-glow",
                        networkQuality.status.toLowerCase() === key.toLowerCase() && "animate-pulse-slow"
                      )}>
                        {key.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Show reset message when resetting */}
        {isResetting && (
          <div className="text-xs font-mono mt-3 text-blue-600 dark:text-blue-400">
            <RetroBlinkText text="INITIALIZING NEW TEST SESSION..." />
          </div>
        )}
        
        {/* Show idle message when not running and not resetting */}
        {!isRunning && !isResetting && (
          <div className="text-xs font-mono mt-3 text-muted-foreground">
            <RetroBlinkText text="PRESS START TEST TO BEGIN" />
          </div>
        )}


        {/* {isRunning && latestMetrics ? (
          <div className="mt-4 space-y-2 font-mono text-xs">
            <ConnectionMood
              metrics={{
                ping: latestMetrics.ping,
                jitter: latestMetrics.jitter,
                packetLoss: latestMetrics.packetLoss,
              }}
              config={{
                asciiStyle: "rpg",
                animationSpeed: 400,
                showMetrics: true,
              }}
              className="border-none p-0 bg-transparent"
            />
          </div>
        ) : (
          <div className="text-xs font-mono mt-1 text-muted-foreground">
            <RetroBlinkText text="PRESS START TEST TO BEGIN" />
          </div>
        )} */}
      </div>
    </div>
  )
}

