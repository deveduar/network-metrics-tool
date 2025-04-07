import { cn } from "@/lib/utils"
import { getMetricBorderColor } from "@/lib/metric-colors"  
import type { NetworkMetrics } from "@/types/network"
import { useEffect, useState } from "react"

interface ChartStatusIndicatorsProps {
  statuses: {
    ping?: string | null;
    jitter?: string | null;
    packetLoss?: string | null;
  }
  metrics: NetworkMetrics
  className?: string
  retro?: boolean
}

export function ChartStatusIndicators({ statuses, metrics, className, retro = false }: ChartStatusIndicatorsProps) {
  return (
    <div className="flex-end justify-between text-xs">
      <div className={cn("flex gap-4 backdrop-blur-sm px-4 py-2 rounded-lg font-mono", className)}>
        {Object.entries(statuses).map(([key, value]) => {
          if (!value) return null;
          
          const metricValue = key === 'ping' ? metrics.ping :
            key === 'jitter' ? metrics.jitter :
            metrics.packetLoss;
          
          const borderColor = key === 'ping' ? getMetricBorderColor.ping(metricValue) :
            key === 'jitter' ? getMetricBorderColor.jitter(metricValue) :
            getMetricBorderColor.packetLoss(metricValue);
          
          // Determine animation classes based on status
          const animationClass = value?.includes("Critical") 
            ? "animate-metric-alert" 
            : value?.includes("Very High") 
              ? "animate-pulse-glow" 
              : "";
              
          // Determine color classes based on metric values (similar to retro-game-panel)
          let colorClasses = "";
          if (retro) {
            if (key === 'ping' && metrics.ping > 150) {
              colorClasses = "border-yellow-400 bg-yellow-100/30 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400";
            } else if (key === 'jitter' && metrics.jitter > 30) {
              colorClasses = "border-yellow-400 bg-yellow-100/30 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400";
            } else if (key === 'packetLoss' && metrics.packetLoss > 1) {
              colorClasses = "border-red-400 bg-red-100/30 dark:bg-red-900/30 text-red-700 dark:text-red-400";
            } else {
              colorClasses = "border-green-400 bg-green-100/30 dark:bg-green-900/30 text-green-700 dark:text-green-400";
            }
          }

          return (
            <div key={key} className="flex items-center gap-2">
              {!retro && (
                <span className="uppercase font-bold tracking-wider">
                  {key === 'packetLoss' ? 'Loss:' : `${key}:`}
                </span>
              )}
              <span 
                className={cn(
                  retro 
                    ? [
                        "text-xs px-2 py-0.5 rounded-sm border uppercase font-bold tracking-wider",
                        colorClasses,
                        animationClass
                      ]
                    : [
                        "inline-block px-3 py-1 rounded-full uppercase font-bold tracking-wider",
                        "text-foreground",
                        "bg-background/50 backdrop-blur-sm",
                        animationClass
                      ]
                )}
                style={!retro ? {
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: borderColor
                } : {}}
              >   
                {retro ? (
                  <>
                    {key === 'packetLoss' ? 'LOSS: ' : `${key.toUpperCase()}: `}
                    {value}
                  </>
                ) : (
                  value
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}