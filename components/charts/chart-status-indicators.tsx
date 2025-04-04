import { cn } from "@/lib/utils"
import { getMetricColor, getMetricBorderColor} from "@/lib/metric-colors"  
import type { NetworkMetrics } from "@/types/network"

interface ChartStatusIndicatorsProps {
  statuses: {
    ping?: string | null;
    jitter?: string | null;
    packetLoss?: string | null;
  }
  metrics: NetworkMetrics
  className?: string
}

export function ChartStatusIndicators({ statuses, metrics, className }: ChartStatusIndicatorsProps) {
  return (
    <div className="flex-end justify-between text-xs">
      <div className={cn("flex gap-4  backdrop-blur-sm px-4 py-2 rounded-lg font-mono", className)}>
        {Object.entries(statuses).map(([key, value]) => {
          const metricValue = key === 'ping' ? metrics.ping :
          key === 'jitter' ? metrics.jitter :
          metrics.packetLoss;
          const borderColor = key === 'ping' ? getMetricBorderColor.ping(metricValue) :
          key === 'jitter' ? getMetricBorderColor.jitter(metricValue) :
          getMetricBorderColor.packetLoss(metricValue);

          return (
            <div key={key} className="flex items-center gap-2">
              <span className="uppercase font-bold tracking-wider">
                {key === 'packetLoss' ? 'Loss:' : `${key}:`}
              </span>
              <span 
                className={cn(
                  "inline-block px-3 py-1 rounded-full uppercase font-bold tracking-wider",
                  "text-foreground",
                  "bg-background/50 backdrop-blur-sm",
                  value?.includes("Critical") && "animate-metric-alert",
                  value?.includes("Very High") && "animate-pulse-glow"
                )}
                style={{
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: borderColor,
                }}
              >   
                {value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}