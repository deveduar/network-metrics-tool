export interface NetworkMetrics {
  ping: number // Milliseconds
  download: number // Mbps
  upload: number // Mbps
  jitter: number // Milliseconds (variation in ping)
  packetLoss: number // Percentage
  timestamp: number // Unix timestamp
}

export interface NetworkAlert {
  id: string
  type: "warning" | "error" | "info"
  message: string
  timestamp: number
}

