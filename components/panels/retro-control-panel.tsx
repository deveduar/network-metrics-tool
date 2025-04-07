import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { RETRO_ASCII, ANIMATION_SPEEDS } from "../retro-control-constants"
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

  return (
    <div className={cn(" font-mono", className)}>
      <div className="space-y-4">
      <div className="flex gap-2 max-w-xl mx-auto">
        <Button
            onClick={onToggle}
            className={cn(
              "flex-1 h-12 text-lg font-bold tracking-wider uppercase",
              "rounded-md relative group transition-all duration-300",
              "border-2",
              isRunning
              ? [
                "border-rose-400/50 dark:border-rose-300/30",
                "bg-rose-50/80 dark:bg-rose-900/20",
                "text-rose-700 dark:text-rose-300",
                "shadow-[inset_0_-4px_0_rgba(244,63,94,0.3)]",
                "dark:shadow-[inset_0_-4px_0_rgba(244,63,94,0.2)]",
                "hover:translate-y-[2px]",
                "hover:bg-rose-100/80 dark:hover:bg-rose-900/30",
                "hover:shadow-[inset_0_-2px_0_rgba(244,63,94,0.3)]",
                "dark:hover:shadow-[inset_0_-2px_0_rgba(244,63,94,0.2)]",
                "active:translate-y-[4px] active:shadow-none",
              ]
              : [
                "border-emerald-400/50 dark:border-emerald-300/30",
                "bg-emerald-50/80 dark:bg-emerald-900/20",
                "text-emerald-700 dark:text-emerald-300",
                "shadow-[inset_0_-4px_0_rgba(16,185,129,0.3)]",
                "dark:shadow-[inset_0_-4px_0_rgba(16,185,129,0.2)]",
                "hover:translate-y-[2px]",
                "hover:bg-emerald-100/80 dark:hover:bg-emerald-900/30",
                "hover:shadow-[inset_0_-2px_0_rgba(16,185,129,0.3)]",
                "dark:hover:shadow-[inset_0_-2px_0_rgba(16,185,129,0.2)]",
                "active:translate-y-[4px] active:shadow-none",
              ]
            )}
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

          {isRunning && onPause && (
            <Button
              onClick={onPause}
              className={cn(
                "h-12 px-4 font-bold tracking-wider uppercase",
                "rounded-md relative group transition-all duration-300",
                "border-2",
                isPaused
                ? [
                  "border-blue-400/50 dark:border-blue-300/30",
                  "bg-blue-50/80 dark:bg-blue-900/20",
                  "text-blue-700 dark:text-blue-300",
                  "shadow-[inset_0_-4px_0_rgba(59,130,246,0.3)]",
                  "dark:shadow-[inset_0_-4px_0_rgba(59,130,246,0.2)]",
                  "hover:translate-y-[2px]",
                  "hover:bg-blue-100/80 dark:hover:bg-blue-900/30",
                  "hover:shadow-[inset_0_-2px_0_rgba(59,130,246,0.3)]",
                  "dark:hover:shadow-[inset_0_-2px_0_rgba(59,130,246,0.2)]",
                  "active:translate-y-[4px] active:shadow-none",
                ]
                : [
                  "border-amber-400/50 dark:border-amber-300/30",
                  "bg-amber-50/80 dark:bg-amber-900/20",
                  "text-amber-700 dark:text-amber-300",
                  "shadow-[inset_0_-4px_0_rgba(251,191,36,0.3)]",
                  "dark:shadow-[inset_0_-4px_0_rgba(251,191,36,0.2)]",
                  "hover:translate-y-[2px]",
                  "hover:bg-amber-100/80 dark:hover:bg-amber-900/30",
                  "hover:shadow-[inset_0_-2px_0_rgba(251,191,36,0.3)]",
                  "dark:hover:shadow-[inset_0_-2px_0_rgba(251,191,36,0.2)]",
                  "active:translate-y-[4px] active:shadow-none",
                ]
              )}
              aria-label={isPaused ? "Resume test" : "Pause test"}
            >
              {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
            </Button>
          )}

          {isRunning && onReset && (
            <Button
              onClick={onReset}
              className={cn(
                "h-12 px-4 font-bold tracking-wider uppercase",
                "rounded-md relative group transition-all duration-300",
                "border-2",
                "border-zinc-400/30 dark:border-zinc-300/20",
                "bg-zinc-50/50 dark:bg-zinc-900/10",
                "text-zinc-600 dark:text-zinc-400",
                "shadow-[inset_0_-4px_0_rgba(161,161,170,0.3)]",
                "dark:shadow-[inset_0_-4px_0_rgba(161,161,170,0.2)]",
                "hover:translate-y-[2px]",
                "hover:bg-zinc-100/50 dark:hover:bg-zinc-900/20",
                "hover:shadow-[inset_0_-2px_0_rgba(161,161,170,0.3)]",
                "dark:hover:shadow-[inset_0_-2px_0_rgba(161,161,170,0.2)]",
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