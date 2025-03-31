"use client"

import { Button } from "@/components/ui/button"
import { Play, Square } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useNetworkInfo } from "@/hooks/use-network-info"
import { ModeToggle } from "@/components/mode-toggle"

interface ControlPanelProps {
  isRunning: boolean
  onToggle: () => void
}

export function ControlPanel({ isRunning, onToggle }: ControlPanelProps) {
  const { isOnline, connectionType } = useNetworkInfo()

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Controls</h3>
        <ModeToggle />
      </div>

      <div className="space-y-4">
        <Button
          onClick={onToggle}
          className="w-full h-12 text-lg shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md"
          variant={isRunning ? "destructive" : "default"}
          aria-label={isRunning ? "Stop measurement" : "Start measurement"}
        >
          {isRunning ? (
            <>
              <Square className="mr-2 h-5 w-5" /> Stop Measurement
            </>
          ) : (
            <>
              <Play className="mr-2 h-5 w-5" /> Start Measurement
            </>
          )}
        </Button>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col justify-between p-3 rounded-lg border backdrop-blur-md">
            <span className="text-xs text-muted-foreground">Status</span>
            <Badge variant={isOnline ? "default" : "destructive"} className="mt-1 w-fit">
              {isOnline ? "Online" : "Offline"}
            </Badge>
          </div>

          {connectionType && (
            <div className="flex flex-col justify-between p-3 rounded-lg border backdrop-blur-md">
              <span className="text-xs text-muted-foreground">Connection</span>
              <Badge variant="outline" className="mt-1 w-fit">
                {connectionType}
              </Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

