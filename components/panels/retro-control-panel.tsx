import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { RefreshCw, Play, Square, Pause } from "lucide-react"

interface RetroControlPanelProps {
  isRunning: boolean
  isPaused?: boolean
  onToggle: () => void
  onPause?: () => void
  onReset?: () => void
  className?: string
  metrics?: {
    packetLoss: number
  }
}

export function RetroControlPanel({ 
  isRunning, 
  isPaused = false,
  onToggle,
  onPause,
  onReset, 
  className,
  metrics 
}: RetroControlPanelProps) {
  // Get colors for buttons based on state
  const stopColor = "#f43f5e" // Rose color for stop button
  const startColor = "#10b981" // Emerald color for start button
  const pauseColor = "#3b82f6" // Blue color for pause button
  const resetColor = "#71717a" // Zinc color for reset button

  // Estilos comunes para el efecto 3D de tecla
  const keyButtonStyles = "transform transition-transform active:translate-y-[2px] active:shadow-inner border-b-[3px] hover:border-b-[2px] hover:translate-y-[1px]";

  return (
    <div className={cn(" font-mono", className)}>
      <div className="space-y-4">
      <div className="flex gap-2 max-w-xl mx-auto">
        <Button
            onClick={onToggle}
            className={cn(
              "flex-1 h-12 text-lg font-bold tracking-wider uppercase",
              "rounded-md relative group transition-all duration-300",
              "border",
              keyButtonStyles,
              isRunning
              ? [
                "bg-background/40 dark:bg-background/40",
                "text-foreground/70 dark:text-[var(--btn-color)]",
                "border-primary/20 dark:border-[var(--btn-border)]",
                "hover:bg-rose-50/30 dark:hover:bg-rose-900/20",
                "border-b-rose-700/50 dark:border-b-rose-700/50",
              ]
              : [
                "bg-background/40 dark:bg-background/40",
                "text-foreground/70 dark:text-[var(--btn-color)]",
                "border-primary/20 dark:border-[var(--btn-border)]",
                "hover:bg-emerald-50/30 dark:hover:bg-emerald-900/20",
                "border-b-emerald-700/50 dark:border-b-emerald-700/50",
              ]
            )}
            style={{
              ['--btn-color' as string]: isRunning ? stopColor : startColor,
              ['--btn-bg' as string]: `${isRunning ? stopColor : startColor}50`,
              ['--btn-border' as string]: `${isRunning ? stopColor : startColor}40`,
              boxShadow: `inset 0 0 0.5rem ${isRunning ? stopColor : startColor}10`
            } as React.CSSProperties}
          >
            {isRunning ? (
              <>
                <Square className="mr-2 h-5 w-5" />
                <span>
                Stop 
                </span>
              </>
            ) : (
              <>
                <Play className="mr-2 h-5 w-5" />
                <span>
                Start Test
                </span>
              </>
            )}
          </Button>

          {isRunning && onPause && (
            <Button
              onClick={onPause}
              className={cn(
                "flex-1 h-12 text-lg font-bold tracking-wider uppercase",
                "rounded-md relative group transition-all duration-300",
                "border",
                keyButtonStyles,
                "bg-background/40 dark:bg-background/40",
                "text-foreground/70 dark:text-[var(--btn-color)]",
                "border-primary/20 dark:border-[var(--btn-border)]",
                "hover:bg-blue-50/30 dark:hover:bg-blue-900/20",
                "border-b-blue-700/50 dark:border-b-blue-700/50",
                isPaused && "resume-button-glow"
              )}
              style={{
                ['--btn-color' as string]: pauseColor,
                ['--btn-bg' as string]: `${pauseColor}50`,
                ['--btn-border' as string]: `${pauseColor}40`,
                boxShadow: `inset 0 0 0.5rem ${pauseColor}10`
              } as React.CSSProperties}
              aria-label={isPaused ? "Resume test" : "Pause test"}
            >
              {isPaused ? (
                  <>

                  <Play className="mr-2 h-5 w-5" />
                  <span>
                  Resume 

                  </span>
                  
                </>
              ) : (
                <>
                  <Pause className="mr-2 h-5 w-5" />
                  <span>
                  Pause 
                  </span>
                </>
              )}
            </Button>
          )}

          {isRunning && onReset && (
            <Button
              onClick={onReset}
              className={cn(
                "h-12 px-4 font-bold tracking-wider uppercase",
                "rounded-md relative group transition-all duration-300",
                "border",
                keyButtonStyles,
                "bg-background/40 dark:bg-background/40",
                "text-foreground/70 dark:text-[var(--btn-color)]",
                "border-primary/20 dark:border-[var(--btn-border)]",
                "hover:bg-zinc-50/30 dark:hover:bg-zinc-900/20",
                "border-b-zinc-700/50 dark:border-b-zinc-700/50"
              )}
              style={{
                ['--btn-color' as string]: resetColor,
                ['--btn-bg' as string]: `${resetColor}50`,
                ['--btn-border' as string]: `${resetColor}40`,
                boxShadow: `inset 0 0 0.5rem ${resetColor}10`
              } as React.CSSProperties}
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