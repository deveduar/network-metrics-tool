"use client"

import { useNetworkInfo } from "@/hooks/use-network-info"
import { cn } from "@/lib/utils"

interface StatusIndicatorsProps {
  metrics?: {
    packetLoss: number
  }
  className?: string
}

export function StatusIndicators({ metrics, className }: StatusIndicatorsProps) {
  const { isOnline, connectionType } = useNetworkInfo()

  const getConnectionStatus = () => {
    if (!isOnline) return { status: 'offline', color: 'destructive' }
    if (metrics?.packetLoss && metrics.packetLoss > 1) {
      return { status: 'unstable', color: 'warning' }
    }
    return { status: 'online', color: 'success' }
  }

  const connectionStatus = getConnectionStatus()

  return (
    <div className={cn("grid grid-cols-2 gap-6", className)}>
      {/* Status indicator */}
      <div
        className={cn(
          "h-16 flex items-center justify-center font-bold tracking-wide uppercase rounded-md",
          {
            'text-success-foreground': connectionStatus.status === 'online',
            'text-warning-foreground': connectionStatus.status === 'unstable',
            'text-destructive-foreground': connectionStatus.status === 'offline'
          }
        )}
      >
        <div className="flex items-center gap-3">
          <div 
            className={cn(
              "w-4 h-4 rounded-full animate-pulse",
              {
                'bg-success': connectionStatus.status === 'online',
                'bg-warning': connectionStatus.status === 'unstable',
                'bg-destructive': connectionStatus.status === 'offline'
              }
            )} 
          />
          <span className="px-3 py-1 text-sm rounded-md text-black dark:text-white bg-black/5 dark:bg-white/5 backdrop-blur-sm">
            {connectionStatus.status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Connection type */}
      {connectionType && (
        <div className="h-16 flex items-center justify-center font-bold tracking-wide uppercase rounded-md">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-primary rounded-sm animate-pulse" />
            <span className="px-3 py-1 text-sm rounded-md bg-primary/5 backdrop-blur-sm">
              {connectionType}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}