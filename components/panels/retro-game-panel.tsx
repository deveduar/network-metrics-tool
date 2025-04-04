"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import type { NetworkMetrics } from "@/types/network"
import type { AsciiStyle } from "../connection-mood-constants"
import { RETRO_ASCII, getNetworkHealth, getHealthColorClasses, getStatusBar, ANIMATION_SPEEDS } from "../retro-control-constants"
import ConnectionMood from "@/components/connection-mood"
import { StatusIndicators } from "@/components/status-indicator"

import { RetroBlinkText } from "@/components/retro-blink-text"

interface RetroGamePanelProps {
  metrics: NetworkMetrics[]
  config?: {
    asciiStyle?: AsciiStyle
    animationSpeed?: number
  }
  className?: string
  isRunning?: boolean
  onToggle?: () => void
}

export function RetroGamePanel({ 
  metrics, 
  config = {}, 
  className,
  isRunning = false,
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

 // Get status colors based on health
 const health = latestMetrics ? getNetworkHealth(latestMetrics.ping, latestMetrics.jitter, latestMetrics.packetLoss) : 'fair'
 const healthColor = getHealthColorClasses(health)

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
          <div className="flex items-center text-black dark:text-white">
            <span className="text-sm ">{isRunning ? "TEST ACTIVE" : "TEST IDLE"}</span>
          </div>
          <StatusIndicators 
            metrics={latestMetrics ? { packetLoss: latestMetrics.packetLoss } : undefined}
            retro={true}
          />
        </div>

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

