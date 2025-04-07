"use client"

import { useEffect, useState } from "react"
import { useNetworkStore } from "@/stores/network-store"
import { NetworkChart } from "@/components/charts/network-chart"
import { ControlPanel } from "@/components/panels/control-panel"
import { MetricsPanel } from "@/components/panels/metrics-panel"
import { AlertToast } from "@/components/alert-toast"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import ConnectionMood from "@/components/connection-mood"
import HappinessMeter from "@/components/happiness-meter"
import { RetroControlPanel } from "@/components/panels/retro-control-panel"
import { RetroGamePanel } from "@/components/panels/retro-game-panel"


export function NetworkDashboard() {
  const { toast } = useToast()
  const [worker, setWorker] = useState<Worker | null>(null)
  const { 
    metrics, 
    isRunning, 
    alerts, 
    startMeasurement, 
    stopMeasurement, 
    updateMetrics, 
    addAlert, 
    clearAlerts,
    clearMetrics  // Add clearMetrics to the destructured values
  } = useNetworkStore()
    const [isPaused, setIsPaused] = useState(false)
    const [isResetting, setIsResetting] = useState(false)


  // Initialize web worker
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Create a blob URL for the worker code
      const networkWorker = new Worker('/network.worker.js')

      networkWorker.onmessage = (event) => {
        const { type, data } = event.data

        if (type === "metrics") {
          updateMetrics(data)

          // Check thresholds and create alerts
          if (data.ping > 150) {
            addAlert({
              id: `high-ping-${Date.now()}`,
              type: "warning",
              message: `High ping detected: ${data.ping.toFixed(0)}ms`,
              timestamp: Date.now(),
            })
          }

          if (data.jitter > 30) {
            addAlert({
              id: `high-jitter-${Date.now()}`,
              type: "warning",
              message: `High jitter detected: ${data.jitter.toFixed(0)}ms`,
              timestamp: Date.now(),
            })
          }

          if (data.packetLoss > 1) {
            addAlert({
              id: `packet-loss-${Date.now()}`,
              type: "error",
              message: `Packet loss detected: ${data.packetLoss.toFixed(1)}%`,
              timestamp: Date.now(),
            })
          }
        } else if (type === "error") {
          toast({
            title: "Measurement Error",
            description: data.message,
            variant: "destructive",
          })
        }
      }

      setWorker(networkWorker)

      return () => {
        networkWorker.terminate()
      }
    }
  }, [updateMetrics, addAlert, toast])

  // Handle start/stop
  const handleToggleMeasurement = () => {
    if (isRunning) {
      if (worker) {
        worker.postMessage({ command: "stop" })
      }
      stopMeasurement()
      setIsPaused(false) // Reset pause state when stopping
    } else {
      if (worker) {
        worker.postMessage({ command: "start" })
      }
      startMeasurement()
      clearAlerts()
    }
  }

  // Handle pause/resume
  const handlePauseMeasurement = () => {
    setIsPaused(prevState => {
      const newPausedState = !prevState
      
      if (worker) {
        worker.postMessage({ 
          command: newPausedState ? "pause" : "resume" 
        })
      }
      
      return newPausedState
    })
  }

  const handleReset = () => {
    if (worker && isRunning) {
      setIsResetting(true);  // Set resetting state to true
      
      worker.postMessage({ command: "stop" });
      
      // Clear metrics from the store immediately to reset the charts
      clearMetrics();
      clearAlerts();
      
      // Reduced delay for reset animation
      setTimeout(() => {
        worker.postMessage({ command: "start" });
        setIsPaused(false);
        
        // Reduced delay for showing reset state
        // Just enough time to show the reset animation but not too long
        setTimeout(() => {
          setIsResetting(false);
        }, 800);  // Reduced from 2000ms to 800ms
      }, 500);  // Reduced from 1000ms to 500ms
    }
  };

  return (
    <div className="">
      <div className="w-full font-mono p-4 rounded-lg border-2 dark:border-primary/30 border-primary/20 [inset_0_0_8px_rgba(139,69,19,0.1)]
      bg-muted/40 dark:bg-muted/40 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-1 space-y-6">
          {/* Control Panel Section */}
          <Card className=" border-0 bg-inherit  ">
            <CardContent className="p-0 space-y-6 ">
            <RetroGamePanel 
                metrics={metrics}
                isRunning={isRunning}
                isPaused={isPaused}
                isResetting={isResetting}  // Pass isResetting prop
                onToggle={handleToggleMeasurement}
                config={{
                  asciiStyle: "rpg",
                  animationSpeed: 400
                }}
              />
              {/* Chart Section */}
              <NetworkChart 
                metrics={metrics} 
                isRunning={isRunning}
                isPaused={isPaused}
                isResetting={isResetting}
                onToggle={handleToggleMeasurement}
                onPause={handlePauseMeasurement}  // Add this line
              />
              <RetroControlPanel 
                isRunning={isRunning}
                isPaused={isPaused}
                onToggle={handleToggleMeasurement}
                onPause={handlePauseMeasurement}
                onReset={handleReset}
                metrics={metrics.length > 0 ? {
                  packetLoss: metrics[metrics.length - 1].packetLoss
                } : undefined}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {alerts.map((alert) => (
        <AlertToast
          key={alert.id}
          title={alert.type === "error" ? "Critical Alert" : "Warning"}
          description={alert.message}
          variant={alert.type === "error" ? "destructive" : "warning"}
        />
      ))}
    </div>
  )
}

