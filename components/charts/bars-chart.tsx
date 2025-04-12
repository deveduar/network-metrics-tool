import { cn } from "@/lib/utils"
import type { NetworkMetrics } from "@/types/network"
import { getMetricBorderColor } from "@/lib/metric-colors"
import { formatTime } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface BarsChartProps {
  type: "latency" | "quality"
  metric: NetworkMetrics
  index: number
  isRunning: boolean
  config: any
  totalBars: number // Añadimos esta prop para calcular el ancho
}

const calculateBarWidth = (totalBars: number) => {
  const width = typeof window !== 'undefined' ? window.innerWidth : 1200
  
  // En pantallas grandes, calculamos el ancho basado en el número de barras visibles
  if (width >= 1800) {
    return `calc((100% / 30) - 4px)`; // Para 30 barras visibles en pantallas muy grandes
  }
  if (width >= 1600) {
    return `calc((100% / 26) - 4px)`; // Para 26 barras visibles
  }
  if (width >= 1400) {
    return `calc((100% / 22) - 4px)`; // Para 22 barras visibles
  }
  if (width >= 1200) {
    return `calc((100% / 18) - 4px)`; // Para 18 barras visibles
  }
  
  // En pantallas pequeñas, calculamos el ancho para distribuir uniformemente
  return `calc((100% / ${totalBars}) - 4px)`;
}


const calculateIndividualBarWidth = () => {
  const width = typeof window !== 'undefined' ? window.innerWidth : 1200
  
  // En pantallas grandes, hacemos las barras individuales más anchas
  if (width >= 1800) return "65%";
  if (width >= 1400) return "60%";
  if (width >= 1200) return "55%";
  
  // En pantallas pequeñas, mantenemos el ancho estándar
  return "45%";
}

export function BarsChart({ type, metric, index, isRunning, config, totalBars }: BarsChartProps) {
  // Calculamos el ancho de la barra basado en el número total
  const barContainerWidth = calculateBarWidth(totalBars);
  
  // Ancho para las barras individuales (ping/jitter)
  const individualBarWidth = calculateIndividualBarWidth();

  if (type === "latency") {
    const pingHeight = `${(metric.ping / config.maxValues.ping) * 100}%`
    const jitterHeight = `${(metric.jitter / config.maxValues.jitter) * 100}%`
    const isNewBar = index === 0
    const animationClass = isNewBar && isRunning ? "animate-slide-right" : "opacity-100"

    const pingBorderColor = getMetricBorderColor.ping(metric.ping)
    const jitterBorderColor = getMetricBorderColor.jitter(metric.jitter)

    return (
      <div key={metric.timestamp}
        className={cn(
          "flex justify-center gap-1 sm:gap-2",
          animationClass,
          "transition-opacity duration-150"
        )}
        style={{
          width: barContainerWidth,
          height: "100%",
          alignItems: "flex-end",
          ['--ping-color' as string]: `${pingBorderColor}95`,
          ['--ping-border' as string]: `${pingBorderColor}`,
          ['--jitter-color' as string]: `${jitterBorderColor}40`,
          ['--jitter-border' as string]: `${jitterBorderColor}`,
        }}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
              <div className={cn(
                  "rounded-t-sm transition-all duration-300 relative",
                  "bg-[var(--ping-color)] dark:bg-[var(--ping-color)]",
                  "border border-foreground/30 dark:border-[var(--ping-border)]",
                  metric.ping >= 1000 && "animate-pulse-glow"
                )} 
                style={{ 
                  height: pingHeight,
                  width: individualBarWidth
                }} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Ping: {metric.ping.toFixed(1)}ms</p>
                <p className="text-xs text-muted-foreground">{formatTime(metric.timestamp)}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={cn(
                  "rounded-t-sm transition-all duration-300 relative",
                  "bg-[var(--jitter-color)] dark:bg-[var(--jitter-color)]",
                  "border border-foreground/20",
                  metric.jitter >= 800 && "animate-pulse-glow"
                )} 
                style={{ 
                  height: jitterHeight,
                  width: individualBarWidth
                }} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Jitter: {metric.jitter.toFixed(1)}ms</p>
                <p className="text-xs text-muted-foreground">{formatTime(metric.timestamp)}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )
    }

  // Quality chart (Packet Loss)
  const packetLossHeight = `${(metric.packetLoss / config.maxValues.packetLoss) * 100}%`
  const isNewBar = index === 0
  const animationClass = isNewBar && isRunning ? "animate-slide-right" : ""
  const packetLossBorderColor = getMetricBorderColor.packetLoss(metric.packetLoss)

  return (
    <div key={`${metric.timestamp}-${index}`}
      className={cn(
        "flex justify-center transition-transform",
        animationClass
      )}
      style={{
        width: barContainerWidth,
        height: "100%",
        alignItems: "flex-end"
      }}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={cn(
              "rounded-t-sm transition-all duration-300 relative",
              "dark:bg-background/80",
              metric.packetLoss >= 5 && "animate-pulse-glow"
            )} 
            style={{ 
              height: packetLossHeight,
              width: individualBarWidth,
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: packetLossBorderColor,
              backgroundColor: `${packetLossBorderColor}30`
            }} />
          </TooltipTrigger>
          <TooltipContent>
            <p>Packet Loss: {metric.packetLoss.toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground">{formatTime(metric.timestamp)}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}