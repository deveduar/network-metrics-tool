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
            className="w-full h-6 bg-background/50 rounded-md overflow-hidden relative shadow-inner"
            style={{
              border: `1px solid ${networkQuality.color}30`,
              boxShadow: `inset 0 2px 4px ${networkQuality.color}10`
            }}
          >
            <div 
              className="h-full transition-all duration-300"
              style={{ 
                width: `${healthPercentage}%`,
                background: `linear-gradient(90deg, 
                  ${networkQuality.color}90 0%, 
                  ${networkQuality.color}70 100%
                )`,
                boxShadow: `0 0 10px ${networkQuality.color}50`
              }}
            >
              <div className="absolute inset-0 bg-scanline opacity-10"></div>
            </div>

            <div className="absolute inset-0 flex">
              {Object.entries(segmentWidths).map(([key, width]) => (
                <div 
                  key={key}
                  className="h-full border-r last:border-r-0" 
                  style={{ 
                    width,
                    borderColor: `${networkQuality.color}30`
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex text-[10px] mt-1 text-muted-foreground/70">
            {Object.entries(segmentWidths).map(([key, width]) => (
              <div 
                key={key}
                className="flex items-center justify-end font-mono font-bold tracking-wider uppercase"
                style={{ 
                  width,
                  opacity: networkQuality.status.toLowerCase() === key.toLowerCase() ? 1 : 0.4,
                  color: networkQuality.status.toLowerCase() === key.toLowerCase() ? networkQuality.color : 'currentColor',
                }}
              >
                <span className={cn(
                  "drop-shadow-glow",
                  networkQuality.status.toLowerCase() === key.toLowerCase() && "animate-pulse-slow"
                )}>
                  {key.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}