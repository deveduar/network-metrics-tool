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
            style={{
              ['--health-color' as string]: networkQuality.color,
              ['--health-color-light' as string]: `${networkQuality.color}30`,
              ['--health-color-dark' as string]: `${networkQuality.color}50`,
            }}
            className="w-full h-6 rounded-md overflow-hidden relative shadow-inner
                      bg-foreground/10 dark:bg-background/50
                      border border-foreground/70 dark:border-[var(--health-color-dark)]"
          >
            <div 
              style={{ 
                width: `${healthPercentage}%`,
              }}
              className="h-full transition-all duration-300
                        bg-gradient-to-r from-[var(--health-color)] to-[var(--health-color-light)]
                        dark:bg-gradient-to-r dark:from-[var(--health-color)] dark:to-[var(--health-color-dark)]
                        shadow-[0_0_10px_var(--health-color-light)] dark:shadow-[0_0_10px_var(--health-color-dark)]"
            >
              <div className="absolute inset-0 bg-scanline opacity-20"></div>
            </div>

            <div className="absolute inset-0 flex">
              {Object.entries(segmentWidths).map(([key, width]) => (
                <div 
                  key={key}
                  style={{ 
                    width,
                  }}
                  className="h-full border-r last:border-r-0 border-[var(--health-color-light)]/40 dark:border-[var(--health-color-dark)]/40"
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