"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useNetworkInfo } from "@/hooks/use-network-info"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"
import { RETRO_ASCII, ANIMATION_SPEEDS } from "../retro-control-constants"
import { StatusIndicators } from "@/components/status-indicators"

interface RetroControlPanelProps {
  isRunning: boolean
  onToggle: () => void
  className?: string
  metrics?: {
    packetLoss: number
  }
}

export function RetroControlPanel({ 
  isRunning, 
  onToggle, 
  className,
  metrics 
}: RetroControlPanelProps) {

  return (
    <div className={cn("mb-6 font-mono", className)}>
      <div className="space-y-4">
        <Button
          onClick={onToggle}
          className={cn(
            "w-full h-12 text-lg font-bold tracking-wider uppercase shadow-[inset_0_-4px_0_rgba(0,0,0,0.3)] transition-all duration-300",
            "border-4 hover:translate-y-[2px] hover:shadow-[inset_0_-2px_0_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-none",
            isRunning
              ? "bg-destructive border-destructive/80 hover:bg-destructive/90 dark:text-slate-300"
              : "bg-primary border-primary/80 hover:bg-primary/90"
          )}
          aria-label={isRunning ? "Stop measurement" : "Start measurement"}
        >
          {isRunning ? "Stop Test" : "Start Test"}
        </Button>

      </div>
    </div>
  )
}

