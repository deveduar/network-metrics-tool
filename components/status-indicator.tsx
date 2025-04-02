"use client"

import { useNetworkInfo } from "@/hooks/use-network-info"
import { cn } from "@/lib/utils"

interface StatusIndicatorsProps {
  metrics?: {
    packetLoss: number
  }
  className?: string
  retro?: boolean
}

export function StatusIndicators({ metrics, className, retro = false }: StatusIndicatorsProps) {
  const { isOnline, connectionType } = useNetworkInfo()

  const getConnectionStatus = () => {
    if (!isOnline) return { status: 'offline', color: 'destructive' }
    if (metrics?.packetLoss && metrics.packetLoss > 1) {
      return { status: 'unstable', color: 'warning' }
    }
    return { status: 'online', color: 'success' }
  }

  const connectionStatus = getConnectionStatus()

  if (retro) {
    return (
      <div className={cn("flex gap-4 font-mono text-text text-xs", className)}>
        <div className="flex items-center gap-2">
          <span className={cn(
            "inline-block w-2 h-2 animate-pulse",
            {
              'bg-success': connectionStatus.status === 'online',
              'bg-warning': connectionStatus.status === 'unstable',
              'bg-destructive': connectionStatus.status === 'offline'
            }
          )} />
          <span className={cn(
            "uppercase px-2 py-0.5 rounded border",
            {
              'text-text-success bg-success/10 border-success/20': connectionStatus.status === 'online',
              'text-text-warning bg-warning/10 border-warning/20': connectionStatus.status === 'unstable',
              'text-text-destructive bg-destructive/10 border-destructive/20': connectionStatus.status === 'offline'
            }
          )}>
            {connectionStatus.status}
          </span>
        </div>
        {connectionType && (
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-primary animate-pulse" />
            <span className="uppercase px-2 py-0.5 rounded border text-text-primary bg-primary/10 border-primary/20">
              {connectionType}
            </span>
          </div>
        )}
      </div>
    )
  }


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