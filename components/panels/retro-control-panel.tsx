import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { RETRO_ASCII, ANIMATION_SPEEDS } from "../retro-control-constants"
import { RefreshCw, Play, Square } from "lucide-react"

interface RetroControlPanelProps {
  isRunning: boolean
  onToggle: () => void
  onReset?: () => void
  className?: string
  metrics?: {
    packetLoss: number
  }
}

export function RetroControlPanel({ 
  isRunning, 
  onToggle,
  onReset, 
  className,
  metrics 
}: RetroControlPanelProps) {

  return (
    <div className={cn(" font-mono", className)}>
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button
            onClick={onToggle}
            className={cn(
              "flex-1 h-12 text-lg font-bold tracking-wider uppercase shadow-[inset_0_-4px_0_rgba(0,0,0,0.3)] transition-all duration-300",
              "border-4 hover:translate-y-[2px] hover:shadow-[inset_0_-2px_0_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-none",
              isRunning
                ? "bg-destructive border-destructive/80 hover:bg-destructive/90 dark:text-slate-300"
                : "bg-primary border-primary/80 hover:bg-primary/90"
            )}
            aria-label={isRunning ? "Stop measurement" : "Start measurement"}
          >
            {isRunning ? (
              <>
                <Square className="mr-2 h-5 w-5" />
                Stop Test
              </>
            ) : (
              <>
                <Play className="mr-2 h-5 w-5" />
                Start Test
              </>
            )}
          </Button>

          {isRunning && onReset && (
            <Button
              onClick={onReset}
              className={cn(
                "h-12 px-4 font-bold tracking-wider uppercase shadow-[inset_0_-4px_0_rgba(0,0,0,0.3)] transition-all duration-300 bg-background",
                "border-4 border-yellow-300/80 dark:border-yellow-400/80 hover:border-yellow-400/90",
                "bg-yellow-300 dark:bg-yellow-400 hover:bg-yellow-300/90 text-black",
                "hover:translate-y-[2px] hover:shadow-[inset_0_-2px_0_rgba(0,0,0,0.3)]",
                "active:translate-y-[4px] active:shadow-none"
              )}
              aria-label="Reset measurements"
            >
              <RefreshCw className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}