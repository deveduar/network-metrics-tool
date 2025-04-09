import { cn } from "@/lib/utils"

interface NetworkHealthBarProps {
  networkQuality: {
    status: string
    color: string
  }
  healthPercentage: number
  segmentWidths: Record<string, string>
}

export function NetworkHealthBar({ networkQuality, healthPercentage, segmentWidths }: NetworkHealthBarProps) {
  return (
    <div className="mt-4 space-y-2">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        <div className="w-fit text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <span className="text-xs font-bold tracking-widest whitespace-nowrap">
            NETWORK HEALTH:
          </span>
        </div>
        
        <div className="flex-1 w-full">
          <div 
            className="w-full h-6 bg-blue-50/90 dark:bg-background/50 rounded-md overflow-hidden relative shadow-inner"
            style={{
              ['--health-color' as string]: networkQuality.color,
              border: `2px solid ${networkQuality.color}50`,
              boxShadow: `inset 0 2px 4px ${networkQuality.color}20`
            }}
          >
            <div 
              className="h-full transition-all duration-300"
              style={{ 
                width: `${healthPercentage}%`,
                background: `linear-gradient(90deg, 
                  var(--health-color) 0%, 
                  ${networkQuality.color}80 100%
                )`,
                boxShadow: `0 0 10px ${networkQuality.color}60`
              }}
            >
              <div className="absolute inset-0 bg-scanline opacity-20"></div>
            </div>

            <div className="absolute inset-0 flex">
              {Object.entries(segmentWidths).map(([key, width]) => (
                <div 
                  key={key}
                  className="h-full border-r last:border-r-0" 
                  style={{ 
                    width,
                    borderColor: `${networkQuality.color}40`
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex  text-[8px] md:text-[10px] mt-1 text-foreground/80 dark:text-muted-foreground/70 overflow-hidden">
            {Object.entries(segmentWidths).map(([key, width]) => {
              const isActive = networkQuality.status.toLowerCase() === key.toLowerCase();
              return (
                <div 
                  key={key}
                  className="flex items-center justify-end font-mono font-bold  uppercase min-w-[40px]"
                  style={{ 
                    width,
                    opacity: isActive ? 1 : 0.5,
                  }}
                >
                  <span className={cn(
                    " px-1 rounded text-foreground dark:text-[var(--health-color)]",
                    isActive && "animate-pulse-slow",
                    isActive && [
                      "bg-background/80 dark:bg-transparent",
                      "border border-[var(--health-color)] dark:border-transparent"
                    ]
                  )}
                  style={{
                    ['--health-color' as string]: networkQuality.color,
                  }}>
                    {key.toUpperCase()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}