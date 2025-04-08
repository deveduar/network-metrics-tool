import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { NetworkMetrics } from "@/types/network"

import { getMetricBorderColor, getMetricStatus } from "./metric-colors"

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

  const pingColor = getMetricBorderColor.ping(avgPing)
  const jitterColor = getMetricBorderColor.jitter(avgJitter)
  const packetLossColor = getMetricBorderColor.packetLoss(avgPacketLoss)

  // Overall connection quality (use the worst status)
  const getOverallQuality = () => {
    if (pingStatus === 'Critical' || jitterStatus === 'Critical' || packetLossStatus === 'Critical') {
      return { status: 'Critical Connection', color: '#ff1744' }
    }
    if (pingStatus === 'Very High' || jitterStatus === 'Very High' || packetLossStatus === 'Very High') {
      return { status: 'Poor Connection', color: '#ff4081' }
    }
    if (pingStatus === 'High' || jitterStatus === 'High' || packetLossStatus === 'High') {
      return { status: 'Unstable Connection', color: '#ff9100' }
    }
    if (pingStatus === 'Warning' || jitterStatus === 'Warning' || packetLossStatus === 'Warning') {
      return { status: 'Fair Connection', color: '#ffea00' }
    }
    if (pingStatus === 'Fair' || jitterStatus === 'Fair') {
      return { status: 'Good Connection', color: '#00e676' }
    }
    return { status: 'Optimal Connection', color: '#00fff5' }
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

export const getOverallNetworkQuality = (pingStatus: string, jitterStatus: string, lossStatus: string) => {
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