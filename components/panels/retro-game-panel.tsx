"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import type { NetworkMetrics } from "@/types/network"
import type { AsciiStyle } from "../connection-mood-constants"
import { RETRO_ASCII, getNetworkHealth, getHealthColorClasses, getStatusBar, ANIMATION_SPEEDS } from "../retro-control-constants"
import ConnectionMood from "@/components/connection-mood"

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
  const [blinkState, setBlinkState] = useState(true)
  const [frame, setFrame] = useState(0)
  const latestMetrics = metrics.length > 0 ? metrics[metrics.length - 1] : null

  // Blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBlinkState((prev) => !prev)
    }, ANIMATION_SPEEDS.blink)

    return () => clearInterval(interval)
  }, [])


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
    <div className={cn("rounded-lg font-mono transition-colors duration-300", className)}>
      <div className="mb-4 border-2 border-dashed border-primary/30 rounded-lg p-2 bg-background/50 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center text-black dark:text-white">
            <span className={cn("text-xl mr-2 mt-2", blinkState ? "opacity-100" : "opacity-30")}>
              {isRunning ? "▓▒░" : "░▒▓"}
            </span>
            <span className="text-sm font-mono">{isRunning ? "GAME ACTIVE" : "GAME IDLE"}</span>
          </div>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className={cn(
                  "inline-block w-2 h-4 border border-primary/50",
                  isRunning && i <= Math.floor(Math.random() * 5) + 1 ? "bg-primary" : "bg-transparent",
                )}
              />
            ))}
          </div>
        </div>

        {isRunning && latestMetrics ? (
          <div className="mt-4 space-y-2 font-mono text-xs">
            <ConnectionMood
              metrics={{
                ping: latestMetrics.ping,
                jitter: latestMetrics.jitter,
                packetLoss: latestMetrics.packetLoss,
              }}
              config={{
                asciiStyle: "boxed",
                animationSpeed: 400,
                showMetrics: true,
              }}
              className="border-none p-0 bg-transparent"
            />
          </div>
        ) : (
          <div className="text-xs font-mono mt-1 text-muted-foreground">
            PRESS START SYSTEM TO BEGIN {blinkState ? "_" : " "}
          </div>
        )}
      </div>
    </div>
  )
}

