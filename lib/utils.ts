import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { NetworkMetrics } from "@/types/network"

import { getMetricColor, getMetricStatus } from "./metric-colors"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatTime = (timestamp: number) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
}

export const getSessionSummary = (metrics: NetworkMetrics[]) => {
  if (metrics.length === 0) return null
  
  const avgPing = metrics.reduce((sum, m) => sum + m.ping, 0) / metrics.length
  const avgJitter = metrics.reduce((sum, m) => sum + m.jitter, 0) / metrics.length
  const avgPacketLoss = metrics.reduce((sum, m) => sum + m.packetLoss, 0) / metrics.length
  const duration = Math.round((metrics[metrics.length - 1].timestamp - metrics[0].timestamp) / 1000)

  // Get color classes and status for each metric
  const pingStatus = getMetricStatus.ping(avgPing)
  const jitterStatus = getMetricStatus.jitter(avgJitter)
  const packetLossStatus = getMetricStatus.packetLoss(avgPacketLoss)

  const pingColor = getMetricColor.ping(avgPing)
  const jitterColor = getMetricColor.jitter(avgJitter)
  const packetLossColor = getMetricColor.packetLoss(avgPacketLoss)

  // Overall connection quality (use the worst status)
  const getOverallQuality = () => {
    if (pingStatus.includes('Critical') || jitterStatus.includes('Critical') || packetLossStatus.includes('Critical')) {
      return { status: '🔴 Critical Connection', color: 'text-[#ff1744] dark:text-[#ff1744]' }
    }
    if (pingStatus.includes('Very High') || jitterStatus.includes('Very High') || packetLossStatus.includes('Very High')) {
      return { status: '🟠 Poor Connection', color: 'text-[#ff4081] dark:text-[#ff4081]' }
    }
    if (pingStatus.includes('High') || jitterStatus.includes('High') || packetLossStatus.includes('High')) {
      return { status: '🟡 Unstable Connection', color: 'text-[#ff9100] dark:text-[#ff9100]' }
    }
    if (pingStatus.includes('Warning') || jitterStatus.includes('Warning') || packetLossStatus.includes('Warning')) {
      return { status: '🟡 Fair Connection', color: 'text-[#ffea00] dark:text-[#ffea00]' }
    }
    if (pingStatus.includes('Fair') || jitterStatus.includes('Fair')) {
      return { status: '🟢 Good Connection', color: 'text-[#00e676] dark:text-[#00e676]' }
    }
    return { status: '✨ Optimal Connection', color: 'text-[#00fff5] dark:text-[#00fff5]' }
  }

  const quality = getOverallQuality()

  return {
    avgPing: avgPing.toFixed(1),
    avgJitter: avgJitter.toFixed(1),
    avgPacketLoss: avgPacketLoss.toFixed(2),
    duration: `${Math.floor(duration / 60)}m ${duration % 60}s`,
    samples: metrics.length,
    pingColor,
    jitterColor,
    packetLossColor,
    pingStatus,
    jitterStatus,
    packetLossStatus,
    quality
  }
}