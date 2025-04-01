"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import {
  determineMood,
  getMetricStatus,
  getMoodBackgroundColor,
  getMoodTextColor,
  THRESHOLDS,
  BOXED_ASCII_FRAMES,
} from "./connection-mood-constants"

// Types for the component props
interface HappinessMeterProps {
  ping: number
  jitter: number
  packetLoss: number
  animationSpeed?: number // ms (default: 400)
  size?: "sm" | "md" | "lg" // Controls ASCII size
  className?: string
}

// Hook for managing the animation
function useAnimation(frames: string[], speed = 400) {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0)

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion) {
      // If reduced motion is preferred, just show the first frame
      setCurrentFrameIndex(0)
      return
    }

    // Set up animation interval
    const intervalId = setInterval(() => {
      setCurrentFrameIndex((prevIndex) => (prevIndex + 1) % frames.length)
    }, speed)

    // Clean up interval on unmount
    return () => clearInterval(intervalId)
  }, [frames, speed])

  return frames[currentFrameIndex]
}

export default function HappinessMeter({
  ping,
  jitter,
  packetLoss,
  animationSpeed = 400,
  size = "md",
  className,
}: HappinessMeterProps) {
  // Determine the current mood based on metrics
  const mood = determineMood({ ping, jitter, packetLoss })

  // Get the appropriate frames based on the mood
  const frames = BOXED_ASCII_FRAMES[mood]

  // Get the current frame to display
  const currentFrame = useAnimation(frames, animationSpeed)

  // Get status for each metric
  const pingStatus = getMetricStatus(ping, THRESHOLDS.ping)
  const jitterStatus = getMetricStatus(jitter, THRESHOLDS.jitter)
  const packetLossStatus = getMetricStatus(packetLoss, THRESHOLDS.packetLoss)

  // Get background and text colors
  const bgColor = getMoodBackgroundColor(mood)
  const textColor = getMoodTextColor(mood)

  // Determine font size based on size prop
  const fontSize = size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base"

  return (
    <div
      className={cn("rounded-lg border p-4 transition-colors duration-300", bgColor, fontSize, className)}
      aria-live="polite"
    >
      <h3 className="text-lg font-medium mb-2">Connection Mood</h3>

      {/* ASCII Art Display */}
      <pre
        className={cn("font-mono whitespace-pre text-center mb-4", textColor)}
        aria-label={`Connection status: ${mood}`}
      >
        {currentFrame}
      </pre>

      {/* Metrics Display */}
      <div className="grid gap-2 font-mono">
        <div className="flex justify-between">
          <span>Ping:</span>
          <span>
            {ping}ms <span className={pingStatus.class}>{pingStatus.indicator}</span>
          </span>
        </div>
        <div className="flex justify-between">
          <span>Jitter:</span>
          <span>
            {jitter}ms <span className={jitterStatus.class}>{jitterStatus.indicator}</span>
          </span>
        </div>
        <div className="flex justify-between">
          <span>Packet Loss:</span>
          <span>
            {packetLoss}% <span className={packetLossStatus.class}>{packetLossStatus.indicator}</span>
          </span>
        </div>
      </div>

      {/* Screen reader text */}
      <span className="sr-only">
        Connection status is {mood}. Ping: {ping}ms, Jitter: {jitter}ms, Packet Loss: {packetLoss}%.
      </span>
    </div>
  )
}

