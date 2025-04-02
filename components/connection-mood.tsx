"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import {
  type AsciiStyle,
  getFramesByStyle,
  determineMood,
  getMetricStatus,
  getMoodBackgroundColor,
  getMoodTextColor,
  THRESHOLDS,
} from "./connection-mood-constants"

// Types for the component props
interface ConnectionMoodProps {
  metrics: {
    ping: number
    jitter: number
    packetLoss: number
  }
  config?: {
    animationSpeed?: number // Default: 400ms
    asciiStyle?: AsciiStyle // Default: 'boxed'
    showMetrics?: boolean // Default: true
  }
  className?: string
}

/**
 * Custom hook for managing ASCII animation frames
 * @param frames Array of animation frames
 * @param speed Animation speed in milliseconds
 * @returns Current frame to display
 */
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

/**
 * ConnectionMood component displays network connection status using ASCII art
 *
 * @example
 * <ConnectionMood
 *   metrics={{
 *     ping: 87,
 *     jitter: 15,
 *     packetLoss: 0.2
 *   }}
 *   config={{
 *     asciiStyle: 'rpg',
 *     animationSpeed: 500
 *   }}
 * />
 */
export default function ConnectionMood({ metrics, config = {}, className }: ConnectionMoodProps) {
  const { ping, jitter, packetLoss } = metrics
  const { animationSpeed = 400, asciiStyle = "boxed", showMetrics = true } = config

  // Determine the current mood based on metrics
  const mood = determineMood({ ping, jitter, packetLoss })

  // Get the appropriate frames based on the style and mood
  const frames = getFramesByStyle(asciiStyle, mood)

  // Get the current frame to display
  const currentFrame = useAnimation(frames, animationSpeed)

  // Get status for each metric
  const pingStatus = getMetricStatus(ping, THRESHOLDS.ping)
  const jitterStatus = getMetricStatus(jitter, THRESHOLDS.jitter)
  const packetLossStatus = getMetricStatus(packetLoss, THRESHOLDS.packetLoss)

  // Get background and text colors
  const bgColor = getMoodBackgroundColor(mood)
  const textColor = getMoodTextColor(mood)

  return (
    <div
      className={cn("rounded-lg border p-4 transition-colors duration-300 font-mono", bgColor, className)}
      aria-live="polite"
    >
      {/* <h3 className="text-lg font-medium mb-2">Connection Mood</h3> */}



      {/* Metrics Display */}
      {showMetrics && (
        <div className="grid gap-2 text-sm">
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
      )}
      {/* ASCII Art Display */}
      <pre className={cn("whitespace-pre text-xl text-left pt-2")} aria-label={`Connection status: ${mood}`}>
        {currentFrame}
      </pre>
      {/* Screen reader text */}
      <span className="sr-only">
        Connection status is {mood}. Ping: {ping}ms, Jitter: {jitter}ms, Packet Loss: {packetLoss}%.
      </span>
    </div>
  )
}

