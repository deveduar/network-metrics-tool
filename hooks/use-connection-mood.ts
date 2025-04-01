"use client"

import { useState, useEffect } from "react"
import {
  type MoodType,
  type AsciiStyle,
  getFramesByStyle,
  determineMood,
  getMetricStatus,
  getMoodBackgroundColor,
  getMoodTextColor,
  THRESHOLDS,
} from "./connection-mood-constants"

// Types
interface ConnectionMetrics {
  ping: number
  jitter: number
  packetLoss: number
}

interface ConnectionMoodConfig {
  animationSpeed?: number
  asciiStyle?: AsciiStyle
  showMetrics?: boolean
}

interface ConnectionMoodState {
  mood: MoodType
  currentFrame: string
  metrics: ConnectionMetrics
  config: Required<ConnectionMoodConfig>
}

/**
 * Custom hook for managing connection mood state and animations
 *
 * @param metrics Object containing ping, jitter, and packetLoss values
 * @param config Configuration options for animation and display
 * @returns Connection mood state and helper functions
 */
export function useConnectionMood(metrics: ConnectionMetrics, config: ConnectionMoodConfig = {}) {
  // Default configuration
  const fullConfig: Required<ConnectionMoodConfig> = {
    animationSpeed: config.animationSpeed ?? 400,
    asciiStyle: config.asciiStyle ?? "boxed",
    showMetrics: config.showMetrics ?? true,
  }

  // State for current frame index
  const [frameIndex, setFrameIndex] = useState(0)

  // Get the current mood
  const mood = determineMood(metrics)

  // Get the appropriate frames based on the style and mood
  const frames = getFramesByStyle(fullConfig.asciiStyle, mood)

  // Animation effect
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion) {
      // If reduced motion is preferred, just show the first frame
      setFrameIndex(0)
      return
    }

    // Set up animation interval
    const intervalId = setInterval(() => {
      setFrameIndex((prevIndex) => (prevIndex + 1) % frames.length)
    }, fullConfig.animationSpeed)

    // Clean up interval on unmount
    return () => clearInterval(intervalId)
  }, [frames, fullConfig.animationSpeed])

  // Return the current state and helper functions
  return {
    mood,
    currentFrame: frames[frameIndex],
    metrics,
    config: fullConfig,
    getMetricStatus: (metric: keyof typeof THRESHOLDS) => getMetricStatus(metrics[metric], THRESHOLDS[metric]),
    getBackgroundColor: () => getMoodBackgroundColor(mood),
    getTextColor: () => getMoodTextColor(mood),
  }
}

